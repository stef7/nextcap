import { MarkdownToJSX } from "markdown-to-jsx";
import React from "react";
import { RenderImage } from "../RenderImage/RenderImage";

type Args = Parameters<NonNullable<MarkdownToJSX.Options["createElement"]>>;

type RenderMarkdownElementProps = {
  type: Args[0];
  props: Args[1];
  children: Args[2][];
  isServer?: boolean;
};

export const RenderMarkdownElement: React.FC<RenderMarkdownElementProps> = ({ type, props, children, isServer }) => {
  if (type === "img") {
    return <RenderImage {...(props as any)} isServer={isServer} />;
  }
  return React.createElement(type, props, ...children);
};
