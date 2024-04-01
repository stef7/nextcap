import { useLayoutContext } from "@/contexts/layout-context";
import Link from "next/link";

export const Footer: React.FC = () => {
  const { footer } = useLayoutContext();

  return (
    <footer>
      {footer.columns?.map((col, i) => {
        return (
          <div key={JSON.stringify([col, i])}>
            {col.sections?.map((section, i) => {
              return (
                <section key={JSON.stringify([section, i])}>
                  {section.heading && <h2>{section.heading}</h2>}
                  <ul>
                    {section.items?.map((item, i) => {
                      const contents = item.text || item.link;

                      return (
                        <li key={JSON.stringify([item, i])}>
                          {item.link ? <Link href={item.link}>{contents}</Link> : contents}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        );
      })}
    </footer>
  );
};
