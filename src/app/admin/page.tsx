import settings from "@cms-content/settings.json";
import footer from "@cms-content/footer.json";
import { getNavTree } from "@/cms/api";
import { CmsLoader } from "@/cms/init";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS",
};

export default async function AdminCmsPage() {
  const navTree = await getNavTree("pages");

  return (
    <html lang="en" className="is-cms">
      <body>
        <CmsLoader layoutContext={{ navTree, settings, footer }} />
      </body>
    </html>
  );
}
