import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [svelte()],
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        'components': '/src/components',
        'layouts': '/src/layouts',
      }
    }
  }
});