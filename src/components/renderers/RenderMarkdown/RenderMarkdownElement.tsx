import { MarkdownToJSX } from "markdown-to-jsx";
import React from "react";
import { RenderImage } from "../RenderImage/RenderImage";

type Args = Parameters<NonNullable<MarkdownToJSX.Options["createElement"]>>;

type RenderMarkdownElementProps = {
  type: Args[0];
  props: Args[1];
  children: Args[2][];
};

export const RenderMarkdownElement: React.FC<RenderMarkdownElementProps> = ({ type: Tag, props, children }) => {
  if (Tag === "img") {
    return <RenderImage {...(props as any)} />;
  }
  return <Tag {...props}>{children}</Tag>;
};
