import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://logica0419.dev",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
