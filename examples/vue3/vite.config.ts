import { mergeConfig } from 'vite';
import baseConfig from '../../vite.config.base';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [vue()],
});
