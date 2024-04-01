import type { DeepPartial } from "./api";
import type { CmsField } from "decap-cms-core";
import type { GENERATED_LOOKUP } from "./types/generated-types";

type HasModules = Extract<GENERATED_LOOKUP[keyof GENERATED_LOOKUP], { MODULES?: any }>;
export type ModuleName = HasModules["MODULES"][number]["type"];
export type ModulesImport = DeepPartial<HasModules>["MODULES"];

type ModulesFieldConfig = Extract<CmsField, { widget: "list" }>;

const pageBuilderModules = [
  {
    name: "richContent",
    label: "Rich Content",
    widget: "object",
    fields: [{ name: "markdown", label: "Markdown", widget: "markdown", minimal: true }],
  },
] as const satisfies ModulesFieldConfig["types"];

export const pageBuilderModulesField = {
  name: "MODULES",
  label: "Modules",
  label_singular: "Module",
  widget: "list",
  types: pageBuilderModules,
} as const satisfies ModulesFieldConfig;
