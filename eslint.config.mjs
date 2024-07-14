import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { parse, stringify } from 'flatted';
import { ESLint } from 'eslint';

// Your ESLint configuration
const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};

// Convert the configuration to a JSON string and back to handle circular references
const jsonString = stringify(config);
const parsedConfig = parse(jsonString);

// Create an ESLint instance with the parsed configuration
const eslint = new ESLint({
  baseConfig: parsedConfig,
  // other options
});

// Use the eslint instance as needed



export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];