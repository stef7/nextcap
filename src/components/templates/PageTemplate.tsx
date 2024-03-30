import type { EntryImport } from "@/cms/api";
import { RenderModules } from "../renderers/RenderModules/RenderModules";

export const PageTemplate: React.FC<EntryImport<"pages">> = (page) => {
  return (
    <>
      <h1>{page.title}</h1>
      <RenderModules modules={page.MODULES} />
    </>
  );
};
