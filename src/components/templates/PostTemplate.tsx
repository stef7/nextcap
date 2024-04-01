import type { EntryImport } from "@/cms/api";
import { RenderMarkdown } from "../renderers/RenderMarkdown/RenderMarkdown";

export const PostTemplate: React.FC<EntryImport<"posts">> = (post) => {
  return (
    <>
      <h1>{post.title}</h1>
      <RenderMarkdown markdown={post.markdown} />
    </>
  );
};
