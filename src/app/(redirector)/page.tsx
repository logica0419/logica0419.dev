"use client";

import { rootLangRedirect } from "@/i18n/utils";
import { useEffect } from "react";

const Page = () => {
  useEffect(rootLangRedirect, []);
  return <></>;
};
export default Page;
