// @ts-check
import { execSync } from "child_process";
import { readFileSync } from "fs";
import withPlaiceholder from "@plaiceholder/next";

/**
 * Importing via readFileSync due to warning:
 * "(node:24195) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time"
 * @type {import('./src/cms/api').EntryImport<'settings'>}
 */
const settings = JSON.parse(readFileSync("./cms-content/settings.json", "utf8"));

/**
 * Importing via readFileSync due to warning:
 * "(node:24195) ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time"
 * @type {import('./src/cms/api').EntryImport<'redirectsRewrites'>}
 */
const redirectsRewrites = JSON.parse(readFileSync("./cms-content/redirects-rewrites.json", "utf8"));

let gitOwnerSlug = [process.env.VERCEL_GIT_REPO_OWNER, process.env.VERCEL_GIT_REPO_SLUG];
if (!gitOwnerSlug.every(Boolean)) {
  const gitOrigin = execSync(`git config --get remote.origin.url`, { encoding: "utf8" });
  const match = gitOrigin.match(/(?:@|\/\/)[^/]+[:/]([^/]+)\/([^/]+).git/)?.slice(1);
  if (match?.length === 2) gitOwnerSlug = match;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CMS_GIT_REPO_OWNER: gitOwnerSlug[0],
    NEXT_PUBLIC_CMS_GIT_REPO_SLUG: gitOwnerSlug[1],
  },

  rewrites: async () => {
    return {
      beforeFiles: [
        ...(("rewrites" in redirectsRewrites &&
          Array.isArray(redirectsRewrites.rewrites) &&
          redirectsRewrites.rewrites) ||
          []),
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  redirects: async () => {
    return [
      ...(settings.favicon
        ? [
            {
              source: "/favicon.ico",
              destination: settings.favicon,
              permanent: false,
            },
          ]
        : []),

      ...(redirectsRewrites.redirects?.flatMap(({ source, destination }) => {
        if (!source?.startsWith("/") || !destination?.startsWith("/")) return [];
        return [{ source, destination, permanent: false }];
      }) ?? []),
    ];
  },
};

const nextConfigWith = [
  {
    fn: withPlaiceholder,
  },
].reduce((result, { fn }) => fn(result), nextConfig);

export default nextConfigWith;
