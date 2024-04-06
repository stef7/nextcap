import type { EntryImport } from "@/cms/api";
import { RenderMarkdown } from "../renderers/RenderMarkdown/RenderMarkdown";
import { LocaleContextProvider } from "@/contexts/LocaleContext";
import { DateTime } from "../atoms/DateTime";

export const PostTemplate: React.FC<EntryImport<"posts">> = (entry) => {
  return (
    <LocaleContextProvider language={entry.lang} timeZone={entry.timeZone}>
      <div className="p-container pi-containerInline" lang={entry.lang}>
        <h1>{entry.title}</h1>
        <DateTime dateTime={entry.date} />
        <RenderMarkdown markdown={entry.markdown} />
      </div>
    </LocaleContextProvider>
  );
};
