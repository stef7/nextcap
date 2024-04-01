import { execSync } from "child_process";
import { readFileSync } from "fs";

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

let gitOwnerSlug = [process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER, process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG];
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
      beforeFiles: [...(redirectsRewrites.rewrites || [])],
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

      ...(redirectsRewrites.redirects?.flatMap((redirect) => {
        if (!redirect.source?.startsWith("/") || !redirect.destination?.startsWith("/")) return [];
        return [
          {
            ...redirect,
            permanent: false,
          },
        ];
      }) ?? []),
    ];
  },
};

export default nextConfig;
