"use server";

import Image, { ImageProps } from "next/image";
import { readFileSync } from "fs";
import { join } from "path";
import { getPlaiceholder } from "plaiceholder";
import React from "react";

export const RenderImageOnServer: React.FC<ImageProps | undefined> = async (props) => {
  if (!props) return null;
  return (
    <Image
      {...props}
      {...(typeof props.src === "string"
        ? await getPlaiceholder(readFileSync(join("./public", props.src)), { size: 10 }).then(
            ({ base64, metadata: { width, height } }) => ({
              placeholder: "blur",
              blurDataURL: base64,
              width,
              height,
            }),
          )
        : {})}
      alt={props.alt}
    />
  );
};
