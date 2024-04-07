"use client";

import { createContext } from "react";
import { EntryImageMetas } from "@/cms/api";

export type ImagePlaceholderContextType = EntryImageMetas;

export const ImagePlaceholderContext = createContext<ImagePlaceholderContextType>({});

export const ImagePlaceholderContextProvider: React.FC<React.PropsWithChildren<{ value: ImagePlaceholderContextType }>> = ({
  value,
  children,
}) => <ImagePlaceholderContext.Provider value={value}>{children}</ImagePlaceholderContext.Provider>;
