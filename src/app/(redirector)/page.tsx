"use client";

import { rootLangRedirect } from "@/common/i18n";
import { useEffect } from "react";

const Page = () => {
  useEffect(rootLangRedirect, []);
  return <></>;
};
export default Page;
