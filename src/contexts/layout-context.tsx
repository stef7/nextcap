import { SlugTree } from "@/utils/slugs-to-tree";
import { createContext, useContext } from "react";

export type LayoutContextType = {
  navTree: SlugTree;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutContextProvider: React.FC<React.PropsWithChildren<{ value: LayoutContextType }>> = ({
  value,
  children,
}) => {
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("Must be used inside LayoutContext");
  return context;
};
