import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://logica0419.dev",
  integrations: [sitemap()],
});
