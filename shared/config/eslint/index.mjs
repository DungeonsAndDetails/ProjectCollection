import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const unusedVarsRule = [
  'warn',
  {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_',
  },
];

const importOrderRule = [
  'warn',
  {
    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
    'newlines-between': 'never',
    alphabetize: {
      order: 'asc',
      caseInsensitive: true,
    },
  },
];

const commonRules = {
  curly: ['error', 'all'],
  eqeqeq: ['error', 'always'],
  'no-var': 'error',
  'object-shorthand': ['warn', 'always'],
  'prefer-const': [
    'warn',
    {
      destructuring: 'all',
    },
  ],
  'import/order': importOrderRule,
};

const config = [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
  js.configs.recommended,
  {
    files: ['apps/*/frontend/**/*.{js,jsx}', 'shared/components/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      import: importPlugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      ...reactHooks.configs.recommended.rules,
      ...commonRules,
      'no-unused-vars': unusedVarsRule,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['apps/*/backend/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...commonRules,
      'no-unused-vars': unusedVarsRule,
    },
  },
  {
    files: ['shared/config/**/*.mjs', 'eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...commonRules,
      'no-unused-vars': unusedVarsRule,
    },
  },
  {
    files: ['e2e/**/*.js', 'playwright.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...commonRules,
      'no-unused-vars': unusedVarsRule,
    },
  },
  {
    files: ['shared/config/**/*.cjs', 'prettier.config.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...commonRules,
      'no-unused-vars': unusedVarsRule,
    },
  },
];

export default config;
