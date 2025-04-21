import type { Metadata } from "next";

export const rootMetadata: Metadata = {
  metadataBase: new URL("https://logica0419.dev"),
  title: {
    default: "logica / Takuto Nagami",
    template: "%s | logica / Takuto Nagami",
  },
  description:
    "Website of logica / Takuto Nagami. Software Engineer | Singer | Composer | Designer",
  alternates: {
    canonical: "https://logica0419.dev",
    languages: {
      en: "https://logica0419.dev/en",
      ja: "https://logica0419.dev/ja",
    },
  },
  openGraph: {
    title: "logica / Takuto Nagami",
    description:
      "Website of logica / Takuto Nagami. Software Engineer | Singer | Composer | Designer",
    url: "https://logica0419.dev",
    siteName: "logica / Takuto Nagami",
  },
};
