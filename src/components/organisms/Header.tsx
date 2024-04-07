import Link from "next/link";
import { RenderImage } from "../renderers/RenderImage/RenderImage";
import settingsJson from "@cms-content/settings.json";
import type { EntryImport } from "@/cms/api";
import React from "react";

export const Header: React.FC<{ navigation: React.ReactElement; settings?: EntryImport<"settings"> }> = ({
  navigation,
  settings = settingsJson,
}) => {
  return (
    <header className="p-container pi-containerInline flex gap-container flex-wrap justify-end">
      <Link href="/" className="me-auto">
        {settings.logo ? (
          <RenderImage
            src={settings.logo}
            alt={settings.title ?? "Logo"}
            title={settings.title}
            height={160}
            priority
            className="max-h-20"
          />
        ) : (
          <div>{settings.title}</div>
        )}
      </Link>
      {navigation}
    </header>
  );
};
