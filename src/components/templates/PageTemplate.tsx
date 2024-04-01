"use client";

import type { EntryImport } from "@/cms/api";
import { RenderModules } from "../renderers/RenderModules/RenderModules";

type PageTemplateProps = EntryImport<"pages"> & {
  postsPageContent?: React.ReactNode;
};

export const PageTemplate: React.FC<PageTemplateProps> = ({ MODULES, postsPageContent }) => {
  return (
    <>
      <RenderModules modules={MODULES} />

      {postsPageContent}
    </>
  );
};
