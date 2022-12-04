/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import {translate} from '@docusaurus/Translate';
import {sortBy} from '@site/src/utils/jsUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

/*
 * ADD YOUR SITE TO THE DOCUSAURUS SHOWCASE
 *
 * Please don't submit a PR yourself: use the Github Discussion instead:
 * https://github.com/facebook/docusaurus/discussions/7826
 *
 * Instructions for maintainers:
 * - Add the site in the json array below
 * - `title` is the project's name (no need for the "Docs" suffix)
 * - A short (≤120 characters) description of the project
 * - Use relevant tags to categorize the site (read the tag descriptions on the
 *   https://docusaurus.io/showcase page and some further clarifications below)
 * - Add a local image preview (decent screenshot of the Docusaurus site)
 * - The image MUST be added to the GitHub repository, and use `require("img")`
 * - The image has to have minimum width 640 and an aspect of no wider than 2:1
 * - If a website is open-source, add a source link. The link should open
 *   to a directory containing the `docusaurus.config.js` file
 * - Resize images: node admin/scripts/resizeImage.js
 * - Run optimizt manually (see resize image script comment)
 * - Open a PR and check for reported CI errors
 *
 * Example PR: https://github.com/facebook/docusaurus/pull/7620
 */

// LIST OF AVAILABLE TAGS
// Available tags to assign to a showcase site
// Please choose all tags that you think might apply.
// We'll remove inappropriate tags, but it's less likely that we add tags.
export type TagType =
  // DO NOT USE THIS TAG: we choose sites to add to favourites
  | 'favourite'
  | 'search'
  | 'api'
  | 'utility'
  | 'content'
  | 'theme'
  | 'markdown'
  | 'analytics'
  | 'integration';

export type MaintainedType = 
  | 'maintained'
  | 'unmaintained'
  | 'unknown';

