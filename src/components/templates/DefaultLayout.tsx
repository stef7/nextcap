'use client';

import "@/styles/globals.css";

import type { EntryImport } from "@/cms/api";
import settingsJson from "@cms-content/settings.json";
import footerJson from "@cms-content/footer.json";
import Link from "next/link";
import { RenderImage } from "../renderers/RenderImage/RenderImage";
import { Navigation } from "../organisms/Navigation";
import { LayoutContextProvider, LayoutContextType } from "@/contexts/layout-context";

type DefaultLayoutProps = React.PropsWithChildren<
  {
    settings?: EntryImport<"settings">;
    footer?: EntryImport<"footer">;
  } & LayoutContextType
>;

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  settings = settingsJson as EntryImport<"settings">,
  footer = footerJson as EntryImport<"footer">,
  navTree,
}) => {
  return (
    <LayoutContextProvider value={{ navTree }}>
      <div className="p-[13.54vw]">
        <header>
          <Link href="/">
            {settings.logo ? (
              <RenderImage
                src={settings.logo}
                alt={settings.title || "Logo"}
                title={settings.title}
                width={400}
                height={300}
                priority
              />
            ) : (
              <div>{settings.title}</div>
            )}
          </Link>
          <Navigation />
        </header>

        <main>{children}</main>

        <footer>footer {footer.socials?.facebook}</footer>
      </div>
    </LayoutContextProvider>
  );
};
