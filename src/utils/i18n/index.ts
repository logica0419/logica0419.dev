import { dictionary } from "@/utils/i18n/dictionary";
import type { GetStaticPaths } from "astro";
import languageDetector from "next-language-detector";

export const defaultLocale = "en";

const detector = languageDetector({
  fallbackLng: defaultLocale,
  supportedLngs: Object.keys(dictionary),
  order: ["navigator"],
});

export const detectLocale = () => {
  return detector.detect() ?? defaultLocale;
};

export const getStaticPaths = (() => {
  return Object.keys(dictionary).map((locale) => ({
    params: { locale: locale as Locales },
  }));
}) satisfies GetStaticPaths;

export type Locales = keyof typeof dictionary;
export type Translations = keyof (typeof dictionary)[Locales];

export const useTranslations = (locale: Locales) => {
  return (key: Translations) => {
    return dictionary[locale][key] || dictionary[defaultLocale][key];
  };
};
