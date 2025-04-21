import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
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

const bizter = localFont({
  src: [
    {
      path: "./BIZTER-Regular.ttf",
      weight: "400",
    },
    {
      path: "./BIZTER-Bold.ttf",
      weight: "700",
    },
  ],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${bizter.className} font-sans`}>{children}</body>
    </html>
  );
};
export default RootLayout;
