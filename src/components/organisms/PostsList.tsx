import type { getFolderEntries } from "@/cms/api";
import Link from "next/link";
import { LocaleContextProvider } from "@/contexts/LocaleContext";
import { DateTime } from "../atoms/DateTime";
import { getLangAttributes } from "@/utils/locale";
import { RenderImage } from "../renderers/RenderImage/RenderImage";

type Entries = Awaited<ReturnType<typeof getFolderEntries<"posts">>>;

const PostsListItem: React.FC<Entries[number] & { isServer: boolean | undefined }> = ({ uri, entry, isServer }) => {
  return (
    <LocaleContextProvider language={entry.lang} timeZone={entry.timeZone}>
      <li className="-contents block" {...getLangAttributes(entry.lang)}>
        <Link href={uri} className="block">
          <RenderImage alt={entry.title} src={entry.thumbnail} isServer={isServer} />
          <h3>{entry.title}</h3>
          <DateTime dateTime={entry.date} />
          {entry.description && <p>{entry.description}</p>}
        </Link>
      </li>
    </LocaleContextProvider>
  );
};

export const PostsList: React.FC<{ entries: Entries; isServer: boolean | undefined }> = ({ entries, isServer }) => {
  return (
    <div className="p-container pi-containerInline">
      <ul>
        {entries.map((entry) => (
          <PostsListItem {...entry} key={entry.path} isServer={isServer} />
        ))}
      </ul>
    </div>
  );
};
