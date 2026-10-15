import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["dist/", "test-results/", "playwright-report/"],
  },
  js.configs.recommended,
  {
    rules: {
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: "error",
    },
  },
  {
    files: ["packages/challenge/src/**/*.js", "packages/shared/**/*.js", "template/src/**/*.js"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["*.config.js", "e2e/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
