"use client";

import { useCmsPreviewContext } from "@/contexts/CmsPreviewContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RenderImageProps } from "./RenderImage";

export const RenderImageOnClient: React.FC<RenderImageProps> = (props) => {
  const preview = useCmsPreviewContext();

  const [src, setSrc] = useState(props.src);
  useEffect(() => {
    if (!preview || !props.src) return;
    setSrc(preview.getAsset(props.src).url);
  }, [preview, props.src]);

  if (props.children) return props.children;

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
