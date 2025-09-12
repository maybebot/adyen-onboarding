import { defineConfig } from 'vite';
import { fakeNetlifyPlugin } from './fakeNetlifyPlugin.ts';
import { default as getTokenHandler } from './netlify/functions/token.mts';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  publicDir: resolve(import.meta.dirname, 'public'),
  plugins: [
    fakeNetlifyPlugin([
      {
        method: 'GET',
        route: '/.netlify/functions/token',
        fn: getTokenHandler,
      },
    ]),
  ],
});
