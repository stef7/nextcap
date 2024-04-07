import { globSync } from "glob";

import { cmsCollections } from "./collections";
import type { GENERATED_COLLECTIONS, GENERATED_LOOKUP } from "./types/generated-types";
import { notFound } from "next/navigation";
import { buildTree } from "@/utils/build-tree";
import { validate as validateUuid } from "uuid";

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

type CollectionConfig = (typeof cmsCollections)[number];
type FolderConfig<C extends CollectionConfig = CollectionConfig> = Extract<C, { folder: unknown }>;
type FolderConfigWithName<N extends FolderN = FolderN, C extends CollectionConfig = CollectionConfig> = Extract<
  C,
  { folder: unknown; name: N }
>;

type FolderPath = FolderConfig["folder"];
type EntryPath = `${string}.json`;

const isConfigFolderWithName = <C extends CollectionConfig, N extends FolderN>(
  conf: C,
  name: N,
): conf is FolderConfigWithName<N, C> => "folder" in conf && conf.name === name;

const getFolderConfig = <N extends FolderN>(folderName: N) => {
  for (const conf of cmsCollections) if (isConfigFolderWithName(conf, folderName)) return conf;
  throw new Error(`No match for "${folderName}"`);
};

const findPathsInFolder = <FP extends FolderPath>(folderPath: FP) => {
  return globSync("**/*.json", { cwd: folderPath }) as EntryPath[];
};

export const getFolderPaths = <N extends FolderN>(folderName: N) => {
  const conf = getFolderConfig(folderName);
  return findPathsInFolder(conf.folder);
};

const pathToSlug = <EP extends EntryPath>(entryPath: EP) => {
  return entryPath
    .replace(/(?:\/?index)?\.json$/, "")
    .split("/")
    .filter(Boolean);
};

type SlugParam<N extends FolderN = FolderN> = N extends NestedFolderN ? string[] | undefined : string;

const slugToPath = <S extends SlugParam>(slugParam: S) => {
  // if CMS flat folder, slug should always be one string
  if (typeof slugParam === "string") return `${slugParam}.json` as const;

  // if CMS nested folder, slug is either string[] or undefined, and file is always index.json
  return `${[slugParam, "index"].flat().filter(Boolean).join("/")}.json` as const;
};

export const getFolderSlugs = <N extends FolderN>(name: N) => {
  const conf = getFolderConfig(name);
  const paths = findPathsInFolder(conf.folder);
  return paths.map((path) => pathToSlug(path));
};

const importEntry = async <N extends FolderN>(folderPath: FolderPath, entryPath: EntryPath) => {
  const path = `${folderPath}/${entryPath}` as const;
  /** May be required for webpack tree shaking: to include explicitly at start of import path below */
  const pathEnd = path.replace(/.*cms-content\//, "") as typeof path extends `${string}cms-content/${infer Rest}`
    ? Rest
    : typeof path;
  /** Import path is relative to this file. */
  return (await import(`../../cms-content/${pathEnd}`)).default as EntryImport<N>;
};

const pathsToFolderEntries = <N extends FolderN>(name: N, paths: EntryPath[]) => {
  const { folder } = getFolderConfig(name);
  return Promise.all(paths.map((path) => importEntry<N>(folder, path)));
};

const getFolderEntryByPath = async <N extends FolderN>(name: N, path: EntryPath) => {
  const { folder } = getFolderConfig(name);
  return importEntry<N>(folder, path);
};

export const getFolderEntry = async <N extends FolderN, S extends SlugParam<N>>(name: N, slug: S) => {
  const path = slugToPath(slug);
  return getFolderEntryByPath(name, path).catch(notFound);
};

export const getFolderEntries = <N extends FolderN>(name: N) => {
  const conf = getFolderConfig(name);
  const promises = getFolderPaths(conf.name).map(async (path) => {
    const entry = await importEntry<N>(conf.folder, path);
    return { ...getEntryMeta(conf, path), entry };
  });
  return Promise.all(promises);
};

export type EntriesWithMeta = Awaited<ReturnType<typeof getFolderEntries>>;

export const getNavTree = async <N extends NestedFolderN>(name: N) => {
  const entries = await getFolderEntries<N>(name);
  return buildTree(entries, (node) => ({
    title: node.entry.title,
    uri: node.uri,
    hidden: node.entry.hiddenInNav,
    uuid: node.entry.uuid,
  }));
};

export type NavTree = Awaited<ReturnType<typeof getNavTree>>;

const getFolderConfigs = (): FolderConfig[] => cmsCollections.flatMap((c) => ("folder" in c ? [c] : []));

export const slugToPreviewUri = (slug: string[], previewPath: FolderConfig["preview_path"]) => {
  return previewPath.replace(
    /\{\{(?:dirname|slug)\}\}/,
    slug.join("/"),
  ) as typeof previewPath extends `${infer B}${"{{dirname}}" | "{{slug}}"}${infer A}`
    ? `${B}${ReturnType<string[]["join"]>}${A}`
    : typeof previewPath;
};

const getEntryMeta = <C extends FolderConfig>(folderConfig: C, path: EntryPath) => {
  const slug = pathToSlug(path);
  return {
    path,
    folderPath: folderConfig.folder,
    slug,
    uri: slugToPreviewUri(slug, folderConfig.preview_path),
  };
};

export const getAnyFolderEntryByUuid = async (uuid: string) => {
  if (!validateUuid(uuid)) throw new Error("UUID invalid");

  return Promise.any(
    getFolderConfigs().flatMap((conf) => {
      if (!conf.fields.find((field) => field.name === "uuid")) return [];

      return getFolderPaths(conf.name).map(async (path) => {
        const entry = await importEntry<typeof conf.name>(conf.folder, path);
        if (entry.uuid !== uuid) {
          throw new Error(`${conf.folder}/${path} UUID '${entry.uuid}' does not match '${uuid}'`);
        }
        return { ...getEntryMeta(conf, path), entry };
      });
    }),
  ).catch((cause) => {
    throw new Error(`No match found for UUID '${uuid}'`, { cause });
  });
};

export const getPreviewData = async (collectionName: string) => {
  const conf = getFolderConfig(collectionName as FolderN);
  const paths = getFolderPaths(conf.name);
  const slugs = paths.map(pathToSlug);
  const entries = await pathsToFolderEntries(conf.name, paths);
  return { paths, slugs, entries };
};
