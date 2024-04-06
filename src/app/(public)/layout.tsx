import settings from "@cms-content/settings.json";
import footer from "@cms-content/footer.json";
import { EntryImport, getNavTree } from "@/cms/api";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { LayoutContextProvider } from "@/contexts/LayoutContextProvider";
import { defaultLocale, getLangDirection } from "@/utils/locale";
import { ProgressBar } from "@/components/atoms/ProgressBar";

export default async function PublicRootLayout({ children }: Readonly<React.PropsWithChildren>) {
  const navTree = await getNavTree("pages");

  return (
    <html lang={defaultLocale.language ?? ""} dir={getLangDirection(defaultLocale.language)}>
      <head>
        {"favicon" in settings && <link rel="icon" href={settings.favicon} sizes="any" />}
        <style>{getCmsVariablesRootStyle()}</style>
      </head>
      <body>
        <ProgressBar />
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
