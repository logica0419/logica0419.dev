import "@/app/globals.css";
import { rootMetadata as metadata } from "@/app/metadata";
import type { ReactNode } from "react";

export { metadata };

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang="ja">
    <body>{children}</body>
  </html>
);
export default Layout;
