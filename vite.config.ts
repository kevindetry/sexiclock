/* eslint-env node */

import react from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { defineConfig } from "vite";

const supportedBrowsers = ["chrome", "edge", "firefox", "ios", "safari"];

const target = supportedBrowsers.flatMap((browser) => {
  const version = browserslist(
    `last 2 ${browser} major versions and last 1 year`
  )
    .at(-1)
    ?.split(" ")
    .at(-1);
  if (!version) return [];
  return [`${browser}${Number.parseFloat(version)}`];
});

export default defineConfig({
  build: {
    polyfillModulePreload: false,
    sourcemap: true,
    target,
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
});
