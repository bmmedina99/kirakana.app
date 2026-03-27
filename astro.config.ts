import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'
import robotsTxt from 'astro-robots-txt'
import { configSite } from './src/site.config'

export default defineConfig({
  site: configSite.url,
  integrations: [sitemap(), robotsTxt(), react()],
  fonts: [
    {
      name: 'Outfit',
      cssVariable: '--font-outfit',
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600],
      fallbacks: ['sans-serif'],
    },
    {
      name: 'Noto Serif JP',
      cssVariable: '--font-noto-serif-jp',
      provider: fontProviders.fontsource(),
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['japanese'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
