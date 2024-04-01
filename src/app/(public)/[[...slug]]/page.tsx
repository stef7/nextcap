import { getFolderEntries, getFolderEntry, getFolderSlugs } from "@/cms/api";
import { PostsList } from "@/components/organisms/PostsList";
import { PageTemplate } from "@/components/templates/PageTemplate";
import type { GenerateMetadata, GenerateStaticParams, PageProps } from "@/types/next-types";

export type SlugPageProps = PageProps<{ slug?: string[] }>;

export const generateStaticParams = (() => {
  return getFolderSlugs("pages").map((slug: string[] | undefined) => ({ slug }));
}) satisfies GenerateStaticParams<never, SlugPageProps["params"]>;

export const generateMetadata = (async ({ params }) => {
  const entry = await getFolderEntry("pages", params.slug);
  return {
    title: entry.title,
  };
}) satisfies GenerateMetadata<SlugPageProps>;

export default async function SlugPage(props: SlugPageProps) {
  const entry = await getFolderEntry("pages", props.params.slug);

  let postsPageContent: React.ReactNode = null;
  if (props.params.slug?.[0] === "posts") {
    const posts = await getFolderEntries("posts");
    postsPageContent = <PostsList entries={posts} />;
  }

  return <PageTemplate {...props} {...entry} postsPageContent={postsPageContent} />;
}
