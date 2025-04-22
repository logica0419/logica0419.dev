import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import languageDetector from "next-language-detector";

export const routing = defineRouting({
  locales: ["en", "ja"],
  defaultLocale: "ja",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

const detector = languageDetector({
  fallbackLng: routing.defaultLocale,
  supportedLngs: [...routing.locales],
  order: ["navigator"],
});

export const rootLangRedirect = () => {
  const detectedLng = detector.detect() ?? routing.defaultLocale;
  redirect({ href: "/", locale: detectedLng });
};

export const generateStaticParams = (): { locale: string }[] =>
  routing.locales.map((locale) => ({
    locale: locale,
  }));
