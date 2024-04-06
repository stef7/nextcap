import { EntryImport } from "@/cms/api";
import { settings_styleVariables } from "@/cms/types/generated-types";
import settingsJson from "@cms-content/settings.json";

const objectToCmsVariablesRootStyle = (styleVariables: settings_styleVariables) =>
  `:root {
  ${Object.entries(styleVariables).map(([key, value]) => `--${key}: ${value};`).join(`
  `)}
}` as const;

export const getCmsVariablesRootStyle = (settings?: EntryImport<"settings">) => {
  const styleVariables = { ...settingsJson?.styleVariables, ...settings?.styleVariables };

  return objectToCmsVariablesRootStyle(styleVariables);
};

export const useCmsVariablesRootStyle = (settings?: EntryImport<"settings">) => {
  const { styleVariables } = { ...settingsJson, ...settings };

  return `:root {
    ${Object.entries(styleVariables).map(([key, value]) => `--${key}: ${value};`).join(`
    `)}
  }` as const;
};
