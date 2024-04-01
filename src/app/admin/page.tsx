import { getNavTree } from "@/cms/api";
import { CmsLoader } from "@/cms/init";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS",
};

export default async function AdminCmsPage() {
  const navTree = await getNavTree("pages");

  return (
    <html lang="en" data-cms>
      <body>
        <CmsLoader navTree={navTree} />
      </body>
    </html>
  );
}
