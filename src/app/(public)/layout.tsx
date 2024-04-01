import settings from "@cms-content/settings.json";
import footer from "@cms-content/footer.json";
import { EntryImport, getNavTree } from "@/cms/api";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { LayoutContextProvider } from "@/contexts/LayoutContextProvider";

export default async function PublicRootLayout({ children }: Readonly<React.PropsWithChildren>) {
  const navTree = await getNavTree("pages");

  return (
    <html lang={settings.lang || "en"} dir="auto">
      <head>
        <link rel="icon" href={settings.favicon} sizes="any" />
        <style>{getCmsVariablesRootStyle()}</style>
      </head>
      <body>
        <LayoutContextProvider
          value={{
            navTree,
            settings: settings as EntryImport<"settings">,
            footer: footer as EntryImport<"footer">,
          }}
        >
          <DefaultLayout>{children}</DefaultLayout>
        </LayoutContextProvider>
      </body>
    </html>
  );
}
