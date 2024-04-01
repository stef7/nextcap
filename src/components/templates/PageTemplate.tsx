"use client";

import type { EntryImport } from "@/cms/api";
import { RenderModules } from "../renderers/RenderModules/RenderModules";
import type { SlugPageProps } from "@/app/(public)/[[...slug]]/page";

type PageTemplateProps = EntryImport<"pages"> &
  SlugPageProps & {
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
