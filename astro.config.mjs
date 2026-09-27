import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Mintlify Starter Kit',
      description: 'Documentation for your project',
      logo: {
        light: './src/assets/logo/light.svg',
        dark: './src/assets/logo/dark.svg',
      },
      favicon: './public/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: ['index', 'quickstart'],
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/imjustbackup/mintlifytest1',
        },
      ],
    }),
  ],
});
