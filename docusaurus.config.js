// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docusaurus.community',
  tagline: 'Docusaurus community knowledge sharing and plugin directory.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docusaurus.community',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'homotechsual', // Usually your GitHub org/user name.
  projectName: 'docusaurus.community', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  

  // Even if you don't use internationalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'knowledge',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/homotechsual/docusaurus.community/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          admonitions: {
            tag: ':::',
            keywords: [
              'discord',
              'info',
              'success',
              'danger',
              'note',
              'tip',
              'warning',
              'important',
              'caution',
              'powershell',
              'security',
              'ninja',
              'release'
            ],
          },
        },
        blog: false,
        pages: {
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          admonitions: {
            tag: ':::',
            keywords: [
              'discord',
              'info',
              'success',
              'danger',
              'note',
              'tip',
              'warning',
              'important',
              'caution',
              'powershell',
              'security',
              'ninja',
              'release'
            ],
          },
        },
        theme: {
          customCss: require.resolve('./src/scss/custom.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Docusaurus.community',
        logo: {
          alt: 'Docusaurus.community Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Knowledge',
          },
          {
            to: 'plugindirectory',
            position: 'left',
            label: 'Plugin Directory',
          },
          {
            to: 'https://github.com/sponsors/homotechsual/',
            label: 'Sponsor',
            position: 'right',
            target: '_blank',
            className: 'sponsorship-link',
          },
          {
            to: 'https://docusaurus.io',
            label: 'Docusaurus',
            position: 'right',
            target: '_blank',
            className: 'docusaurus-link',
          },
          {
            to: 'https://discord.gg/docusaurus',
            label: 'Discord',
            position: 'right',
            target: '_blank',
            className: 'discord-link',
          },
          {
            to: 'https://github.com/homotechsual/docusaurus.community',
            label: 'GitHub',
            position: 'right',
            target: '_blank',
            className: 'github-link',
          },
        ],
      },
      footer: {
        logo: {
          alt: 'Docusaurus Logo',
          src: 'img/Docusaurus.svg',
          href: 'https://docusaurus.io',
          height: 50,
          width: 50,
        },
        style: 'dark',
        links: [
          {
            title: 'Guides',
            items: [
              {
                label: 'Knowledge',
                to: '/knowledge/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                to: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                to: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                to: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Docusaurus Blog',
                to: 'https://docusaurus.io/blog',
              },
              {
                label: 'Docusaurus GitHub',
                to: 'https://github.com/facebook/docusaurus',
              },
              {
                label: 'Community GitHub',
                to: 'https://github.com/homotechsual/docusaurus.community',
              },
            ],
          },
        ],
        copyright: `<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /></a><br />Licensed by the Docusaurus community under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.<br />Built with <a href="https://docusaurus.io">Docusaurus</a>.<br /><span class="designedBy">Designed with <svg xmlns="http://www.w3.org/2000/svg" class="heart" width="24" height="24" viewBox="0 0 24 24"><path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"/></svg>
        by <a href="https://homotechsual.dev">homotechsual</a></span>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    '@docusaurus/plugin-ideal-image',
    'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-plausible',
      {
        domain: 'docusaurus.community',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributing',
        path: 'contributing',
        routeBasePath: 'contributing',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/homotechsual/docusaurus.community/tree/main/',
      },
    ]
  ],
};

module.exports = config;
