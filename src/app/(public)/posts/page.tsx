import { getFolderPaths, pathsToFolderEntries, pathsToSlugs } from "@/cms/api";
import { GenerateMetadata } from "@/types/next-types";

export const generateMetadata = (async ({}) => {
  return {
    title: "Posts",
  };
}) satisfies GenerateMetadata;

export default async function PostsPage() {
  const paths = getFolderPaths("posts");
  const slugs = pathsToSlugs(paths, false);
  const entries = await pathsToFolderEntries("posts", paths);

  return (
    <>
      <pre>{JSON.stringify({ paths, slugs }, null, 2)}</pre>
      <ul>
        {entries.map((entry, index) => (
          <li key={entry.uuid || index}>{entry.title}</li>
        ))}
      </ul>
    </>
  );
}
