import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import robotsTxt from 'astro-robots-txt'
import { configSite } from './src/site.config'

import react from '@astrojs/react'

export default defineConfig({
  site: configSite.url,
  integrations: [sitemap(), robotsTxt(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
})
