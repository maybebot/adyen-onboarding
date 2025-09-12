import { mergeConfig } from 'vite';
import baseConfig from '../../vite.config.base';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [react()],
});
