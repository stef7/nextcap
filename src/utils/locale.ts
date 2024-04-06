import settings from "@cms-content/settings.json";
import type { settings_lang_options as Lang, settings_timeZone_options as TZ } from "@/cms/types/generated-types";

export type LocaleType = {
  language: Lang;
  timeZone: TZ;
};

export const defaultLocale = {
  language: ("lang" in settings && (settings.lang as Lang)) || "en-AU",
  timeZone: ("timeZone" in settings && (settings.timeZone as TZ)) || "Australia/Melbourne",
} as const satisfies LocaleType;
