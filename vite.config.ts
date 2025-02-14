import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {withZephyr} from 'vite-plugin-zephyr'

const mfConfig = {
  name: 'vite-mcmaster-host',
  filename: 'remoteEntry.js',
  remotes: {
    'vite-remote': {
      name: 'vite-remote',
      entry: 'http://localhost:5174/remoteEntry.js',
      type: 'module',
    },
  },
  shared: {
    react: {
      singleton: true,
    },
    'react-dom': {
      singleton: true,
    },
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), withZephyr({mfConfig})],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'chrome130',
  },
});
