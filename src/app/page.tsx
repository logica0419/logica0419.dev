"use client";

import { rootLangRedirect } from "@/i18n/utils";
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
