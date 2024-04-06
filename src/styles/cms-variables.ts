import { EntryImport } from "@/cms/api";
import { entries } from "@/utils/typed-methods";
import stylingJson from "@cms-content/styling.json";
import { useMemo } from "react";

const customProperty = <K extends string, V extends string | undefined>([key, value]: [K, V]) =>
  `--${key}: ${value ?? ""};` as const;

const rootStyle = (styles: EntryImport<"styling">) =>
  `:root {
  ${entries(styles).map(customProperty).join(`
  `)}
}` as const;

export const getCmsVariablesRootStyle = (styles?: EntryImport<"styling">) => {
  const styleVariables = { ...stylingJson, ...styles };
  return rootStyle(styleVariables);
};

export const useCmsVariablesRootStyle = (styles?: EntryImport<"styling">) => {
  return useMemo(() => getCmsVariablesRootStyle(styles), [styles]);
};
