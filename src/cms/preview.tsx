import type { CMS } from "decap-cms-core";
import type { GeneratedN, EntryWithMeta, FolderN } from "./api";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import type { CmsLoaderProps } from "./init";

import { PostTemplate } from "@/components/templates/PostTemplate";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { CmsPreviewContextProvider } from "@/contexts/CmsPreviewContext";
import { defaultLocale, getLangDirection } from "@/utils/locale";

const templateMap = {
  pages: PageTemplate,
  posts: PostTemplate,
  settings: undefined,
  styling: undefined,
  footer: undefined,
  redirectsRewrites: undefined,
} as const satisfies { [K in GeneratedN]: K extends FolderN ? React.FC<EntryWithMeta<K>> : undefined };

export const registerPreviewTemplates = (CMS: CMS, cmsLoaderProps: CmsLoaderProps) => {
  for (const [name, MappedTemplate] of Object.entries(templateMap)) {
    CMS.registerPreviewTemplate(name, (props) => {
      const entry = props.entry.get("data").toJS();
      Object.assign(props.document.documentElement, {
        lang: defaultLocale.language ?? "",
        dir: getLangDirection(defaultLocale.language),
      });
      return (
        <CmsPreviewContextProvider value={props}>
          <style>
            {`body > div, body > div > div.frame-content { display: contents }`}
            {getCmsVariablesRootStyle(name === "styling" ? entry : undefined)}
          </style>
          {MappedTemplate ? (
            <DefaultLayout {...cmsLoaderProps}>
              <MappedTemplate entry={entry} {...entry} />
            </DefaultLayout>
          ) : (
            <DefaultLayout {...cmsLoaderProps} entry={entry} {...entry} />
          )}
        </CmsPreviewContextProvider>
      );
    });
  }
};

let styleObserver: MutationObserver;

export const registerPreviewStyles = (CMS: CMS) => {
  CMS.getPreviewStyles().length = 0;
  for (const sheet of Array.from(document.styleSheets)) {
    if (!sheet.href?.includes("/_next/")) continue;
    sheet.disabled = true;
    if (!CMS.getPreviewStyles().some((s) => s.value === sheet.href)) CMS.registerPreviewStyle(sheet.href);
  }

  styleObserver ??= new MutationObserver(() => registerPreviewStyles(CMS));
  styleObserver.observe(document.head, { childList: true });
};
