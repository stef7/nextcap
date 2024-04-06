"use client";

import Link from "next/link";
import { Navigation } from "../organisms/Navigation";
import { useLayoutContext } from "@/contexts/LayoutContext";
import { RenderImage } from "../renderers/RenderImage/RenderImage";

export const Header: React.FC = () => {
  const { settings } = useLayoutContext();

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
            isServer={!settings}
          />
        ) : (
          <div>{settings.title}</div>
        )}
      </Link>
      <Navigation />
    </header>
  );
};
