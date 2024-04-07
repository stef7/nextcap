import type { EntryWithMeta } from "@/cms/api";
import { RenderMarkdown } from "../renderers/RenderMarkdown/RenderMarkdown";
import { LocaleContextProvider } from "@/contexts/LocaleContext";
import { DateTime } from "../atoms/DateTime";
import { getLangAttributes } from "@/utils/locale";
import { ImagePlaceholderContextProvider } from "@/contexts/ImagePlaceholderContext";

export const PostTemplate: React.FC<EntryWithMeta<"posts">> = ({ entry, images }) => {
  return (
    <ImagePlaceholderContextProvider value={images}>
      <LocaleContextProvider language={entry.lang} timeZone={entry.timeZone}>
        <div className="p-container pi-containerInline proseLite" {...getLangAttributes(entry.lang)}>
          <h1>{entry.title}</h1>

          {entry.date && (
            <p>
              <DateTime dateTime={entry.date} />
            </p>
          )}

          <RenderMarkdown markdown={entry.markdown} />
        </div>
      </LocaleContextProvider>
    </ImagePlaceholderContextProvider>
  );
};
