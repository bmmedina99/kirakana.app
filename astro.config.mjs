import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

export default defineConfig({
  // Cambiar la URL con el dominio de tu sitio
  site: 'https://localhost:5000',
  integrations: [sitemap(), robotsTxt()],
  vite: {
    plugins: [tailwindcss()],
  },
})
