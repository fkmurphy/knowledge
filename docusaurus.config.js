// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Everything I know - Julian Murphy',
  tagline: '',
  favicon: 'img/favicon.ico',
  url: 'https://wiki.julianmurphy.ar',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'fkmurphy',
  projectName: 'knowledge',
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
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: "https://github.com/fkmurphy/knowledge/tree/main/",
        },
        blog: false,
        //blog: {
        //  showReadingTime: true,
        //  editUrl:
        //    'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //},
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-RW3MFPJBQW',
          anonymizeIP: true,
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
        title: 'Wiki',
        logo: {
          alt: 'Everything I Know Julian Murphy',
          src: 'img/logo.svg',
        },
        items: [
          //{
          //  type: 'docSidebar',
          //  sidebarId: 'tutorialSidebar',
          //  position: 'left',
          //  label: 'Wiki',
          //},
          //{to: '/blog', label: 'Blog', position: 'left'},
          //{
          //  href: 'https://github.com/facebook/docusaurus',
          //  label: 'GitHub',
          //  position: 'right',
          //},
        ],
      },
      //footer: {
      //  style: 'dark',
      //  links: [
      //    {
      //      title: 'Docs',
      //      items: [
      //        {
      //          label: 'Tutorial',
      //          to: '/docs/intro',
      //        },
      //      ],
      //    },
      //    {
      //      title: 'Community',
      //      items: [
      //        {
      //          label: 'Stack Overflow',
      //          href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //        },
      //        {
      //          label: 'Discord',
      //          href: 'https://discordapp.com/invite/docusaurus',
      //        },
      //        {
      //          label: 'Twitter',
      //          href: 'https://twitter.com/docusaurus',
      //        },
      //      ],
      //    },
      //    {
      //      title: 'More',
      //      items: [
      //        {
      //          label: 'Blog',
      //          to: '/blog',
      //        },
      //        {
      //          label: 'GitHub',
      //          href: 'https://github.com/facebook/docusaurus',
      //        },
      //      ],
      //    },
      //  ],
      //  copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      //},
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
