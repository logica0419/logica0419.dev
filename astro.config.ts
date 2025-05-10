import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
// biome-ignore lint/style/noDefaultExport:
export default defineConfig({
  site: "https://logica0419.dev",
  integrations: [sitemap()],
});
