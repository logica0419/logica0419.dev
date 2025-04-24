import params from "@/app/[locale]/blogs/[id]/generated.json";
import { setRequestLocale } from "next-intl/server";

const generateStaticParams = (): { locale: string; id: string }[] => {
  return params;
};
export { generateStaticParams };

const Page = async ({
  params,
}: Readonly<{ params: Promise<{ locale: string; id: string }> }>) => {
  const { locale, id } = await params;
  setRequestLocale(locale);
  // const t = await getTranslations("index");

  const { default: Article } = await import(
    `@/../contents/articles/${locale}/${id}.md`
  );

  return <Article />;
};
export default Page;
