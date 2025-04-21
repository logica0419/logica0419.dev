import languageDetector from "next-language-detector";
import { redirect } from "next/navigation";

const i18nConfig = {
  defaultLang: "ja",
  langs: ["ja", "en"],
};

export const generateStaticParams = (): { lang: string }[] =>
  i18nConfig.langs.map((lang) => ({
    lang: lang,
  }));

const detector = languageDetector({
  fallbackLng: i18nConfig.defaultLang,
  supportedLngs: i18nConfig.langs,
});

export const rootLangRedirect = () => {
  const detectedLng = detector.detect();
  if (detectedLng && detector.cache) {
    detector.cache(detectedLng);
  }

  redirect(`/${detectedLng}`);
};
