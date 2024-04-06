import type { CmsCollection, CmsField } from "decap-cms-core";
import { pageBuilderModulesField } from "./modules";
import iso639 from "iso-639-1-plus";

/**
 * Requires some type-finessing because the built-in types don't support it
 * and we don't want to break any 'const' inference.
 */
const uuidField = { name: "uuid", widget: "uuid" } as { name: "uuid" } & CmsField;

const languageFieldOptions = iso639.getLanguages(iso639.getAllCodes().sort()).map((lang) => ({
  label: `${lang.nativeName} ${lang.nativeName === lang.name ? "" : `/ ${lang.name} `}[${lang.code}]`,
  value: lang.code,
}));

const timeZoneFieldOptions = Intl.supportedValuesOf("timeZone").map((tz) => ({
  label: `${tz} ${new Intl.DateTimeFormat(undefined, { timeZoneName: "longGeneric" })}`,
  value: tz,
}));

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
      uuidField,
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
      { name: "lang", label: "Language", widget: "select", options: languageFieldOptions, required: false },
      { name: "timeZone", label: "Time Zone", widget: "select", options: timeZoneFieldOptions, required: false },
      { name: "thumbnail", label: "Featured Image", widget: "image", required: false },
      { name: "description", label: "Featured Description", widget: "string", required: false },
      { name: "markdown", label: "Markdown", widget: "markdown", minimal: true },
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
      uuidField,
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
            name: "columns",
            label: "Columns",
            label_singular: "Column",
            widget: "list",
            fields: [
              {
                name: "sections",
                label: "Sections",
                label_singular: "Section",
                widget: "list",
                fields: [
                  {
                    name: "heading",
                    label: "Section Heading",
                    widget: "string",
                    required: false,
                  },
                  {
                    name: "items",
                    label: "Items",
                    widget: "list",
                    fields: [
                      { name: "text", label: "Text", widget: "string" },
                      { name: "link", label: "Link", widget: "string", required: false },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "settings",
        label: "Settings",
        file: "cms-content/settings.json",
        fields: [
          { name: "lang", label: "Language", widget: "select", options: languageFieldOptions },
          { name: "timeZone", label: "Time Zone", widget: "select", options: timeZoneFieldOptions },
          { name: "title", label: "Site Title", widget: "string" },
          { name: "logo", label: "Logo", widget: "image", required: false },
          { name: "favicon", label: "Favicon", widget: "file", required: false },
        ],
      },
      {
        name: "styling",
        label: "Styling",
        file: "cms-content/styling.json",
        fields: [
          { name: "colorBg", label: "Background Color", widget: "color", allowInput: true },
          { name: "colorFg", label: "Foreground Color", widget: "color", allowInput: true },
          { name: "colorLink", label: "Link Color", widget: "color", allowInput: true },
          {
            name: "colorLinkVisited",
            label: "Visited Link Color",
            widget: "color",
            allowInput: true,
            required: false,
          },
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
