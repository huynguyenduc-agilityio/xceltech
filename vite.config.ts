import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';

// Clear specific environment variables
delete process.env['CommonProgramFiles(x86)'];
delete process.env['ProgramFiles(x86)'];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), EnvironmentPlugin('all')],
});
