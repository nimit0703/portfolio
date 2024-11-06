// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

// Resolve paths using Vite's configuration
const alias = {
  '@': fileURLToPath(new URL('./src', import.meta.url)), // Ensure the alias is correctly defined
};

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // Allows using global methods like 'describe', 'it', etc.
    environment: 'jsdom', // Set up a DOM-like environment for your tests
    css: false, // Ignore CSS imports during tests
    coverage: {
      reporter: ['text', 'json', 'html'], // Set the coverage reporters
    },
    logHeapUsage: true,
    alias, // Add the alias here to use in tests
    reporters: ['default', 'verbose'],
    setupFiles: './setup.ts'
  },
});
