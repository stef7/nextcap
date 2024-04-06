"use client";

import { defaultLocale, LocaleType } from "@/utils/locale";
import { createContext, useContext, useMemo } from "react";

const LocaleContext = createContext(defaultLocale);

export const LocaleContextProvider: React.FC<
  React.PropsWithChildren<{
    [P in keyof LocaleType]: LocaleType[P] | undefined;
  }>
> = ({ children, language, timeZone }) => (
  <LocaleContext.Provider
    value={useMemo(
      () => ({
        language: language || defaultLocale.language,
        timeZone: timeZone || defaultLocale.timeZone,
      }),
      [language, timeZone],
    )}
  >
    {children}
  </LocaleContext.Provider>
);

export const useLocaleContext = () => useContext(LocaleContext);
