import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.recommended,
  reactHooks.configs.recommended,
  jsxA11y.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      prettier: prettier
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: true,
          endOfLine: "lf",
          trailingComma: "es5"
        }
      ],

      /** Typescript */
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      /** React */
      "react/prop-types": "off",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /** Import/order */
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "index"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always"
        }
      ],

      "no-console": "warn",
      "no-debugger": "error",
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error"
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
);
