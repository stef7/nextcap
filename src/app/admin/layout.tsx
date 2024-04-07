import type { Metadata } from "next";
import { getNavTree } from "@/cms/api";
import { CmsLoader } from "@/cms/init";

export const metadata: Metadata = {
  title: "CMS",
};

export default async function AdminRootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en" data-cms>
      <body>
        <CmsLoader navTree={await getNavTree("pages")} />
        {children}
      </body>
    </html>
  );
}
