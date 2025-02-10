// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import db from "@astrojs/db";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  output: "server",
  integrations: [mdx(), sitemap(), db()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});
