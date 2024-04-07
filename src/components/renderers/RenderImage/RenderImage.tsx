import { ImageProps } from "next/image";
import { RenderImageOnClient } from "./RenderImageOnClient";
import { RenderImageOnServer } from "./RenderImageOnServer";
import React from "react";

type OptionalKeys = "width" | "height";
export type RenderImageProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> &
  Partial<Pick<ImageProps, OptionalKeys>> & {
    src: string | undefined;
    alt: string | undefined;
    width?: string | number;
    height?: string | number;
  };

export const RenderImage: React.FC<RenderImageProps> = (props) => {
  console.debug({ "React.useState": React.useState });

  const { src, alt } = props;

  if (!React.useState || !src) return <RenderImageOnClient {...props} />;

  return <RenderImageOnServer {...props} src={src} alt={alt ?? ""} />;
};
