module.exports = {
  title: 'nestjs-typegoose',
  tagline: 'Combine NestJS with Typegoose to reduce clutter',
  url: 'https://kpfromer.github.io',
  baseUrl: '/nestjs-typegoose/',
  favicon: 'img/favicon.ico',
  organizationName: 'kpfromer',
  projectName: 'nestjs-typegoose',
  themeConfig: {
    navbar: {
      title: 'Nestjs Typegoose',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
      links: [
        {to: 'docs/install', label: 'Docs', position: 'left'},
        {
          href: 'https://github.com/kpfromer/nestjs-typegoose',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Installation',
              to: 'docs/install',
            },
            {
              label: 'Getting Started',
              to: 'docs/usage',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/kpfromer/nestjs-typegoose',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kyle Pfromer.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/kpfromer/nestjs-typegoose/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
