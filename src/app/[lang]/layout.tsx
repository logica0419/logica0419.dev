import "@/app/globals.css";
import { rootMetadata as metadata } from "@/app/metadata";
import { bizter } from "@/common/font";
import { generateStaticParams } from "@/common/i18n";
import type { ReactNode } from "react";

export { generateStaticParams, metadata };

const Layout = async ({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ lang: string }> }>) => {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={`${bizter.className} font-sans`}>{children}</body>
    </html>
  );
};
export default Layout;
