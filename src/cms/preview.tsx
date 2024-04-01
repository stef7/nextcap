import type { CMS } from "decap-cms-core";
import type { GeneratedN, EntryImport } from "./api";
import { PostTemplate } from "@/components/templates/PostTemplate";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import { CmsLoaderProps } from "./init";
import { GlobalContextProviders } from "@/contexts";

const templateMap = {
  pages: (p) => <PageTemplate {...p} params={{}} searchParams={{}} />,
  posts: PostTemplate,
  settings: undefined,
  footer: undefined,
  redirectsRewrites: undefined,
} as const satisfies { [K in GeneratedN]: React.FC<EntryImport<K>> | undefined };

export const registerPreviewTemplates = (CMS: CMS, { layoutContext }: CmsLoaderProps) => {
  for (const [name, MappedTemplate] of Object.entries(templateMap)) {
    CMS.registerPreviewTemplate(name, (props) => {
      const entry = props.entry.get("data").toJS();
      return (
        <GlobalContextProviders layoutContext={layoutContext} cmsPreviewContext={props}>
          <style>{getCmsVariablesRootStyle(entry)}</style>
          {MappedTemplate ? (
            <DefaultLayout>
              <MappedTemplate {...entry} />
            </DefaultLayout>
          ) : (
            <DefaultLayout {...entry} />
          )}
        </GlobalContextProviders>
      );
    });
  }
};

export const registerPreviewStyles = (CMS: CMS) => {
  for (const sheet of Array.from(document.styleSheets)) {
    if (!sheet.href?.startsWith("/_next/")) continue;
    sheet.disabled = true;
    CMS.registerPreviewStyle(sheet.href);
  }
  // @todo mutation observer
};
