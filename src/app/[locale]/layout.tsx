import "@/app/globals.css";
import { bizter } from "@/common/font";
import { routing } from "@/i18n/routing";
import { generateStaticParams } from "@/i18n/utils";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { rootMetadata } from "../metadata";

export { generateStaticParams };
export const metadata = {
  ...rootMetadata,
  ...{ openGraph: { images: "../opengraph-image.png" } },
};

const Layout = async ({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${bizter.className} font-sans`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
};
export default Layout;
