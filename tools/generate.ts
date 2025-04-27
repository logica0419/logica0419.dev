// biome-ignore lint/correctness/noNodejsModules:
import { readdirSync, writeFileSync } from "node:fs";
// biome-ignore lint/correctness/noNodejsModules:
import { parse } from "node:path";
import { generateStaticParams as i18nGenerateStaticParams } from "@/i18n";

const getDirectoriesNameInDirectory = (dir: string): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true });

  return entries
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => parse(dirent.name).name);
};

const generateMarkDownLists = () => {
  const params = [] as { locale: string; id: string }[];
  const articleList = [] as { locale: string; id: string[] }[];

  const i18nParams = i18nGenerateStaticParams();
  for (const { locale } of i18nParams) {
    const dirNames = getDirectoriesNameInDirectory(
      `./contents/articles/${locale}`,
    );

    for (const dir of dirNames) {
      params.push({ locale, id: dir });
    }
    articleList.push({ locale, id: dirNames });
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

const main = () => {
  generateMarkDownLists();
};
main();
