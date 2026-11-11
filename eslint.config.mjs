import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { files: ["scripts/**/*.cjs", "server.js"], rules: { "@typescript-eslint/no-require-imports": "off" }, languageOptions: { globals: { require: "readonly", __dirname: "readonly", process: "readonly", console: "readonly", Buffer: "readonly", setTimeout: "readonly", clearTimeout: "readonly", URL: "readonly", fetch: "readonly", Request: "readonly", Response: "readonly" } } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "sashtech/**",
  ]),
]);

export default eslintConfig;
