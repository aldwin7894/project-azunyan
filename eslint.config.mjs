import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier/flat'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  globalIgnores([
    "**/*.config.mjs",
    "**/package.json",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    extends: compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:tailwindcss/recommended",
      "plugin:prettier/recommended",
    ),
    plugins: {
      "@typescript-eslint": typescriptEslint,
      tailwindcss,
      prettier,
    },
    languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
        },
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "commonjs",
        parserOptions: {
          project: ["./tsconfig.json"],
          ecmaFeatures: {
            jsx: true,
          },
        },
    },
    rules: {
         quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      "no-underscore-dangle": "off",
      "no-param-reassign": "off",
      "comma-dangle": [
        "error",
        "only-multiline"
      ],
      "no-undef": "warn",
      "prettier/prettier": "error",
      "import/no-extraneous-dependencies": "off",
      "no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "tailwindcss/no-custom-classname": "off"
    },
}]);
