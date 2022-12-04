// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
            'https://github.com/homotechsual/docusaurus.community/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
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
            title: 'Knowledge',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
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
                href: 'https://github.com/facebook/docusaurus',
              },
              {
                label: 'Community GitHub',
                href: 'https://github.com/homotechsual/docusaurus.community',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} the Docusaurus community. Built with <a href="https://docusaurus.io">Docusaurus</a>.`,
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
    ]
  ],
};

module.exports = config;
