"use client";

import { rootLangRedirect } from "@/i18n";
import { useEffect } from "react";

const Page = () => {
  useEffect(rootLangRedirect, []);

  return (
    <html lang="ja">
      <body suppressHydrationWarning={true} />
    </html>
  );
};
export default Page;
