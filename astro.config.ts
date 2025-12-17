import sitemap from "@astrojs/sitemap";
import playformInline from "@playform/inline";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkLinkCard from "remark-link-card-plus";

export default defineConfig({
  site: "https://logica0419.dev",
  integrations: [sitemap(), playformInline()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: { light: "light-plus", dark: "dark-plus" },
    },
    remarkPlugins: [[remarkLinkCard, { cache: true }]],
  },
});
