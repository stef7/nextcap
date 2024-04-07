import MarkdownToJsx from "markdown-to-jsx";
import React from "react";
import { RenderMarkdownElement } from "./RenderMarkdownElement";

export const RenderMarkdown: React.FC<{ markdown: string | undefined }> = ({ markdown }) => {
  if (!markdown) return null;

  return (
    <div data-testid="RenderMarkdown" className="proseLite">
      <MarkdownToJsx
        options={{
          createElement(type, { key, ...props }, ...children) {
            return (
              <RenderMarkdownElement type={type} props={props} key={key}>
                {children}
              </RenderMarkdownElement>
            );
          },
        }}
      >
        {markdown}
      </MarkdownToJsx>
    </div>
  );
};
