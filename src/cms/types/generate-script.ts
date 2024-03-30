import { writeFileSync } from "fs";
import createNetlifyTypes from "netlify-ts";

import { cmsConfig } from "../config";

const types = createNetlifyTypes(cmsConfig as any);

// The types generated here are not collected and organised by collection type etc.
// So we need to generate a lookup and collection list here to enable that.
const files = cmsConfig.collections.flatMap((c) =>
  "files" in c ? [[c.name, c.files.map((f) => f.name)] as const] : [],
);
const folders = cmsConfig.collections.flatMap((c) => ("folder" in c ? [c.name] : []));
const nested = cmsConfig.collections.flatMap((c) => ("nested" in c ? [c.name] : []));
const allGenerated = [...folders, ...files.flatMap((f) => f[1])];
const addendum = `
export type GENERATED_COLLECTIONS = ${JSON.stringify({ files: Object.fromEntries(files), folders, nested }, null, 2)};
export type GENERATED_LOOKUP = {
  ${allGenerated.map((n) => `${n}:${n};`).join("\n  ")}
};
` as const;

writeFileSync("src/cms/types/generated-types.ts", types + addendum);
