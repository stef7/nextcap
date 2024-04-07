import Image, { ImageProps } from "next/image";
import { readFileSync } from "fs";
import { join } from "path";
import { getPlaiceholder } from "plaiceholder";
import React from "react";
import { getAspectRatio } from "@/utils/aspect-ratio";

export const ServerImage: React.FC<ImageProps | undefined> = async (props) => {
  if (!props) return null;
  const { src } = props;
  return (
    <Image
      {...props}
      alt={props.alt}
      {...(typeof src === "string"
        ? await getPlaiceholder(readFileSync(join("./public", src))).then(({ base64, metadata }) => {
            const { width, height } = props.width && props.height ? props : metadata;
            return {
              placeholder: base64 as `data:image/${string}`,
              "data-base64": base64,
              width,
              height,
              style: getAspectRatio(props.style, width, height),
            };
          })
        : null)}
    />
  );
};
