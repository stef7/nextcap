"use client";

import { createContext } from "react";
import type { PreviewTemplateComponentProps } from "decap-cms-core";

export type CmsPreviewContextType = PreviewTemplateComponentProps | undefined;

export const CmsPreviewContext = createContext<CmsPreviewContextType>(undefined);

export const CmsPreviewContextProvider: React.FC<React.PropsWithChildren<{ value: CmsPreviewContextType }>> = ({
  value,
  children,
}) => <CmsPreviewContext.Provider value={value}>{children}</CmsPreviewContext.Provider>;
