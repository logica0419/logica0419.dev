import sitemap from "@astrojs/sitemap";
import playformInline from "@playform/inline";
import { defineConfig } from "astro/config";
import remarkLinkCard from "remark-link-card-plus";

export default defineConfig({
  site: "https://logica0419.dev",
  integrations: [sitemap(), playformInline()],
  markdown: {
    shikiConfig: {
      themes: { light: "light-plus", dark: "dark-plus" },
    },
    remarkPlugins: [[remarkLinkCard, { cache: true }]],
  },
});
