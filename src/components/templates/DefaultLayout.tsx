import "@/styles/global.css";

import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import type { EntryImport, NavTree } from "@/cms/api";
import { Navigation } from "../organisms/Navigation";

export type DefaultLayoutProps = React.PropsWithChildren<{
  navTree: NavTree;
  settings?: EntryImport<"settings">;
  footer?: EntryImport<"footer">;
}>;

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, navTree, settings, footer }) => {
  return (
    <>
      <ul id="skip-links" className="sr-only focus-within:not-sr-only !fixed">
        <li>
          <a href="#main-content">Skip to main content</a>
        </li>
      </ul>

      <Header settings={settings} navigation={<Navigation navTree={navTree} />} />

      <main id="main-content" className="flex-grow">
        {children}
      </main>

      <Footer footer={footer} />
    </>
  );
};
