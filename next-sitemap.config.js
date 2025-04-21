/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://logica0419.dev",
  output: "export",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: "",
      },
    ],
  },
};
