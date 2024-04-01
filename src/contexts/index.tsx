"use client";

import settingsJson from "@cms-content/settings.json";
import footerJson from "@cms-content/footer.json";

import { LayoutContextProvider, LayoutContextType } from "./layout-context";
import { CmsPreviewContextProvider, CmsPreviewContextType } from "./cms-preview-context";

export const GlobalContextProviders: React.FC<
  React.PropsWithChildren<{
    layoutContext: LayoutContextType;
    cmsPreviewContext: CmsPreviewContextType;
  }>
> = ({
  layoutContext: { settings = settingsJson, footer = footerJson, navTree = { children: [], slug: [] } } = {},
  cmsPreviewContext,
  children,
}) => {
  return (
    <CmsPreviewContextProvider value={cmsPreviewContext}>
      <LayoutContextProvider value={{ navTree, settings, footer }}>{children}</LayoutContextProvider>
    </CmsPreviewContextProvider>
  );
};
