import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from "@tailwindcss/vite";
import vercelStatic from '@astrojs/vercel/static';

export default defineConfig({
  integrations: [svelte()],
  output: 'static',
  adapter: vercelStatic(),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
        'components': '/src/components',
        'layouts': '/src/layouts',
      }
    }
  },
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});