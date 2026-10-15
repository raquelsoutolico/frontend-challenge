import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["**/dist/", "**/test-results/", "**/playwright-report/", "template-export/"],
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
    files: ["packages/challenge/src/**/*.js", "packages/shared/**/*.js"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.config.js", "packages/challenge/e2e/**/*.js", "scripts/**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
