import { globSync } from "glob";

import { cmsCollections } from "./collections";
import type { GENERATED_COLLECTIONS, GENERATED_LOOKUP } from "./types/generated-types";
import { notFound } from "next/navigation";
import { slugsToTree } from "@/utils/slugs-to-tree";

export type GeneratedN = Extract<keyof GENERATED_LOOKUP, string>;
type FolderN = GENERATED_COLLECTIONS["folders"][number];
type NestedFolderN = GENERATED_COLLECTIONS["nested"][number];

/**
 * JSON may be incomplete despite fields being required, if they were added at a later date.
 * This allows us to deeply mark all properties as potentially undefined.
 */
export type DeepPartial<T> = T extends any[]
  ? DeepPartial<T[number]>[]
  : T extends object
    ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T;

export type EntryImport<N extends GeneratedN> = DeepPartial<GENERATED_LOOKUP[N]>;

export const getFolderConfig = <N extends FolderN>(name: N) => {
  for (const coll of cmsCollections) if ("folder" in coll && coll.name === name) return coll;
  throw new Error(`No match for "${name}"`);
};

const folderToPaths = (cwd: `cms-content/${string}`) => {
  return globSync("**/*.json", { cwd }) as `${string}.json`[];
};

export const getFolderPaths = <N extends FolderN>(name: N) => {
  const conf = getFolderConfig(name);
  return folderToPaths(conf.folder);
};

const pathToSlug = <Nested extends boolean>(path: `${string}.json`, nested: Nested) => {
  const slug = path
    .replace(/(?:\/?index)?\.json$/, "")
    .split("/")
    .filter(Boolean);
  return (nested ? slug : slug[0]) as Nested extends true ? string[] : string;
};
export const pathsToSlugs = <Nested extends boolean>(paths: `${string}.json`[], nested: Nested) =>
  paths.map((path) => pathToSlug(path, nested));

const slugToPath = <S extends string | string[] | undefined>(slug: S) => {
  // if CMS nested folder, slug is either string[] or undefined
  if (typeof slug === "object" && slug.length) return `${[...slug, "index"].join("/")}.json` as const;
  if (typeof slug === "undefined") return "index.json" as const;

  // if CMS flat folder, slug should always be a simple string
  return `${slug}.json` as const;
};

export const getFolderSlugs = <N extends FolderN>(name: N) => {
  const conf = getFolderConfig(name);
  const paths = folderToPaths(conf.folder);
  return pathsToSlugs(paths, ("nested" in conf) as N extends NestedFolderN ? true : false);
};

const rawPathToFolderEntry = <N extends FolderN>(folderPath: string, entryPath: string) => {
  /** May be required for webpack tree shaking: to include explicitly at start of import path below */
  const folder = folderPath.replace(/.*cms-content\/?/i, "");
  return import(`../../cms-content/${folder}/${entryPath}`) as Promise<EntryImport<N>>;
};

export const pathsToFolderEntries = <N extends FolderN>(name: N, paths: `${string}.json`[]) => {
  const { folder } = getFolderConfig(name);
  return Promise.all(paths.map((path) => rawPathToFolderEntry<N>(folder, path)));
};

const pathToFolderEntry = async <N extends FolderN>(name: N, path: `${string}.json`) => {
  const { folder } = getFolderConfig(name);
  return rawPathToFolderEntry<N>(folder, path);
};

export const getFolderEntry = async <
  N extends FolderN,
  S extends N extends NestedFolderN ? string[] | undefined : string,
>(
  name: N,
  slug: S,
) => {
  const path = slugToPath(slug);
  return pathToFolderEntry(name, path).catch(notFound);
};

export const getNavTree = async () => {
  const paths = getFolderPaths("pages");
  const slugs = pathsToSlugs(paths, true);
  const entries = await pathsToFolderEntries("pages", paths);
  return slugsToTree(slugs, entries);
};

export const pathToUri = (path: `${string}.json`, folder: (typeof cmsCollections)[number] & { name: FolderN }) => {
  const slug = pathToSlug(path, "nested" in folder);
  return `${folder.preview_path}`.replace(/(?<=\/)\{\{(?:dirname|slug)\}\}/, [slug].flat().join("/"));
};

export const getAnyFolderEntryByUuid = async (uuid: string) => {
  const folders = cmsCollections.flatMap((c) => ("folder" in c ? [c] : []));
  return Promise.any(
    folders.flatMap((folder) =>
      getFolderPaths(folder.name).map(async (path) => {
        return rawPathToFolderEntry<typeof folder.name>(folder.folder, path).then((entry) => {
          if (entry.uuid !== uuid) throw new Error(`${folder.folder}/${path} does not match UUID "${uuid}"`);
          const uri = pathToUri(path, folder);
          return { path, uri, entry };
        });
      }),
    ),
  ).catch(console.warn);
};

export const getPreviewData = async (collectionName: string) => {
  const conf = getFolderConfig(collectionName as FolderN);
  const paths = getFolderPaths(conf.name);
  const slugs = pathsToSlugs(paths, "nested" in conf);
  const entries = await pathsToFolderEntries(conf.name, paths);
  return { paths, slugs, entries };
};
