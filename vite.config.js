import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  base: './', // Votre configuration actuelle pour Vercel
  plugins: [
    Sitemap({ 
      hostname: 'https://www.electroinfo.online',
      dynamicRoutes: [
        // C'est ici que vous pourrez ajouter les liens vers vos articles Firebase plus tard
      ]
    }),
  ],
})