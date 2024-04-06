import MarkdownToJsx from "markdown-to-jsx";
import { RenderImage } from "../RenderImage/RenderImage";
import React from "react";

export const RenderMarkdown: React.FC<{
  markdown: string | undefined;
}> = ({ markdown }) => {
  if (!markdown) return null;

  return (
    <div data-testid="RenderMarkdown">
      <MarkdownToJsx
        options={{
          wrapper: React.Fragment,
          overrides: {
            img: (props) => <RenderImage {...props} />,
          },
        }}
      >
        {markdown}
      </MarkdownToJsx>
    </div>
  );
};
