import { createContext, useContext } from "react";
import type { PreviewTemplateComponentProps } from "decap-cms-core";

export const CmsPreviewContext = createContext<PreviewTemplateComponentProps | undefined>(undefined);

export const CmsPreviewContextProvider = CmsPreviewContext.Provider;

export const useCmsPreviewContext = () => useContext(CmsPreviewContext);
