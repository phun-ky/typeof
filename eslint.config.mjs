/* eslint-disable import/no-unused-modules */
import { defineConfig } from 'eslint/config';
import customConfig from 'eslint-config-phun-ky';

export default defineConfig([
  {
    extends: [customConfig]
  },
  {
    files: ['**/*.md'],
    rules: {
      'no-irregular-whitespace': 'off',
      '@stylistic/indent': 'off'
    }
  }
]);
