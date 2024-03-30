import { getNavTree } from "@/cms/api";
import { CmsLoader } from "@/cms/init";

export default async function AdminCmsPage() {
  const navTree = await getNavTree();

  return <CmsLoader navTree={navTree} />;
}
