import MarkdownToJsx from "markdown-to-jsx";
import { RenderImage } from "../RenderImage/RenderImage";
import { useCmsPreviewContext } from "@/contexts/cms-preview-context";
import React from "react";

export const RenderMarkdown: React.FC<{
  markdown: string | undefined;
}> = ({ markdown }) => {
  const preview = useCmsPreviewContext();

  if (!markdown) return null;

  return (
    <div data-testid="RenderMarkdown">
      <MarkdownToJsx
        options={{
          wrapper: React.Fragment,
          overrides: {
            ...(preview ? { img: RenderImage } : {}),
          },
        }}
      >
        {markdown}
      </MarkdownToJsx>
    </div>
  );
};
