import createMdx from "@next/mdx";
import type { NextConfig } from "next";
import withExportImages from "next-export-optimize-images";
import createNextIntlPlugin from "next-intl/plugin";
import type { Pluggable, Plugin } from "unified";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  experimental: { inlineCss: true, mdxRs: true },
};

const withIntl = createNextIntlPlugin();
const withMdx = createMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      "remarkGfm" as Pluggable,
      "remarkFrontmatter" as Pluggable,
      "remarkBreaks" as Pluggable,
    ],
    rehypePlugins: [
      [
        "rehypeShiki" as unknown as Plugin,
        { themes: { light: "light-plus", dark: "dark-plus" } },
      ],
    ],
  },
});

export default withExportImages(withIntl(withMdx(nextConfig)));
