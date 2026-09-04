import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { markdownRehypePlugins } from "./rehype/plugins";

// https://astro.build/config
export default defineConfig({
   fonts: [
      {
         provider: fontProviders.google(),
         name: "Lato",
         cssVariable: "--font-ui",
      },
   ],
   prefetch: true,
   site: "https://maciejg.dev",
   integrations: [
      sitemap({
         entryLimit: 1000,
      }),
      mdx(),
      react(),
   ],
   markdown: {
      processor: unified({
         rehypePlugins: markdownRehypePlugins,
      }),
      syntaxHighlight: false,
   },
   vite: {
      plugins: [tailwindcss()],
   },
   output: "static",
   image: {
      service: {
         entrypoint: "astro/assets/services/sharp",
      },
   },
   adapter: vercel({ imageService: false, devImageService: "sharp" }),
});
