import type { MDXComponents } from "mdx/types";

// biome-ignore lint/style/useNamingConvention:
export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    ...components,
  };
};
