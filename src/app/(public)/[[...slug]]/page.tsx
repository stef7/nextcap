import { getFolderEntry, getFolderSlugs } from "@/cms/api";
import { PageTemplate } from "@/components/templates/PageTemplate";
import type { GenerateStaticParams, InferGenerateMetadataFromGSP, InferPagePropsFromGSP } from "@/types/next-types";

export const generateStaticParams = (() => {
  return getFolderSlugs("pages").map((slug) => ({ slug }));
}) satisfies GenerateStaticParams;

export const generateMetadata = (async ({ params }) => {
  const [entry] = await Promise.all([getFolderEntry("pages", params.slug)]);
  return {
    title: entry.title,
  };
}) satisfies InferGenerateMetadataFromGSP<typeof generateStaticParams>;

export default async function SlugPage({ params }: InferPagePropsFromGSP<typeof generateStaticParams>) {
  const [entry] = await Promise.all([getFolderEntry("pages", params.slug)]);

  return <PageTemplate {...entry} />;
}
