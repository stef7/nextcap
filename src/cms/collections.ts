import type { CmsCollection, CmsField } from "decap-cms-core";
import { pageBuilderModulesField } from "./modules";

export const cmsCollections = [
  {
    name: "pages",
    label: "Pages",
    label_singular: "Page",
    folder: "cms-content/pages",
    extension: "json",
    create: true,
    delete: true,
    nested: { depth: 10 },
    summary: `/{{dirname}} — {{title}}`,
    preview_path: "/{{dirname}}",
    meta: { path: { widget: "string", label: "Path", index_file: "index" } },
    sortable_fields: ["title", "date", "author", "description", "path"],
    fields: [
      { name: "title", label: "Title", widget: "string" },
      { name: "thumbnail", label: "Featured Image", widget: "image", required: false },
      { name: "description", label: "Featured Description", widget: "string", required: false },
      { name: "hiddenInNav", label: "Hidden in Navigation?", widget: "boolean", required: false },
      pageBuilderModulesField,
      {
        name: "relatedPosts",
        label: "Related Posts",
        multiple: true,
        widget: "relation",
        collection: "posts",
        display_fields: ["title"],
        value_field: "uuid",
        search_fields: ["title", "uuid", "description"],
        required: false,
      },
      { name: "uuid", widget: "uuid" } as any,
    ],
  },
  {
    name: "posts",
    label: "Posts",
    label_singular: "Post",
    folder: "cms-content/posts",
    extension: "json",
    create: true,
    delete: true,
    preview_path: "/posts/{{slug}}",
    fields: [
      { name: "title", label: "Title", widget: "string" },
      { name: "date", label: "Date", widget: "datetime" },
      { name: "thumbnail", label: "Featured Image", widget: "image", required: false },
      { name: "description", label: "Featured Description", widget: "string", required: false },
      pageBuilderModulesField,
      {
        name: "relatedPosts",
        label: "Related Posts",
        multiple: true,
        widget: "relation",
        collection: "posts",
        display_fields: ["title"],
        value_field: "uuid",
        search_fields: ["title", "uuid", "description"],
        required: false,
      },
      { name: "uuid", widget: "uuid" } as CmsField,
    ],
  },
  {
    name: "settingsGlobals",
    label: "Settings & Globals",
    files: [
      {
        name: "footer",
        label: "Footer",
        file: "cms-content/footer.json",
        fields: [
          {
            name: "socials",
            label: "Socials",
            widget: "object",
            fields: [
              { name: "facebook", label: "Facebook", widget: "string" },
              { name: "linkedin", label: "LinkedIn", widget: "string" },
              { name: "instagram", label: "Instagram", widget: "string", required: false },
              { name: "xTwitter", label: "X (formerly Twitter)", widget: "string", required: false },
            ],
          },
        ],
      },
      {
        name: "settings",
        label: "Settings",
        file: "cms-content/settings.json",
        fields: [
          { name: "title", label: "Site Title", widget: "string" },
          { name: "logo", label: "Logo", widget: "image", required: false },
          { name: "favicon", label: "Favicon", widget: "file" },
          { name: "colorBg", label: "Background Color", widget: "color", allowInput: true },
          { name: "colorFg", label: "Foreground Color", widget: "color", allowInput: true },
        ],
      },
      {
        name: "redirectsRewrites",
        label: "Redirects & Rewrites",
        file: "cms-content/redirects-rewrites.json",
        fields: [
          {
            name: "redirects",
            widget: "list",
            label_singular: "Redirect",
            fields: [
              { name: "source", widget: "string", pattern: ["", ""] },
              { name: "destination", widget: "string" },
            ],
          },
        ],
      },
    ],
  },
] as const satisfies CmsCollection[];
