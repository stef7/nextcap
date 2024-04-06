import Link from "next/link";
import { RenderImage } from "../renderers/RenderImage/RenderImage";
import { Navigation } from "../organisms/Navigation";
import { useLayoutContext } from "@/contexts/LayoutContext";

export const Header: React.FC = () => {
  const { settings } = useLayoutContext();

  return (
    <header className="p-container pi-containerInline flex gap-container">
      <Link href="/">
        {settings.logo ? (
          <RenderImage
            src={settings.logo}
            alt={settings.title ?? "Logo"}
            title={settings.title}
            height={160}
            priority
          />
        ) : (
          <div>{settings.title}</div>
        )}
      </Link>
      <Navigation />
    </header>
  );
};
