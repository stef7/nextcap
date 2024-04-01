import { EntryImport } from "@/cms/api";
import settingsJson from "@cms-content/settings.json";

export const getCmsVariablesRootStyle = (settings?: EntryImport<"settings">) => {
  const { styleVariables } = { ...settingsJson, ...settings };

  return `:root {
    ${Object.entries(styleVariables).map(([key, value]) => `--${key}: ${value};`).join(`
    `)}
  }` as const;
};
