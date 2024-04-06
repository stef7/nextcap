"use client";

import { useLocaleContext } from "@/contexts/LocaleContext";
import { useMemo } from "react";

export const DateTime: React.FC<{ dateTime: string | undefined }> = ({ dateTime }) => {
  const { language, timeZone } = useLocaleContext();
  const asDate = useMemo(() => (dateTime ? new Date(dateTime) : undefined), [dateTime]);
  const formatShown = useMemo(
    () => asDate?.toLocaleString(language, { timeZone, dateStyle: "medium", timeStyle: "short" }),
    [asDate, language, timeZone],
  );
  const formatTitle = useMemo(
    () => asDate?.toLocaleString(language, { timeZone, dateStyle: "full", timeStyle: "full" }),
    [asDate, language, timeZone],
  );
  return asDate ? (
    <time dateTime={dateTime} title={formatTitle}>
      {formatShown}
    </time>
  ) : null;
};
