"use client";

import { CmsPreviewContext } from "@/contexts/CmsPreviewContext";
import { ImagePlaceholderContext } from "@/contexts/ImagePlaceholderContext";
import { getAspectRatio } from "@/utils/aspect-ratio";
import Image, { ImageProps } from "next/image";
import React, { use, useEffect, useState } from "react";

type AllowUndefined<Obj, Keys extends keyof Obj> = {
  [K in Keys]: Obj[K] | undefined;
};

export type RenderImageProps = Omit<ImageProps, "src" | "alt" | "width" | "height" | "children"> &
  AllowUndefined<ImageProps, "src" | "alt" | "width" | "height">;

export const RenderImage: React.FC<RenderImageProps> = (props) => {
  const preview = use(CmsPreviewContext);
  const placeholders = use(ImagePlaceholderContext);

  const [src, setSrc] = useState(props.src);
  useEffect(() => {
    if (!preview || !props.src) return;
    let src = props.src;
    if (typeof src !== "string") src = "default" in src ? src.default.src : src.src;
    setSrc(preview.getAsset(src).url);
  }, [preview, props.src]);

  const { alt = "" } = props;

  const placeholder = placeholders && typeof src === "string" && src in placeholders ? placeholders[src] : undefined;
  const { width, height } = props.width && props.height ? props : placeholder || props;

  const style = getAspectRatio(props.style, width, height);

  const commonProps = { style, width, height, placeholder: placeholder?.base64 };

  if (typeof src === "object" || (typeof src === "string" && ((width && height) || props.fill))) {
    return <Image {...props} src={src} alt={alt} {...commonProps} />;
  }

  const { priority, quality, fill, loader, ...imgProps } = props;
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...imgProps} src={src} alt={alt} {...commonProps} />;
};
