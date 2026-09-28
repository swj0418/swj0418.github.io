// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// If you move to a custom domain, change `site` (and add public/CNAME).
export default defineConfig({
  site: 'https://swj0418.github.io',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
