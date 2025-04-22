import "@/app/globals.css";
import { bizter } from "@/common/font";
import { generateStaticParams } from "@/i18n/utils";
import type { ReactNode } from "react";

export { generateStaticParams };

const Layout = async ({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) => {
  const { locale } = await params;

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
