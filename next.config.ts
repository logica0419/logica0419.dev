import type { NextConfig } from "next";
import withExportImages from "next-export-optimize-images";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  experimental: { inlineCss: true },
};

export default withExportImages(createNextIntlPlugin()(nextConfig));
