import type { getFolderEntries } from "@/cms/api";
import Link from "next/link";
import { RenderImage } from "../renderers/RenderImage/RenderImage";

export type PostsListProps = {
  entries: Awaited<ReturnType<typeof getFolderEntries<"posts">>>;
};

export const PostsList: React.FC<PostsListProps> = ({ entries }) => {
  return (
    <ul>
      {entries.map(({ entry, path, uri }) => {
        //
        return (
          <li key={path}>
            hi
            <Link href={uri}>
              <RenderImage alt={entry.title} src={entry.thumbnail} />
              <h3>{entry.title}</h3>
              {entry.date && <time dateTime={entry.date}>{entry.date}</time>}
              {entry.description && <p>{entry.description}</p>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
