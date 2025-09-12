import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fakeNetlifyPlugin } from './fakeNetlifyPlugin.ts';
import { default as getTokenHandler } from './netlify/functions/token.mts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    fakeNetlifyPlugin([
      {
        method: 'GET',
        route: '/.netlify/functions/token',
        fn: getTokenHandler,
      },
    ]),
  ],
});
