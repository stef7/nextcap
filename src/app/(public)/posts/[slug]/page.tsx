import { getFolderEntries, getFolderEntry, getFolderSlugs } from "@/cms/api";
import { PostsList } from "@/components/organisms/PostsList";
import { PostTemplate } from "@/components/templates/PostTemplate";
import type { GenerateStaticParams, InferGenerateMetadataFromGSP, InferPagePropsFromGSP } from "@/types/next-types";
import { notFound } from "next/navigation";

export const generateStaticParams = (() => {
  return getFolderSlugs("posts").map(([slug]) => ({ slug }));
}) satisfies GenerateStaticParams;

export const generateMetadata = (async ({ params }) => {
  const entry = await getFolderEntry("posts", params.slug);
  return {
    title: entry.title,
  };
}) satisfies InferGenerateMetadataFromGSP<typeof generateStaticParams>;

export default async function PostPage({ params }: InferPagePropsFromGSP<typeof generateStaticParams>) {
  const posts = await getFolderEntries("posts");
  const post = posts.find((post) => post.slug.join(`/`) === params.slug)?.entry;
  if (!post) return notFound();

  return (
    <>
      <PostTemplate {...post} />

      <PostsList entries={posts} />
    </>
  );
}
