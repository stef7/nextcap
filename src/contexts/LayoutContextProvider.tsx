"use client";

import { LayoutContext, type LayoutContextType } from "./LayoutContext";

export const LayoutContextProvider: React.FC<React.PropsWithChildren<{ value: LayoutContextType }>> = ({
  value,
  children,
}) => <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
