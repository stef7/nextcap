import settings from "@cms-content/settings.json";
import { getNavTree } from "@/cms/api";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { defaultLocale, getLangDirection } from "@/utils/locale";
import { ProgressBar } from "@/components/atoms/ProgressBar";

export default async function PublicRootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang={defaultLocale.language ?? ""} dir={getLangDirection(defaultLocale.language)}>
      <head>
        {"favicon" in settings && <link rel="icon" href={settings.favicon} sizes="any" />}
        <style>{getCmsVariablesRootStyle()}</style>
      </head>
      <body>
        <ProgressBar />
        <DefaultLayout navTree={await getNavTree("pages")}>{children}</DefaultLayout>
      </body>
    </html>
  );
}
