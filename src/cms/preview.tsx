import type { CMS } from "decap-cms-core";
import type { GeneratedN, EntryImport } from "./api";
import { PostTemplate } from "@/components/templates/PostTemplate";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { DefaultLayout } from "@/components/templates/DefaultLayout";
import { CmsPreviewContextProvider } from "../contexts/preview-context";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";

const templateMap = {
  pages: PageTemplate,
  posts: PostTemplate,
  settings: (p) => <DefaultLayout {...p} settings={p} navTree={{ slug: [], children: [] }} />,
  footer: (p) => <DefaultLayout {...p} footer={p} navTree={{ slug: [], children: [] }} />,
  redirectsRewrites: () => null,
} as const satisfies { [K in GeneratedN]: React.FC<EntryImport<K>> };

export const registerPreviewTemplates = (cms: CMS) => {
  for (const [name, MappedTemplate] of Object.entries(templateMap)) {
    cms.registerPreviewTemplate(name, (props) => {
      const entry = props.entry.get("data").toJS();
      return (
        <CmsPreviewContextProvider value={props}>
          <style>{getCmsVariablesRootStyle(entry)}</style>
          <MappedTemplate {...entry} />
        </CmsPreviewContextProvider>
      );
    });
  }
};

export const identifyPreviewStylesToRegister = (previewStylesToRegister = Array.from(document.styleSheets)) => {
  const registerPreviewStyles = (cms: CMS) => {
    for (const { href, cssRules } of previewStylesToRegister)
      if (href) cms.registerPreviewStyle(href);
      else
        cms.registerPreviewStyle(
          Array.from(cssRules)
            .map((r) => r.cssText)
            .join("\n"),
          { raw: true },
        );
  };
  return { registerPreviewStyles, previewStylesToRegister };
};
