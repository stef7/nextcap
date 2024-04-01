type NodeBase = { slug: string[] };

type Tree<Node extends NodeBase> = Node & {
  children: Tree<Node>[];
};

type Root<Node extends NodeBase, Assign> = Node & {
  children: Tree<Node & Assign>[];
};

/** Inspired by https://stackoverflow.com/a/45075542 */
export const buildTree = <Entry extends NodeBase, R>(entries: Entry[], assign: (entry: Entry) => R) => {
  const root = { slug: [], children: [] } as Root<NodeBase, R>;

  type Node = (typeof root)["children"][number];

  const recurse = (target: Node | typeof root, entry: Entry, segmentIndex: number = 0) => {
    if (segmentIndex >= entry.slug.length) return;
    const segment = entry.slug[segmentIndex];
    let dir = target.children.find((child) => child.slug[segmentIndex] === segment);
    if (!dir) {
      dir = { ...assign(entry), slug: entry.slug, children: [] };
      target.children.push(dir);
    }
    recurse(dir, entry, segmentIndex + 1);
  };

  for (const entry of entries) recurse(root, entry);

  return root;
};
