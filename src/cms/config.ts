import type { CmsConfig } from "decap-cms-core";
import { cmsCollections } from "./collections";
import siteSettings from "@cms-content/settings.json";

const url = typeof window === "object" ? window.location.origin : undefined;

export const cmsConfig = {
  backend: {
    name: "github",
    repo: `${process.env.NEXT_PUBLIC_CMS_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_CMS_GIT_REPO_SLUG}`,
    branch: "main",
    ...({ use_graphql: true } as {}),
  },
  local_backend: true,
  load_config_file: false,

  media_folder: "public/cms-uploads",
  public_folder: "/cms-uploads",

  publish_mode: "editorial_workflow",

  logo_url: `${url}${siteSettings.logo}`,
  site_url: url,

  slug: {
    encoding: "ascii",
    clean_accents: true,
  },

  collections: cmsCollections,
} as const satisfies CmsConfig;
