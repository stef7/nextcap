"use client";

import type { EntryImport } from "@/cms/api";
import { RenderModules } from "../renderers/RenderModules/RenderModules";

type PageTemplateProps = EntryImport<"pages"> & {
  postsPageContent?: React.ReactNode;
  isServer?: boolean;
};

export const PageTemplate: React.FC<PageTemplateProps> = ({ MODULES, postsPageContent, isServer }) => {
  return (
    <>
      <RenderModules modules={MODULES} isServer={isServer} />

      {postsPageContent}
    </>
  );
};
