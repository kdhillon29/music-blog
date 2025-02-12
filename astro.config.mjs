// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import db from "@astrojs/db";

import netlify from "@astrojs/netlify";

import preact from "@astrojs/preact";
import { remarkReadingTime } from "./src/utils/RemarkReadingTime";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  output: "server",
  integrations: [mdx(), sitemap(), db(), preact(), icon()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});