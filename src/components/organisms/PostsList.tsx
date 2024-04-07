import type { EntryWithMeta } from "@/cms/api";
import Link from "next/link";
import { LocaleContextProvider } from "@/contexts/LocaleContext";
import { DateTime } from "../atoms/DateTime";
import { getLangAttributes } from "@/utils/locale";
import { RenderImage } from "../renderers/RenderImage/RenderImage";
import { use } from "react";
import { ImagePlaceholderContextProvider } from "@/contexts/ImagePlaceholderContext";

type Posts = EntryWithMeta<"posts">[];

const PostsListItem: React.FC<Posts[number]> = ({ uri, entry, images }) => {
  return (
    <ImagePlaceholderContextProvider value={images}>
      <LocaleContextProvider language={entry.lang} timeZone={entry.timeZone}>
        <li className="-contents block" {...getLangAttributes(entry.lang)}>
          <Link href={uri} className="block">
            <RenderImage alt={entry.title} src={entry.thumbnail} />
            <h3>{entry.title}</h3>
            <DateTime dateTime={entry.date} />
            {entry.description && <p>{entry.description}</p>}
          </Link>
        </li>
      </LocaleContextProvider>
    </ImagePlaceholderContextProvider>
  );
};

export const PostsList: React.FC<{ postsPromise: Promise<Posts> }> = ({ postsPromise }) => {
  const posts = use(postsPromise);
  return (
    <div className="p-container pi-containerInline">
      <ul>
        {posts.map((entry) => (
          <PostsListItem {...entry} key={entry.path} />
        ))}
      </ul>
    </div>
  );
};
