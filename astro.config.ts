import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import robotsTxt from 'astro-robots-txt'
import { configSite } from './src/site.config'

export default defineConfig({
  site: configSite.url,
  integrations: [sitemap(), robotsTxt()],
  vite: {
    plugins: [tailwindcss()],
  },
})
