import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import languageDetector from "next-language-detector";

export const generateStaticParams = (): { locale: string }[] =>
  routing.locales.map((locale) => ({
    locale: locale,
  }));

const detector = languageDetector({
  fallbackLng: routing.defaultLocale,
  supportedLngs: [...routing.locales],
  order: ["navigator"],
});

export const rootLangRedirect = () => {
  const detectedLng = detector.detect() ?? routing.defaultLocale;
  redirect({ href: "/", locale: detectedLng });
};
