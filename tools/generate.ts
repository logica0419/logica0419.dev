// biome-ignore lint/correctness/noNodejsModules:
import { readdirSync, writeFileSync } from "node:fs";
// biome-ignore lint/correctness/noNodejsModules:
import { parse } from "node:path";
import { generateStaticParams as i18nGenerateStaticParams } from "@/i18n";

const getFilesNameInDirectory = (dir: string): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true });

  return entries
    .filter((dirent) => dirent.isFile())
    .map((dirent) => parse(dirent.name).name);
};

const generateMarkDownLists = () => {
  const params = [] as { locale: string; id: string }[];
  const articleList = [] as { locale: string; id: string[] }[];

  const i18nParams = i18nGenerateStaticParams();
  for (const { locale } of i18nParams) {
    const files = getFilesNameInDirectory(`./contents/articles/${locale}`);

    for (const file of files) {
      params.push({ locale, id: file });
    }
    articleList.push({ locale, id: files });
  }

  writeFileSync(
    "./src/app/[locale]/blogs/generated.json",
    JSON.stringify(articleList, null, 2),
  );
  writeFileSync(
    "./src/app/[locale]/blogs/[id]/generated.json",
    JSON.stringify(params, null, 2),
  );
};

generateMarkDownLists();
