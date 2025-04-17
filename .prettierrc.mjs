/**
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

// biome-ignore lint/style/noDefaultExport:
export default config;
