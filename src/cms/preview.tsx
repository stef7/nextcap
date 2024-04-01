import type { CMS } from "decap-cms-core";
import type { GeneratedN, EntryImport } from "./api";
import settings from "@cms-content/settings.json";
import footer from "@cms-content/footer.json";
import { PostTemplate } from "@/components/templates/PostTemplate";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import { CmsPreviewContextProvider } from "@/contexts/CmsPreviewContext";
import { LayoutContextProvider } from "@/contexts/LayoutContextProvider";
import { CmsLoaderProps } from "./init";

const templateMap = {
  pages: PageTemplate,
  posts: PostTemplate,
  settings: undefined,
  footer: undefined,
  redirectsRewrites: undefined,
} as const satisfies { [K in GeneratedN]: React.FC<EntryImport<K>> | undefined };

export const registerPreviewTemplates = (CMS: CMS, cmsLoaderProps: CmsLoaderProps) => {
  for (const [name, MappedTemplate] of Object.entries(templateMap)) {
    CMS.registerPreviewTemplate(name, (props) => {
      const entry = props.entry.get("data").toJS();

      return (
        <CmsPreviewContextProvider value={props}>
          <LayoutContextProvider
            value={{
              ...cmsLoaderProps,
              settings: settings as EntryImport<"settings">,
              footer: footer as EntryImport<"footer">,
            }}
          >
            <style>{getCmsVariablesRootStyle(entry)}</style>
            {MappedTemplate ? (
              <DefaultLayout>
                <MappedTemplate {...entry} />
              </DefaultLayout>
            ) : (
              <DefaultLayout {...entry} />
            )}
          </LayoutContextProvider>
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
