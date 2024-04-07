import { CSSProperties } from "react";

export const getAspectRatio = (
  style: CSSProperties | undefined,
  width: `${number}` | number | undefined,
  height: `${number}` | number | undefined,
) =>
  style?.aspectRatio || !width || !height
    ? style
    : {
        aspectRatio: `${width} / ${height}`,
        ...style,
      };
