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
  const [entry, posts] = await Promise.all([
    getFolderEntry("pages", props.params.slug),
    props.params.slug?.[0] === "posts" ? getFolderEntries("posts") : undefined,
  ]);

  return (
    <PageTemplate
      {...entry}
      postsPageContent={posts && <PostsList entries={posts} isServer={true} />}
      isServer={true}
    />
  );
}
