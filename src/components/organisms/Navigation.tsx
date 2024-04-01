import { useLayoutContext, LayoutContextType } from "@/contexts/layout-context";
import Link from "next/link";

const NavigationChild: React.FC<LayoutContextType["navTree"]["children"][number]> = ({ uri, title, children }) => {
  return (
    <li>
      <Link href={uri}>{title}</Link>
      {children.some((child) => !child.hidden) && (
        <ul>
          {children.map((child) => (
            <NavigationChild {...child} key={uri} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const Navigation: React.FC = () => {
  const layoutContext = useLayoutContext();
  console.debug({ layoutContext });
  return (
    <nav>
      <ul>
        {layoutContext.navTree.children.map(
          (child) => !child.hidden && <NavigationChild {...child} key={child.uuid || child.slug} />,
        )}
      </ul>
    </nav>
  );
};
