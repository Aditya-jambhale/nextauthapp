import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser", // Specify TypeScript parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json", // Ensure TypeScript uses your tsconfig
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable restriction on `any`
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disable mandatory return type
    },
  },
];

export default eslintConfig;
