import icon from "@/app/[locale]/icon.webp";
import { generateStaticParams } from "@/i18n";
import Image from "next-export-optimize-images/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

export { generateStaticParams };

const Page = async ({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("index");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          src={icon}
          alt="logica icon"
          width={150}
          height={150}
          priority={true}
        />
        <h1 className="font-bold">{t("永見 拓人 (logica)")}</h1>
        <div className="list-inside list-decimal text-sm/6 text-center sm:text-left">
          Software Engineer | Singer | Composer | Designer
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden={true}
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          {t("学ぶ")}
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden={true}
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          {t("実装例を見る")}
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden={true}
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          {t("nextjs_orgへ")}
        </a>
      </footer>
    </div>
  );
};
export default Page;
