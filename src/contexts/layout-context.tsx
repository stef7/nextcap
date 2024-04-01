import type { EntryImport, NavTree } from "@/cms/api";
import { createContext, useContext } from "react";

export type LayoutContextType =
  | {
      navTree: NavTree;
      settings: EntryImport<"settings">;
      footer: EntryImport<"footer">;
    }
  | undefined;

const LayoutContext = createContext<LayoutContextType>(undefined);

export const LayoutContextProvider: React.FC<React.PropsWithChildren<{ value: LayoutContextType }>> = ({
  value,
  children,
}) => <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;

export const useLayoutContext = () => useContext(LayoutContext);
