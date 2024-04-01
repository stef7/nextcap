"use client";

import { createContext, useContext } from "react";
import type { PreviewTemplateComponentProps } from "decap-cms-core";

export type CmsPreviewContextType = PreviewTemplateComponentProps | undefined;

const CmsPreviewContext = createContext<CmsPreviewContextType>(undefined);

export const CmsPreviewContextProvider: React.FC<React.PropsWithChildren<{ value: CmsPreviewContextType }>> = ({
  value,
  children,
}) => <CmsPreviewContext.Provider value={value}>{children}</CmsPreviewContext.Provider>;

export const useCmsPreviewContext = () => useContext(CmsPreviewContext);
