import { EntryImport } from "@/cms/api";
import settingsJson from "@cms-content/settings.json";

export const getCmsVariablesRootStyle = (settings?: EntryImport<"settings">) => {
  const { colorBg, colorFg } = { ...settingsJson, ...settings };

  return `:root {
    --color-bg: ${colorBg};
    --color-fg: ${colorFg};
  }` as const;
};
