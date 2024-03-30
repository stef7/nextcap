import { EntryImport } from "@/cms/api";

export type SlugTree = {
  slug: string[];
  children: (SlugTree & { segment: string; label: string | undefined })[];
};

const buildTreeRecursive = <T extends SlugTree>({
  node,
  slug,
  entries,
  slugIndex,
  segmentIndex,
}: {
  node: T;
  slug: T["slug"];
  entries: EntryImport<"pages">[];
  slugIndex: number;
  segmentIndex: number;
}) => {
  if (segmentIndex >= slug.length) return;
  const segment = slug[segmentIndex];
  let dir = node.children.find((child) => child.segment == segment);
  if (!dir) node.children.push((dir = { segment, slug, children: [], label: entries[slugIndex].title }));
  buildTreeRecursive({ node: dir, slug, slugIndex, entries, segmentIndex: segmentIndex + 1 });
};

/** https://stackoverflow.com/a/45075542 */
export const slugsToTree = <S extends string[][]>(slugs: S, entries: EntryImport<"pages">[]): SlugTree => {
  const root: SlugTree = { slug: [], children: [] };
  slugs.forEach((slug, slugIndex) => buildTreeRecursive({ node: root, slug, slugIndex, entries, segmentIndex: 0 }));
  return root;
};
