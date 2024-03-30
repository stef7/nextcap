import settings from "@cms-content/settings.json";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { getAnyFolderEntryByUuid, getNavTree } from "@/cms/api";

export default async function PublicRootLayout({ children }: React.PropsWithChildren) {
  const navTree = await getNavTree();

  const e = await getAnyFolderEntryByUuid("d00cf0e5-c592-4c56-8a69-127650685a32");

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={settings.favicon} sizes="any" />
        <style>{getCmsVariablesRootStyle()}</style>
      </head>
      <body>
        <DefaultLayout navTree={navTree}>
          <pre>{JSON.stringify({ navTree, e: e || 0 }, null, 1)}</pre>
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}
