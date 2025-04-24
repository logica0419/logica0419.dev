import { generateStaticParams } from "@/i18n";
import { setRequestLocale } from "next-intl/server";

export { generateStaticParams };

const Page = async ({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) => {
  const { locale } = await params;
  setRequestLocale(locale);
  // const t = await getTranslations("index");

  return <div>This is blog list</div>;
};
export default Page;
