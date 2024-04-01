import type { getFolderEntries } from "@/cms/api";
import Link from "next/link";
import { RenderImage } from "../renderers/RenderImage/RenderImage";
import { useMemo } from "react";

type Entries = Awaited<ReturnType<typeof getFolderEntries<"posts">>>;

const PostsListItem: React.FC<Entries[number]> = ({ uri, entry }) => {
  const date = useMemo(() => entry.date && new Date(entry.date).toLocaleTimeString(), [entry.date]);

  return (
    <li>
      <Link href={uri}>
        <RenderImage alt={entry.title} src={entry.thumbnail} width={40} height={40} />
        <h3>{entry.title}</h3>
        {entry.date && <time dateTime={entry.date}>{date}</time>}
        {entry.description && <p>{entry.description}</p>}
      </Link>
    </li>
  );
};

export const PostsList: React.FC<{ entries: Entries }> = ({ entries }) => {
  return (
    <div className="p-container pi-containerInline">
      <ul>
        {entries.map((entry) => (
          <PostsListItem {...entry} key={entry.path} />
        ))}
      </ul>
    </div>
  );
};
