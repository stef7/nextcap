import settings from "@cms-content/settings.json";
import footer from "@cms-content/footer.json";
import { getNavTree } from "@/cms/api";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import { GlobalContextProviders } from "@/contexts";
import { DefaultLayout } from "@/components/templates/DefaultLayout";

export default async function PublicRootLayout({ children }: Readonly<React.PropsWithChildren>) {
  const navTree = await getNavTree("pages");

  return (
    <html lang="en" dir="auto">
      <head>
        <link rel="icon" href={settings.favicon} sizes="any" />
        <style>{getCmsVariablesRootStyle()}</style>
      </head>
      <body>
        <GlobalContextProviders
          cmsPreviewContext={undefined}
          layoutContext={{
            navTree,
            settings,
            footer,
          }}
        >
          <DefaultLayout>{children}</DefaultLayout>
        </GlobalContextProviders>
      </body>
    </html>
  );
}
