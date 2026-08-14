// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const importPlugin = require('eslint-plugin-import');

module.exports = defineConfig([
  expoConfig,
  importPlugin.flatConfigs.recommended,
  prettierConfig,
  {
    ignores: ['/.expo', 'node_modules'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    // eslint-plugin-react uses context.getFilename() (removed in ESLint v10) when
    // version is 'detect'. Pinning to the installed version avoids the crash.
    settings: {
      react: { version: '19.0' },
    },
    rules: {
      'no-console': ['error', { allow: ['error', 'warn'] }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'react/display-name': 'off',
    },
  },
]);
