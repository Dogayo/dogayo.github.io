// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://dogayo.github.io',

  // CSS небольшой (~7 КБ): встроенный в HTML, он не блокирует первую отрисовку отдельным запросом.
  build: {
    inlineStylesheets: 'always'
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [vue()]
});