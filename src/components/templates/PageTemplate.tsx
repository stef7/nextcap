import type { EntryWithMeta } from "@/cms/api";
import { RenderModules } from "../renderers/RenderModules/RenderModules";
import { PostsList } from "../organisms/PostsList";
import { ImagePlaceholderContextProvider } from "@/contexts/ImagePlaceholderContext";

type PageTemplateProps = EntryWithMeta<"pages"> & {
  postsPromise?: Promise<EntryWithMeta<"posts">[]>;
};

export const PageTemplate: React.FC<PageTemplateProps> = ({ entry, images, postsPromise }) => {
  return (
    <ImagePlaceholderContextProvider value={images}>
      <RenderModules modules={entry.MODULES} />

      {postsPromise && <PostsList postsPromise={postsPromise} />}
    </ImagePlaceholderContextProvider>
  );
};
