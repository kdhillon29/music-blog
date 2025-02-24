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
import pagefind from "astro-pagefind";

// https://astro.build/config

export default defineConfig({
  site: "https://astro-music-blog.netlify.app/",
  output: "server",
  prefetch: {
    defaultStrategy: "viewport",
  },

  integrations: [
    mdx(),
    sitemap({
      // filter: (page) => page !== "/about",
    }),
    db(),
    preact({
      compat: true,
    }),
    icon(),
    auth(),
    pagefind(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["react-toastify"],
    },
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
      },
    },
  },
  // alias: {
  //   react: "preact-compat",
  //   "react-dom": "preact-compat",
  //   // Not necessary unless you consume a module using `createClass`
  //   "create-react-class": "preact-compat/lib/create-react-class",
  //   // Not necessary unless you consume a module requiring `react-dom-factories`
  //   "react-dom-factories": "preact-compat/lib/react-dom-factories",
  // },

  adapter: netlify(),
});
