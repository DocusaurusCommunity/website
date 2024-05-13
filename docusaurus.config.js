"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the Docusaurus version.
var utils_1 = require("@docusaurus/utils");
// Setup our Prism themes.
var prism_react_renderer_1 = require("prism-react-renderer");
var lightCodeTheme = prism_react_renderer_1.themes.vsLight;
var darkCodeTheme = prism_react_renderer_1.themes.vsDark;
// Define our admonitions config.
var admonitionsConfig = {
    admonitions: {
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
            'release',
            'credit',
            'docu'
        ],
    },
};
// Import our remark plugins.
var remark_plugin_npm2yarn_1 = require("@docusaurus/remark-plugin-npm2yarn");
var docusaurus_remark_plugin_tab_blocks_1 = require("docusaurus-remark-plugin-tab-blocks");
var remark_math_1 = require("remark-math");
var rehype_katex_1 = require("rehype-katex");
var remark_deflist_1 = require("remark-deflist");
// Setup our common remark plugin config.
var remarkPluginsConfig = {
    remarkPlugins: [
        [remark_plugin_npm2yarn_1.default, { sync: true }],
        docusaurus_remark_plugin_tab_blocks_1.default,
        remark_math_1.default,
        rehype_katex_1.default,
        remark_deflist_1.default,
    ]
};
// Setup our common config options for docs plugin instances.
var commonDocsPluginConfig = __assign(__assign({ showLastUpdateAuthor: false, showLastUpdateTime: true, sidebarCollapsible: true, sidebarCollapsed: true }, admonitionsConfig), remarkPluginsConfig);
var docusaurus_plugin_plausible_1 = require("docusaurus-plugin-plausible");
/** @type {import('@docusaurus/types').Config} */
var config = {
    title: 'Docusaurus.community',
    tagline: 'Docusaurus community knowledge sharing and plugin directory.',
    favicon: 'img/favicon.ico',
    url: 'https://docusaurus.community',
    baseUrl: '/',
    organizationName: 'homotechsual', // Usually your GitHub org/user name.
    projectName: 'docusaurus.community', // Usually your repo name.
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            {
                docs: __assign({ routeBasePath: 'knowledge', sidebarPath: './sidebars.js', 
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/DocusaurusCommunity/website/edit/main/' }, commonDocsPluginConfig),
                blog: false,
                pages: __assign(__assign({}, admonitionsConfig), remarkPluginsConfig),
                theme: {
                    customCss: './src/scss/custom.scss',
                },
            },
        ],
    ],
    themeConfig: 
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
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
            hideOnScroll: true,
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
                    to: 'https://github.com/DocusaurusCommunity/website',
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
                            to: 'https://github.com/DocusaurusCommunity',
                        },
                    ],
                },
            ],
            copyright: "<a rel=\"license\" href=\"http://creativecommons.org/licenses/by-sa/4.0/\"><img alt=\"Creative Commons License\" style=\"border-width:0\" src=\"https://i.creativecommons.org/l/by-sa/4.0/80x15.png\" /></a><br />Licensed by the Docusaurus community under a <a rel=\"license\" href=\"http://creativecommons.org/licenses/by-sa/4.0/\">Creative Commons Attribution-ShareAlike 4.0 International License</a>.<br />Built with <a href=\"https://docusaurus.io\">Docusaurus v".concat(utils_1.DOCUSAURUS_VERSION, "</a>.<br /><span class=\"designedBy\">Designed with <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"heart\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z\"/></svg>\n        by <a href=\"https://homotechsual.dev\">homotechsual</a></span>."),
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
            additionalLanguages: ['powershell', 'bash', 'docker', 'diff', 'json', 'sass']
        },
    },
    plugins: [
        [
            '@docusaurus/plugin-ideal-image',
            /** @type {import('@docusaurus/plugin-ideal-image').Options} */
            {
                quality: 100,
                max: 1030, // max resized image's size.
                min: 640, // min resized image's size. if original is lower, use that size.
                steps: 2, // the max number of images generated between min and max (inclusive)
            },
        ],
        'docusaurus-plugin-sass',
        [
            docusaurus_plugin_plausible_1.default,
            {
                domain: 'docusaurus.community',
            },
        ],
        [
            '@docusaurus/plugin-content-docs',
            /** @type {import('@docusaurus/plugin-content-docs').Options} */
            __assign({ id: 'contributing', path: 'contributing', routeBasePath: 'contributing', sidebarPath: './sidebars.js', editUrl: 'https://github.com/homotechsual/docusaurus.community/tree/main/' }, commonDocsPluginConfig),
        ]
    ],
    webpack: {
        jsLoader: function (isServer) { return ({
            loader: 'swc-loader',
            options: {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                    },
                    transform: {
                        react: {
                            runtime: 'automatic',
                        }
                    },
                    target: 'es2017',
                },
                module: {
                    type: isServer ? 'commonjs' : 'es6',
                },
            },
        }); },
    },
    markdown: {
        format: 'detect',
        mermaid: true,
        mdx1Compat: {
            comments: false,
            headingIds: false,
            admonitions: false,
        }
    },
};
exports.default = config;
