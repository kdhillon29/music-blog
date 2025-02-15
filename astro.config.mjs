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

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-music-blog.netlify.app",
  output: "server",
  integrations: [mdx(), sitemap(), db(), preact(), icon(), auth()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});
