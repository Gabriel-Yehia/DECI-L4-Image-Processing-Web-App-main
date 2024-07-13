// eslint.config.js
const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const eslintRecommended = require('eslint/conf/eslint-recommended');
const pluginRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended');

module.exports = {
  files: ['**/*.ts', '**/*.js', '**/*.mjs'],
  ignores: ['**/node_modules/**'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: {
    '@typescript-eslint': eslintPlugin,
  },
  rules: {
    ...eslintRecommended.rules,
    ...pluginRecommended.rules
  }
};
