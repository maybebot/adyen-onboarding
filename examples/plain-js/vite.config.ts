import { mergeConfig } from 'vite';
import baseConfig from '../../vite.config.base';

// https://vite.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [],
});
