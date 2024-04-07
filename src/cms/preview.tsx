import type { CMS } from "decap-cms-core";
import type { GeneratedN, EntryImport } from "./api";
import { PostTemplate } from "@/components/templates/PostTemplate";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import { CmsPreviewContextProvider } from "@/contexts/CmsPreviewContext";
import { CmsLoaderProps } from "./init";
import { Footer } from "@/components/organisms/Footer";

const templateMap = {
  pages: PageTemplate,
  posts: PostTemplate,
  settings: undefined,
  footer: Footer,
  redirectsRewrites: undefined,
  styling: undefined,
} as const satisfies { [K in GeneratedN]: React.FC<EntryImport<K>> | undefined };

export const registerPreviewTemplates = (CMS: CMS, cmsLoaderProps: CmsLoaderProps) => {
  for (const [name, MappedTemplate] of Object.entries(templateMap)) {
    CMS.registerPreviewTemplate(name, (props) => {
      const entry = props.entry.get("data").toJS();

      return (
        <CmsPreviewContextProvider value={props}>
          <style>{getCmsVariablesRootStyle(entry)}</style>
          {MappedTemplate ? (
            <DefaultLayout navTree={cmsLoaderProps.navTree}>
              <MappedTemplate {...entry} />
            </DefaultLayout>
          ) : (
            <DefaultLayout {...entry} navTree={cmsLoaderProps.navTree} />
          )}
        </CmsPreviewContextProvider>
      );
    });
  }
};

let styleObserver: MutationObserver;

export const registerPreviewStyles = (CMS: CMS) => {
  for (const sheet of Array.from(document.styleSheets)) {
    if (!sheet.href?.includes("/_next/")) continue;
    sheet.disabled = true;
    CMS.registerPreviewStyle(sheet.href);
  }

  styleObserver ??= new MutationObserver(() => registerPreviewStyles(CMS));
  styleObserver.observe(document.head, { childList: true });
};
