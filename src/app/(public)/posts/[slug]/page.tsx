import { getFolderEntry, getFolderSlugs } from "@/cms/api";

import { PostTemplate } from "@/components/templates/PostTemplate";
import { GenerateStaticParams, InferGenerateMetadataFromGSP, InferPagePropsFromGSP } from "@/types/next-types";

export const generateStaticParams = (() => {
  return getFolderSlugs("posts").map((slug) => ({ slug }));
}) satisfies GenerateStaticParams;

export const generateMetadata = (async ({ params }) => {
  const [entry] = await Promise.all([getFolderEntry("posts", params.slug)]);
  return {
    title: entry.title,
  };
}) satisfies InferGenerateMetadataFromGSP<typeof generateStaticParams>;

export default async function PostPage({ params }: InferPagePropsFromGSP<typeof generateStaticParams>) {
  const [entry] = await Promise.all([getFolderEntry("posts", params.slug)]);

  return <PostTemplate {...entry} />;
}
