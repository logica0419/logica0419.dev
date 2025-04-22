import { cica } from "@/common/font";
import { generateStaticParams } from "@/i18n";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

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
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority={true}
        />
        <p>
          {t("現在の言語")}: <b>{locale}</b>
        </p>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            {t.rich("さあ、編集して始めましょう。", {
              code: (children) => (
                <code
                  className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold"
                  style={cica.style}
                >
                  {children}
                </code>
              ),
            })}
          </li>
          <li className="tracking-[-.01em]">
            {t("保存するだけで、すぐに変更を確認できます。")}
          </li>
        </ol>
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
