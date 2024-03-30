import { useLayoutContext, LayoutContextType } from "@/contexts/layout-context";
import Link from "next/link";

const NavigationChild: React.FC<LayoutContextType["navTree"]["children"][number]> = ({ slug, label, children }) => {
  return (
    <li>
      <Link href={slug.join("/")}>{label}</Link>
      {!!children.length && (
        <ul>
          {children.map((child) => (
            <NavigationChild {...child} key={child.slug.join("/")} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const Navigation: React.FC = () => {
  const layoutContext = useLayoutContext();
  // console.debug({ layoutContext });

  return (
    <nav>
      <ul>
        {layoutContext.navTree.children.map((child) => (
          <NavigationChild {...child} key={child.slug.join("/")} />
        ))}
      </ul>
    </nav>
  );
};
