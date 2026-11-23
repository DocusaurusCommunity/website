const {mkdirSync, readFileSync, writeFileSync} = require('node:fs');
const {dirname, join, resolve} = require('node:path');
const {indexDocuments, serializeIndex} = require('@docsense/indexer');
const {readOutputHTMLFile} = require('@docusaurus/utils');
const {load} = require('cheerio');
const docsensePlugin = require('docusaurus-plugin-docsense').default;

// Use Docusaurus permalinks instead of DocSense's filename-derived URLs.
module.exports = function routedDocsense(context) {
  const language = context.i18n.currentLocale;
  const indexPath = `docsense/${language}/search-index.json`;
  const plugin = docsensePlugin(context, {
    docsDirs: [],
    indexPath,
    defaultLanguage: language,
    searchBar: language === 'cy' ? {
      placeholder: 'Chwilio...',
      triggerLabel: 'Chwilio',
      modalAriaLabel: 'Chwilio',
      emptyResultsLabel: 'Dim canlyniadau',
    } : {placeholder: 'Search...', triggerLabel: 'Search'},
  });
  let runtime;
  let index;
  const excludedUrls = new Set();
  const baseUrl = context.siteConfig.baseUrl;
  const sitePath = (permalink) => {
    if (!permalink.startsWith(baseUrl)) {
      throw new Error(`[docsense] Permalink is outside baseUrl: ${permalink}`);
    }
    return `/${permalink.slice(baseUrl.length)}`;
  };
  const writeIndex = (outputDir) => {
    const serialized = serializeIndex(index);
    for (const file of [
      join(context.siteDir, 'static', indexPath),
      join(context.generatedFilesDir, 'docsense', 'search-index.json'),
      ...(outputDir ? [join(outputDir, indexPath)] : []),
    ]) {
      mkdirSync(dirname(file), {recursive: true});
      writeFileSync(file, serialized, 'utf8');
    }
  };

  return {
    ...plugin,
    configureWebpack(config) {
      const packageDir = dirname(require.resolve('docusaurus-plugin-docsense'));
      const commonJsHelpers = new Set(['search-ui.js', 'highlight-terms.js'].map((file) => join(packageDir, file)));
      for (const rule of config.module.rules) {
        if (Array.isArray(rule.use) && rule.use.some((loader) => loader.loader?.includes('babel-loader'))) {
          // Babel's ESM runtime imports otherwise disable these CommonJS exports.
          const exclude = rule.exclude;
          rule.exclude = (file) => commonJsHelpers.has(file) || exclude(file);
        }
      }
    },
    async loadContent() {
      runtime = await plugin.loadContent();
      return runtime;
    },
    async allContentLoaded({allContent, actions}) {
      const sources = [];
      excludedUrls.clear();
      const add = (metadata, pageType, version) => {
        const url = sitePath(metadata.permalink);
        if (metadata.draft || metadata.unlisted || metadata.frontMatter?.draft) {
          excludedUrls.add(url);
          return;
        }
        const file = metadata.source.startsWith('@site/')
          ? resolve(context.siteDir, metadata.source.slice(6))
          : resolve(context.siteDir, metadata.source);
        sources.push({
          id: url,
          url,
          source: readFileSync(file, 'utf8'),
          pageType,
          version,
          language,
          breadcrumbs: [{label: pageType === 'blog' ? 'Blog' : pageType === 'docs' ? 'Docs' : context.siteConfig.title}],
        });
      };
      for (const content of Object.values(allContent['docusaurus-plugin-content-docs'] || {})) {
        for (const version of content.loadedVersions) {
          for (const doc of version.docs) {
            if (version.noIndex) {
              excludedUrls.add(sitePath(doc.permalink));
            } else {
              add(doc, 'docs', version.versionName);
            }
          }
        }
      }
      for (const content of Object.values(allContent['docusaurus-plugin-content-blog'] || {})) {
        for (const post of content.blogPosts) {
          add(post.metadata, 'blog');
        }
      }
      for (const content of Object.values(allContent['docusaurus-plugin-content-pages'] || {})) {
        for (const page of content || []) {
          add(page, 'page');
        }
      }
      index = indexDocuments(sources, {defaultLanguage: language});
      writeIndex();
      actions.setGlobalData({...runtime, documentCount: index.meta.documentCount});
    },
    // Rendered content includes localized JSX pages, generated FAQs and exact heading IDs.
    async postBuild({outDir, routesPaths, routesBuildMetadata}) {
      const sourceRecords = new Map(index.documents.map((document) => [document.url, document]));
      const documents = [];
      for (const permalink of [...new Set(routesPaths)].sort()) {
        const url = sitePath(permalink);
        if (excludedUrls.has(url) || routesBuildMetadata?.[permalink]?.noIndex || /\/404(?:\.html)?\/?$/.test(url)) {
          continue;
        }
        const html = await readOutputHTMLFile(url, outDir, context.siteConfig.trailingSlash);
        const $ = load(html);
        if ($('meta[name="robots"]').attr('content')?.includes('noindex') || $('meta[http-equiv="refresh"]').length) {
          continue;
        }
        const main = $('main').first().clone();
        main.find('nav, aside, script, style, svg, .hash-link, .pagination-nav, .table-of-contents, .theme-doc-toc-mobile, .theme-doc-footer').remove();
        const plain = (element) => {
          const copy = $(element).clone();
          copy.find('p, div, section, article, h1, h2, h3, h4, h5, h6, li, pre, td, th, dt, dd, br').append(' ');
          return copy.text().replace(/\s+/g, ' ').trim();
        };
        const body = plain(main);
        if (!body) {
          continue;
        }
        const sections = [];
        let section;
        main.find('h1, h2, h3, h4, h5, h6, p, li, pre, td, th, dt, dd, blockquote').each((_, element) => {
          const text = plain(element);
          if (/^h[1-6]$/.test(element.tagName)) {
            const anchor = $(element).attr('id');
            section = anchor ? {
              id: anchor,
              title: text,
              level: Number(element.tagName.slice(1)),
              anchor,
              content: '',
              code: [],
            } : undefined;
            if (section) {
              sections.push(section);
            }
          } else if (section && text) {
            if (element.tagName === 'pre') {
              section.code.push($(element).text());
            } else {
              section.content = `${section.content} ${text}`.trim();
            }
          }
        });
        documents.push({
          ...sourceRecords.get(url),
          id: url,
          url,
          title: plain($('h1').first()) || sourceRecords.get(url)?.title || $('title').text().split(' | ')[0],
          pageType: sourceRecords.get(url)?.pageType || 'page',
          language,
          breadcrumbs: sourceRecords.get(url)?.breadcrumbs || [{label: context.siteConfig.title}],
          body,
          sections,
        });
      }
      if (!documents.length) {
        throw new Error('[docsense] No rendered pages were indexed.');
      }
      index = {...index, meta: {...index.meta, documentCount: documents.length}, documents};
      writeIndex(outDir);
      console.log(`[docsense] Indexed ${documents.length} ${language} pages.`);
    },
  };
};
