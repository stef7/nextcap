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
    <>
      <input hidden type="checkbox" id="_menu-toggle" />
      <label htmlFor="_menu-toggle" className="select-none cursor-pointer" tabIndex={0}>
        ⋯
      </label>
      <nav className="max-md:bg-[rgb(var(--colorBg)_/_var(--tw-bg-opacity))] max-md:bg-opacity-50 max-md:fixed max-md:inset-0 [input:checked+&]:opacity-1">
        <label htmlFor="_menu-toggle" className="select-none cursor-pointer" tabIndex={0}>
          ╳
        </label>
        <ul className="md:flex md:flex-wrap">
          {navTree.children.map(
            (child) => !child.hidden && <NavigationChild {...child} key={child.uuid || child.uri} />,
          )}
        </ul>
      </nav>
    </>
  );
};
