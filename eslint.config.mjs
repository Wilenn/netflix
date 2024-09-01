import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {
      "extends": "next/core-web-vitals",
      "rules": {
        "@next/next/no-img-element": "off"
      }
},

  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];