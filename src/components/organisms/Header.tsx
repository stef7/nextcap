import Link from "next/link";
import { RenderImage } from "../renderers/RenderImage/RenderImage";
import { Navigation } from "../organisms/Navigation";
import { useLayoutContext } from "@/contexts/layout-context";

export const Header: React.FC = () => {
  const { settings } = useLayoutContext();

  return (
    <header>
      <Link href="/">
        {settings.logo ? (
          <RenderImage
            src={settings.logo}
            alt={settings.title ?? "Logo"}
            title={settings.title}
            width={400}
            height={300}
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
