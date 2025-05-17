import sitemap from "@astrojs/sitemap";
import playformInline from "@playform/inline";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://logica0419.dev",
  integrations: [sitemap(), playformInline()],
  vite: {
    plugins: [tailwindcss()],
  },
});
