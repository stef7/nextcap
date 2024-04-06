import settings from "@cms-content/settings.json";
import type { settings_lang_options as Lang, settings_timeZone_options as TZ } from "@/cms/types/generated-types";
import { getLangDir } from "rtl-detect";
// import { getLangDir } from "rtl-detect";

export type LocaleType = {
  language: Lang;
  timeZone: TZ;
};

export const defaultLocale = {
  language: ("lang" in settings && (settings.lang as Lang)) || "en-AU",
  timeZone: ("timeZone" in settings && (settings.timeZone as TZ)) || "Australia/Melbourne",
} as const satisfies LocaleType;

export const getLangDirection = <L extends Lang | undefined>(lang: L) => lang && getLangDir(lang);

export const getLangAttributes = <L extends Lang | undefined>(lang: L) =>
  lang && ({ lang, dir: getLangDir(lang) } as const);