// Add sites to this list
// prettier-ignore
const Plugins: Plugin[] = [
  {
    id: 'thangved.2dlive',
    name: '2DLive',
    description: 'A live2d docusaurus plugin.',
    preview: null,
    website: 'https://github.com/thangved/docusaurus-plugin-2dlive',
    source: 'https://github.com/thangved/docusaurus-plugin-2dlive',
    author: 'thangved',
    tags: ['utility', 'content'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-2dlive'],
  },
  {
    id: 'gabrielcsapo.api-extractor',
    name: 'API Extractor',
    description: 'Docusaurus plugin to use https://api-extractor.com in Docusaurus.',
    preview: null,
    website: 'https://gabrielcsapo.github.io/docusaurus-plugin-api-extractor',
    source: 'https://github.com/gabrielcsapo/docusaurus-plugin-api-extractor',
    author: 'gabrielcsapo',
    tags: ['api', 'utility'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['@microsoft/api-extractor', 'docusaurus-plugin-api-extractor'],
  },
  {
    id: 'acrobit.auto-sidebars',
    name: 'Auto Sidebars',
    description: 'A docusaurus plugin that generates the sidebar items automatically by filesystem structure.',
    preview: null,
    website: 'https://github.com/acrobit/docusaurus-plugin-auto-sidebars',
    source: 'https://github.com/acrobit/docusaurus-plugin-auto-sidebars',
    author: 'acrobit',
    tags: ['utility'],
    minimumVersion: '2.0.0-alpha.50',
    maintenanceStatus: 'unknown', // no release in 2 years.
    npmPackages: ['docusaurus-plugin-auto-sidebars'],
  },
  {
    id: 'chatwoot.chatwoot',
    name: 'Chatwoot',
    description: 'Embeds the chatwoot system in your Docusaurus site.',
    preview: null,
    website: 'https://github.com/chatwoot/docusaurus',
    source: 'https://github.com/chatwoot/docusaurus',
    author: 'chatwoot',
    tags: ['content', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'unknown', // no commits in 2 years.
    npmPackages: ['@chatwoot/docusaurus'],
  },
  {
    id: 'sean-perkins.code-preview',
    name: 'Code Preview',
    description: 'Embed live code examples within your Docusaurus 2 sites.',
    preview: null,
    website: 'https://github.com/sean-perkins/docusaurus-plugin-code-preview',
    source: 'https://github.com/sean-perkins/docusaurus-plugin-code-preview',
    author: 'sean-perkins',
    tags: ['content', 'utility', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-code-preview'],
  },
  {
    id: 'devbookhq.code-video',
    name: 'Code Video',
    description: 'Add a video to a Docusaurus code block and highlight code lines as the video plays.',
    preview: null,
    website: 'https://github.com/devbookhq/docusaurus-code-video-plugin',
    source: 'https://github.com/devbookhq/docusaurus-code-video-plugin',
    author: 'devbookhq',
    tags: ['content', 'utility'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['@devbookhq/docusaurus-code-video-plugin'],
  },
  {
    id: 'webbertakken.content-gists',
    name: 'Content Gists',
    description: 'A Docusaurus plugin to embed GitHub Gists in your docs.',
    preview: null,
    website: 'https://takken.io/gists',
    source: 'https://github.com/webbertakken/docusaurus-plugin-content-gists',
    author: 'webbertakken',
    tags: ['content', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-content-gists', 'dotenv'],
  },
  {
    id: 'jlvandenhout.docs-editor',
    name: 'Docs Editor',
    description: 'A client-side text editor to your Docusaurus application, allowing users to propose changes to any of your Markdown files without the need to know Markdown or GitHub.',
    preview: null,
    website: 'https://jlvandenhout.github.io/docusaurus-plugin-docs-editor',
    source: 'https://github.com/jlvandenhout/docusaurus-plugin-docs-editor',
    author: 'jlvandenhout',
    tags: ['utility'],
    minimumVersion: '2.0.0-beta.15',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-docs-editor'],
  },
  {
    id: 'xiguaxigua.drawio',
    name: 'Draw.io',
    description: 'A plugin to embed draw.io diagrams in your Docusaurus site.',
    preview: null,
    website: 'https://xiguaxigua.com/docusaurus-plugin-drawio',
    source: 'https://github.com/xiguaxigua/docusaurus-plugin-drawio',
    author: 'xiguaxigua',
    tags: ['content', 'markdown', 'integration'],
    minimumVersion: '2.0.0-beta.15',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-drawio'],
  },
  {
    id: 'saucelabs.github-code-block',
    name: 'GitHub Code Block',
    description: 'A Docusaurus v2 plugin that supports referencing code examples from public GitHub repositories.',
    preview: null,
    website: 'http://opensource.saucelabs.com/docusaurus-theme-github-codeblock',
    source: 'https://github.com/saucelabs/docusaurus-theme-github-codeblock',
    author: 'saucelabs',
    tags: ['content', 'markdown', 'theme', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-theme-github-codeblock'],
  },
  {
    id: 'zhouzi.graphql',
    name: 'GraphQL',
    description: 'Docusaurus plugin generating Markdown documentation from a GraphQL schema.',
    preview: null,
    website: 'https://gabinaureche.com/docusaurus-graphql-plugin',
    source: 'https://github.com/zhouzi/docusaurus-graphql-plugin',
    author: 'zhouzi',
    tags: ['api', 'content'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-graphql'],
  },
  {
    id: 'stackql.hubspot',
    name: 'Hubspot',
    description: 'Plugin to enable Hubspot with Docusaurus',
    preview: null,
    website: 'https://github.com/stackql/docusaurus-plugin-hubspot',
    source: 'https://github.com/stackql/docusaurus-plugin-hubspot',
    author: 'stackql',
    tags: ['utility', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['@stackql/docusaurus-plugin-hubspot'],
  },
  {
    id: 'gabrielcsapo.image-zoom',
    name: 'Image Zoom',
    description: 'Docusaurus plugin to utilize medium-zoom in your projects easily!',
    preview: null,
    website: 'https://gabrielcsapo.github.io/docusaurus-plugin-image-zoom',
    source: 'https://github.com/gabrielcsapo/docusaurus-plugin-image-zoom',
    author: 'gabrielcsapo',
    tags: ['utility', 'markdown'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-image-zoom'],
  },
  {
    id: 'simologos.includes',
    name: 'Includes',
    description: 'A Docusaurus plugin to include the contents of markdown files in other markdown files.',
    preview: null,
    website: 'https://github.com/simologos/docusaurus-plugin-includes',
    source: 'https://github.com/simologos/docusaurus-plugin-includes',
    author: 'simologos',
    tags: ['utility', 'markdown'],
    minimumVersion: '2.0.0-beta.5',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-includes'],
  },
  {
    id: 'nonoroazoro.less',
    name: 'Less',
    description: 'A Docusaurus plugin to compile Less files.',
    preview: null,
    website: 'https://www.npmjs.com/package/docusaurus-plugin-less',
    source: 'https://github.com/nonoroazoro/docusaurus-plugin-less',
    author: 'nonoroazoro',
    tags: ['utility', 'theme'],
    minimumVersion: '2.0.0-beta.9',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-less'],
  },
  {
    id: 'daldridge.lunr',
    name: 'Lunr',
    description: 'Docusaurus v2 plugin to create a local search index for use with Lunr.js.',
    preview: null,
    website: 'https://github.com/daldridge/docusaurus-plugin-lunr',
    source: 'https://github.com/daldridge/docusaurus-plugin-lunr',
    author: 'daldridge',
    tags: ['search', 'integration'],
    minimumVersion: '2.0.0-alpha.58',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-lunr'],
  },
  {
    id: 'karser.matomo',
    name: 'Matomo',
    description: 'A Docusaurus plugin to add Matomo analytics to your site.',
    preview: null,
    website: 'https://github.com/karser/docusaurus-plugin-matomo',
    source: 'https://github.com/karser/docusaurus-plugin-matomo',
    author: 'karser',
    tags: ['utility', 'analytics', 'integration'],
    minimumVersion: '2.0.0-alpha.56',
    maintenanceStatus: 'unknown', // no release in 14 months.
    npmPackages: ['docusaurus-plugin-matomo'],
  },
  {
    id: 'pomber.mdx-2',
    name: 'MDX 2',
    description: 'A Docusaurus theme to add support for MDX v2.',
    preview: null,
    website: 'http://docusaurus-mdx-2.vercel.app',
    source: 'https://github.com/pomber/docusaurus-mdx-2',
    author: 'pomber',
    tags: ['content', 'markdown', 'theme', 'integration'],
    minimumVersion: '2.0.0-beta.18',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-theme-mdx-v2', '@mdx-js/react@^2.0.0'],
  },
  {
    id: 'atomicpages.module-alias',
    name: 'Module Alias',
    description: 'A tiny docusaurus 2 plugin for easy module alias creation.',
    preview: null,
    website: 'https://github.com/atomicpages/docusaurus-plugin-module-alias',
    source: 'https://github.com/atomicpages/docusaurus-plugin-module-alias',
    author: 'atomicpages',
    tags: ['utility'],
    minimumVersion: '2.0.0-alpha.68',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-module-alias'],
  },
  {
    id: 'moesif.moesif',
    name: 'Moesif',
    description: 'A Docusaurus plugin to add Moesif API Analytics to your site.',
    preview: null,
    website: 'https://www.moesif.com/docs/client-integration/docusaurus/',
    source: 'https://github.com/Moesif/docusaurus-plugin-moesif',
    author: 'Moesif',
    tags: ['utility', 'api', 'analytics', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-moesif'],
  },
  {
    id: 'cloud-annotations.openapi',
    name: 'OpenAPI',
    description: '🦕 OpenAPI plugin for generating API reference docs in Docusaurus v2.',
    preview: null,
    website: 'https://docusaurus-openapi.netlify.app/',
    source: 'https://github.com/cloud-annotations/docusaurus-openapi',
    author: 'cloud-annotations',
    tags: ['api', 'content'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-preset-openapi'],
  },
  {
    id: 'paloaltonetworks.openapi-docs',
    name: 'OpenAPI Docs',
    description: '🦝 OpenAPI plugin for generating API reference docs in Docusaurus v2.',
    preview: null,
    website: 'https://docusaurus-openapi.tryingpan.dev/',
    source: 'https://github.com/PaloAltoNetworks/docusaurus-openapi-docs',
    author: 'PaloAltoNetworks',
    tags: ['api', 'content'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-openapi-docs', 'docusaurus-theme-openapi-docs'],
  },
  {
    id: 'infracost.plausible',
    name: 'Plausible',
    description: 'A Docusaurus plugin to add Plausible analytics to your site.',
    preview: null,
    website: 'https://github.com/infracost/docusaurus-plugin-plausible',
    source: 'https://github.com/infracost/docusaurus-plugin-plausible',
    author: 'infracost',
    tags: ['utility', 'analytics', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-plausible'],
  },
  {
    id: 'silva-nick.portfolio',
    name: 'Portfolio',
    description: 'A Docusaurus plugin to create a portfolio page from GitHub.',
    preview: null,
    website: 'https://silva-nick.github.io/portfolio',
    source: 'https://github.com/silva-nick/docusaurus-portfolio',
    author: 'silva-nick',
    tags: ['content', 'integration', 'theme'],
    minimumVersion: '2.0.0-beta.0',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-portfolio-init', 'docusaurus-portfolio-plugin', 'docusaurus-portfolio-theme'],
  },
  {
    id: 'posthog.posthog',
    name: 'PostHog',
    description: '🦔 A Docusaurus plugin to add PostHog analytics to your site.',
    preview: null,
    website: 'https://posthog.com/docs/integrate/third-party/docusaurus',
    source: 'https://github.com/PostHog/posthog-docusaurus',
    author: 'PostHog',
    tags: ['utility', 'analytics', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['posthog-docusaurus'],
  },
  {
    id: 'alt3.powershell',
    name: 'PowerShell',
    description: 'A PowerShell module to generate Docusaurus websites for other PowerShell modules.',
    preview: null,
    website: 'https://docusaurus-powershell.netlify.app',
    source: 'https://github.com/alt3/Docusaurus.Powershell',
    author: 'alt3',
    tags: ['content', 'markdown', 'utility', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: null,
  },
  {
    id: 'protobuffet.protobuffet',
    name: 'Protobuffet',
    description: 'A Docusaurus plugin to generate API reference docs from protobuf files.',
    preview: null,
    website: 'https://protobuffet.com/docs/what/overview#docusaurus',
    source: 'https://github.com/protobuffet/docusaurus-protobuffet',
    author: 'protobuffet',
    tags: ['api', 'content'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-protobuffet'],
  },
  {
    id: 'atomicpages.react-docgen',
    name: 'React DocGen',
    description: 'A Docusaurus 2.x plugin that help generate and consume auto-generated docs from react-docgen.',
    preview: null,
    website: 'https://github.com/atomicpages/docusaurus-plugin-react-docgen',
    source: 'https://github.com/atomicpages/docusaurus-plugin-react-docgen',
    author: 'atomicpages',
    tags: ['utility'],
    minimumVersion: '2.0.0-beta.21',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-react-docgen', 'react-docgen'],
  },
  {
    id: 'atomicpages.react-docgen-typescript',
    name: 'React DocGen Typescript',
    description: 'A tiny plugin that integrates react-docgen-typescript with docusaurus.',
    preview: null,
    website: 'https://github.com/atomicpages/docusaurus-plugin-react-docgen-typescript',
    source: 'https://github.com/atomicpages/docusaurus-plugin-react-docgen-typescript',
    author: 'atomicpages',
    tags: ['api', 'content'],
    minimumVersion: '2.0.0-beta.21',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-react-docgen-typescript'],
  },
  {
    id: 'gorhom.react-native',
    name: 'React Native',
    description: 'A Docusaurus plugin to add React Native Web and Reanimated support to your site.',
    preview: null,
    website: 'https://github.com/gorhom/docusaurus-react-native-plugin',
    source: 'https://github.com/gorhom/docusaurus-react-native-plugin',
    author: 'gorhom',
    tags: ['utility'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['@gorhom/docusaurus-react-native-plugin'],
  },
  {
    id: 'rohit-gohri.redocusaurus',
    name: 'Redocusaurus',
    description: 'A Docusaurus plugin to add API documentation to your site using the power of Redoc.',
    preview: null,
    website: 'https://redocusaurus.vercel.app',
    source: 'https://github.com/rohit-gohri/redocusaurus',
    author: 'rohit-gohri',
    tags: ['api', 'content'],
    minimumVersion: '2.0.0-beta.14',
    maintenanceStatus: 'maintained',
    npmPackages: ['redocusaurus'],
  },
  {
    id: 'rdilweb.remote-content',
    name: 'Remote Content',
    description: 'A Docusaurus v2 plugin to download content from remote sources when it is needed.',
    preview: null,
    website: 'https://github.com/rdilweb/docusaurus-plugin-remote-content',
    source: 'https://github.com/rdilweb/docusaurus-plugin-remote-content',
    author: 'rdilweb',
    tags: ['utility'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-remote-content'],
  },
  {
    id: 'jodyheavener.rss-feeds',
    name: 'RSS Feeds',
    description: 'A Docusaurus plugin to consume RSS feeds and render in Docusaurus.',
    preview: null,
    website: 'https://github.com/jodyheavener/docusaurus-plugin-rss-feeds',
    source: 'https://github.com/jodyheavener/docusaurus-plugin-rss-feeds',
    author: 'jodyheavener',
    tags: ['content', 'integration'],
    minimumVersion: '2.0.0-rc.1',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-rss-feeds'],
  },
  {
    id: 'rlamana.sass',
    name: 'SASS',
    description: 'Provides support for SASS/SCSS to Docusaurus v2',
    preview: null,
    website: 'http://docusaurus-plugin-sass.vercel.app/',
    source: 'https://github.com/rlamana/docusaurus-plugin-sass',
    author: 'rlamana',
    tags: ['theme', 'utility'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-sass', 'sass'],
  },
  {
    id: 'cmfcmf.search-local',
    name: 'Search Local',
    description: 'Offline / local search plugin for Docusaurus 2',
    preview: null,
    website: 'https://github.com/cmfcmf/docusaurus-search-local',
    source: 'https://github.com/cmfcmf/docusaurus-search-local',
    author: 'cmfcmf',
    tags: ['search'],
    minimumVersion: '2.0.0-beta.21',
    maintenanceStatus: 'maintained',
    npmPackages: ['@cmfcmf/docusaurus-search-local'],
  },
  {
    id: 'easyops-cn.search-local',
    name: 'Search Local',
    description: 'Offline / local search plugin for Docusaurus 2',
    preview: null,
    website: 'https://easyops-cn.github.io/docusaurus-search-local',
    source: 'https://github.com/easyops-cn/docusaurus-search-local',
    author: 'easyops-cn',
    tags: ['search'],
    minimumVersion: '2.0.0',
    maintenanceStatus: 'maintained',
    npmPackages: ['@easyops-cn/docusaurus-search-local'],
  },
  {
    id: 'gabrielcsapo.search-local',
    name: 'Search Local',
    description: 'Offline / local search plugin for Docusaurus 2',
    preview: null,
    website: 'https://gabrielcsapo.github.io/docusaurus-plugin-search-local',
    source: 'https://github.com/gabrielcsapo/docusaurus-plugin-search-local',
    author: 'gabrielcsapo',
    tags: ['search'],
    minimumVersion: '2.1.0',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-search-local'],
  },
  {
    id: 'typesense.search-typesense',
    name: 'Search Typesense',
    description: 'A Docusaurus plugin to add Typesense search to your site.',
    preview: null,
    website: 'https://typesense.org/docs/guide/docsearch.html#option-a-docusaurus-powered-sites',
    source: 'https://github.com/typesense/docusaurus-theme-search-typesense',
    author: 'typesense',
    tags: ['search', 'theme'],
    minimumVersion: '2.0.0-rc.1',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-theme-search-typesense'],
  },
  {
    id: 'branchup.simple-analytics',
    name: 'Simple Analytics',
    description: 'A Docusaurus plugin to add Simple Analytics to your site.',
    preview: null,
    website: 'https://docs.simpleanalytics.com/install-simple-analytics-with-docusaurus',
    source: 'https://github.com/branchup/docusaurus-plugin-simple-analytics',
    author: 'branchup',
    tags: ['utility', 'analytics', 'integration'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['@branchup/docusaurus-plugin-simple-analytics'],
  },
  {
    id: 'rileran.tailwind-css',
    name: 'Tailwind CSS',
    description: 'A Docusaurus plugin to add Tailwind CSS support to your site.',
    preview: null,
    website: 'https://github.com/Rileran/docusaurus-tailwindcss',
    source: 'https://github.com/Rileran/docusaurus-tailwindcss',
    author: 'Rileran',
    tags: ['theme', 'utility'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-tailwindcss'],
  },
  {
    id: 'rdilweb.template',
    name: 'Template',
    description: 'A Docusaurus plugin template to accelerate your plugin development.',
    preview: null,
    website: 'https://github.com/rdilweb/template-docusaurus-plugin',
    source: 'https://github.com/rdilweb/template-docusaurus-plugin',
    author: 'rdilweb',
    tags: ['favourite', 'utility'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: null,
  },
  {
    id: 'milessj.typedoc-api',
    name: 'TypeDoc API',
    description: 'Docusaurus plugin that provides source code API documentation powered by TypeDoc.',
    preview: null,
    website: 'https://github.com/milesj/docusaurus-plugin-typedoc-api',
    source: 'https://github.com/milesj/docusaurus-plugin-typedoc-api',
    author: 'milesj',
    tags: ['api', 'content'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: null,
  },
  {
    id: 'dipakparmar.umami',
    name: 'Umami',
    description: 'A Docusaurus plugin to add Umami analytics to your site.',
    preview: null,
    website: 'https://npmjs.org/package/@dipakparmar/docusaurus-plugin-umami',
    source: 'https://github.com/dipakparmar/docusaurus-plugin-umami',
    author: 'dipakparmar',
    tags: ['analytics', 'integration'],
    minimumVersion: '2.0.0-beta.6',
    maintenanceStatus: 'maintained',
    npmPackages: ['@dipakparmar/docusaurus-plugin-umami'],
  },
  {
    id: 'peterroe.usevue',
    name: 'UseVue',
    description: 'A Docusaurus plugin providing Vue-loader support.',
    preview: null,
    website: 'https://github.com/peterroe/docusaurus-plugin-usevue',
    source: 'https://github.com/peterroe/docusaurus-plugin-usevue',
    author: 'peterroe',
    tags: ['theme', 'utility'],
    minimumVersion: null,
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-usevue', 'use-vue-component'],
  },
  {
    id: 'sgromkov.yandex-metrica',
    name: 'Yandex Metrica',
    description: 'Yandex.Metrica plugin for Docusaurus v2',
    preview: null,
    website: 'https://github.com/sgromkov/docusaurus-plugin-yandex-metrica',
    source: 'https://github.com/sgromkov/docusaurus-plugin-yandex-metrica',
    author: 'sgromkov',
    tags: ['utility', 'analytics', 'integration'],
    minimumVersion: '2.0.0-rc.1',
    maintenanceStatus: 'maintained',
    npmPackages: ['docusaurus-plugin-yandex-metrica'],
  },
  /*
  Pro Tip: add your site in alphabetical order.
  Appending your site here (at the end) is more likely to produce Git conflicts.
   */
];

export type Plugin = {
  id: string;
  name: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  source: string | null;
  minimumVersion: string | null; // null = no minimum version
  author: string | null;
  tags: TagType[];
  maintenanceStatus: MaintainedType; // Any plugin with a known vulnerability is considered unmaintained, any plugin incompatible with latest Docusaurus stable version is considered unmaintained.
  npmPackages: string[] | null; // null = no npm package or complex installation process.
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: {[type in TagType]: Tag} = {
  favourite: {
    label: translate({message: 'Favourite'}),
    description: translate({
      message:
        'Our favourite Docusaurus plugins you should check out!',
      id: 'showcase.tag.favourite.description',
    }),
    color: '#e9669e',
  },

  search: {
    label: translate({message: 'Search'}),
    description: translate({
      message: 'Docusaurus plugins implementing new search functionalities for your site.',
      id: 'showcase.tag.search.description',
    }),
    color: '#ca3c25',
  },

  api: {
    label: translate({message: 'API'}),
    description: translate({
      message: 'Docusaurus plugins for API documentation, testing and more...',
      id: 'showcase.tag.api.description',
    }),
    color: '#e6af2e',
  },

  utility: {
    label: translate({message: 'Utility'}),
    description: translate({
      message:
        'Docusaurus plugins providing utility features, such as analytics, SASS support, image enhancements, etc.',
      id: 'showcase.tag.utility.description',
    }),
    color: '#baff29',
  },

  content: {
    label: translate({message: 'Content'}),
    description: translate({
      message:
        'Docusaurus plugins providing content enhancements, such as diagram embedding, code block enhancements, etc.',
      id: 'showcase.tag.content.description',
    }),
    color: '#820b8a',
  },

  theme: {
    label: translate({message: 'Theme'}),
    description: translate({
      message:
        'Docusaurus plugins implementing new themes or significant theme enhancements.',
      id: 'showcase.tag.theme.description',
    }),
    color: '#7eb2dd',
  },

  markdown: {
    label: translate({message: 'Markdown'}),
    description: translate({
      message:
        'Docusaurus plugins implementing new markdown features, such as admonitions, etc.',
      id: 'showcase.tag.markdown.description',
    }),
    color: '#49d49d',
  },

  integration: {
    label: translate({message: 'Integration'}),
    description: translate({
      message:
        'Docusaurus plugins integrating with external services, such as Algolia, Netlify, etc.',
      id: 'showcase.tag.integration.description',
    }),
    color: '#ff7700',
  },

  analytics: {
    label: translate({message: 'Analytics'}),
    description: translate({
      message:
        'Docusaurus plugins implementing new analytics features, such as Plausible, Matomo, etc.',
      id: 'showcase.tag.analytics.description',
    }),
    color: '#b892ff',
  },
};

export const TagList = Object.keys(Tags) as TagType[];

export type MaintenanceStatus = {
  label: string;
  description: string;
  icon: JSX.Element;
};

export const MaintenanceStatuses: {[type in MaintainedType]: MaintenanceStatus} = {
  maintained: {
    label: translate({message: 'Maintained'}),
    description: translate({
      message:
        'This plugin is maintained by its author and is compatible with the latest Docusaurus stable version.',
      id: 'showcase.maintenancestatus.maintained.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleCheck} color="#28a745" style={{marginLeft: 8}}/>,
  },
  unmaintained: {
    label: translate({message: 'Unmaintained'}),
    description: translate({
      message:
        'This plugin is not maintained by its author and is likely not compatible with the latest Docusaurus stable version.',
      id: 'showcase.maintenancestatus.unmaintained.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleXmark} color="#dc3545" style={{marginLeft: 8}}/>,
  },
  unknown: {
    label: translate({message: 'Unknown'}),
    description: translate({
      message:
        'We could not determine the maintenance status of this plugin.',
      id: 'showcase.maintenancestatus.unknown.description',
    }),
    icon: <FontAwesomeIcon icon={faCircleMinus} color="#ffc107" style={{marginLeft: 8}}/>,
  },
};

export const MaintenanceStatusList = Object.keys(MaintenanceStatuses) as MaintainedType[];

function sortPlugins() {
  let result = Plugins;
  // Sort by site name
  result = sortBy(result, (plugin) => plugin.name.toLowerCase());
  // Sort by favourite tag, favourites first
  result = sortBy(result, (plugin) => !plugin.tags.includes('favourite'));
  return result;
}

export const sortedPlugins = sortPlugins();

export const pluginCount = Plugins.length;
