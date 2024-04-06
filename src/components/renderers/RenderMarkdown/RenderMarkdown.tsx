import MarkdownToJsx from "markdown-to-jsx";
import React from "react";
import { RenderMarkdownElement } from "./RenderMarkdownElement";

export const RenderMarkdown: React.FC<{
  markdown: string | undefined;
  isServer?: boolean;
}> = ({ markdown, isServer }) => {
  if (!markdown) return null;

  return (
    <div data-testid="RenderMarkdown">
      <MarkdownToJsx
        options={{
          createElement(type, { key, ...props }, ...children) {
            return (
              <RenderMarkdownElement type={type} props={props} key={key} isServer={isServer}>
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
