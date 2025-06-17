import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [svelte()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
        'components': '/src/components',
        'layouts': '/src/layouts',
      }
    }
  }
});