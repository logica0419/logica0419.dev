import createMdxPlugin from "@next/mdx";
import type { NextConfig } from "next";
import withExportImages from "next-export-optimize-images";
import createNextIntlPlugin from "next-intl/plugin";

const mdxPluginOptions = {
  remarkPlugins: [
    ["remark-gfm"],
    ["remark-frontmatter", ["yaml"]],
    ["remark-mdx-frontmatter"],
    ["remark-breaks"],
  ],
  rehypePlugins: [
    ["@shikijs/rehype", { themes: { light: "light-plus", dark: "dark-plus" } }],
  ],
};

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  experimental: { inlineCss: true },
  turbopack: {
    rules: {
      "*.md": {
        loaders: [
          {
            loader: require.resolve("@next/mdx/mdx-js-loader.js"),
            options: {
              ...mdxPluginOptions,
              providerImportSource: "@/mdx-components.tsx",
            },
          },
        ],
        as: "*.tsx",
      },
    },
  },
};

const withIntl = createNextIntlPlugin();
const withMdx = createMdxPlugin({
  extension: /\.mdx?$/,
  //@ts-ignore
  options: {
    ...mdxPluginOptions,
  },
});
export default withExportImages(withIntl(withMdx(nextConfig)));
