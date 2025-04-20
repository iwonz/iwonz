import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const commonLanguageOptions = {
  parser,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  globals: {
    ...globals.browser,
    ...globals.node,
    ymaps: 'readonly',
  },
};

const commonPlugins = {
  'react-hooks': reactHooks,
  'react-refresh': reactRefresh,
  prettier,
  '@typescript-eslint': tsPlugin,
};

const commonRules = {
  ...js.configs.recommended.rules,
  ...tsPlugin.configs.recommended.rules,
  ...reactHooks.configs.recommended.rules,
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  'prettier/prettier': 'warn',
  'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
  '@typescript-eslint/no-explicit-any': 'off',
};

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: commonLanguageOptions,
    plugins: commonPlugins,
    rules: commonRules,
  },
];
