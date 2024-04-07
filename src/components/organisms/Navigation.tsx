import type { NavTree } from "@/cms/api";
import Link from "next/link";

const NavigationChild: React.FC<NavTree["children"][number]> = ({ uri, title, children }) => {
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

export const Navigation: React.FC<{
  navTree: NavTree;
}> = ({ navTree }) => {
  return (
    <nav>
      <input hidden type="checkbox" />
      <ul>
        {navTree.children.map((child) => !child.hidden && <NavigationChild {...child} key={child.uuid || child.uri} />)}
      </ul>
    </nav>
  );
};
