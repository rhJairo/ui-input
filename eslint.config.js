import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  { ignores: ['dist/**', 'build/**', 'coverage/**'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // 'prettier/prettier': [
      //   'error',
      //   {
      //     singleQuote: true,
      //     semi: true,
      //     endOfLine: 'lf',
      //     trailingComma: 'es5',
      //   },
      // ],
      // TS
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // React
      'react/prop-types': 'off',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import/order
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],


      'no-console': 'warn',
      'no-debugger': 'error',
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
    },
  },

  // Use React’s flat config directly
  reactPlugin.configs.flat.recommended,

  // Translate legacy shareable configs
  ...compat.extends(
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ),
];
