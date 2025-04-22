import "@/app/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://logica0419.dev"),
  title: {
    default: "logica / Takuto Nagami",
    template: "%s | logica / Takuto Nagami",
  },
  description:
    "Website of logica / Takuto Nagami. Software Engineer | Singer | Composer | Designer",
  alternates: {
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

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => children;
export default Layout;
