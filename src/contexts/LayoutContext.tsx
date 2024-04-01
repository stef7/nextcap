import type { EntryImport, NavTree } from "@/cms/api";
import { createContext, useContext } from "react";

export type LayoutContextType = {
  navTree: NavTree;
  settings: EntryImport<"settings">;
  footer: EntryImport<"footer">;
};

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = () =>
  useContext(LayoutContext) ??
  (() => {
    throw new Error(`Must be used in ${LayoutContext.displayName}`);
  })();
