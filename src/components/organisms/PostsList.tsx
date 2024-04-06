import type { getFolderEntries } from "@/cms/api";
import Link from "next/link";
import { RenderImage } from "../renderers/RenderImage/RenderImage";
import { LocaleContextProvider } from "@/contexts/LocaleContext";
import { DateTime } from "../atoms/DateTime";
import { getLangAttributes } from "@/utils/locale";

type Entries = Awaited<ReturnType<typeof getFolderEntries<"posts">>>;

const PostsListItem: React.FC<Entries[number]> = ({ uri, entry }) => {
  return (
    <LocaleContextProvider language={entry.lang} timeZone={entry.timeZone}>
      <li className="contents">
        <Link href={uri} {...getLangAttributes(entry.lang)}>
          <RenderImage alt={entry.title} src={entry.thumbnail} width={40} height={40} />
          <h3>{entry.title}</h3>
          <DateTime dateTime={entry.date} />
          {entry.description && <p>{entry.description}</p>}
        </Link>
      </li>
    </LocaleContextProvider>
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
