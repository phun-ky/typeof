import { defineConfig } from 'eslint/config';
import customConfig from '@phun-ky/eslint-config';

export default defineConfig([
  {
    files: ['**/*.js'],
    extends: [customConfig],

    // anything from here will override customConfig
    rules: {
      '@stylistic/no-extra-semi': '0'
    }
  }
]);
