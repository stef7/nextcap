"use client";

import Link from "next/link";
import { RenderImage } from "../renderers/RenderImage/RenderImage";
import { Navigation } from "../organisms/Navigation";
import { useLayoutContext } from "@/contexts/LayoutContext";

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
          />
        ) : (
          <div>{settings.title}</div>
        )}
      </Link>
      <Navigation />
    </header>
  );
};
