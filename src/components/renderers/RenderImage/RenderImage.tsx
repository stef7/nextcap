"use client";

import { useCmsPreviewContext } from "@/contexts/CmsPreviewContext";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

type RenderImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string | undefined;
  alt: string | undefined;
};

export const RenderImage: React.FC<RenderImageProps> = (props) => {
  const preview = useCmsPreviewContext();

  const [src, setSrc] = useState(props.src);
  useEffect(() => {
    if (!preview || !props.src) return;
    setSrc(preview.getAsset(props.src).url);
  }, [preview, props.src]);

  const { width, height, fill, alt } = props;

  const style = { aspectRatio: width && height && (`${width} / ${height}` as const), ...props.style };

  const combinedProps = { ...props, style };

  if (!src || preview || ((!width || !height) && !fill)) {
    const { priority, ...imgProps } = combinedProps;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...imgProps} src={src} alt={alt} />;
  }

  return <Image {...combinedProps} src={src} alt={alt ?? ""} />;
};
