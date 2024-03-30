import type { EntryImport } from "@/cms/api";
import { RenderModules } from "../renderers/RenderModules/RenderModules";

export const PostTemplate: React.FC<EntryImport<"posts">> = (post) => {
  return (
    <>
      <h1>{post.title}</h1>
      <RenderModules modules={post.MODULES} />
    </>
  );
};
