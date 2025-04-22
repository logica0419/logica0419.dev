import { routing } from "@/i18n";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../contents/i18n/${locale}.json`)).default,
  };
});
