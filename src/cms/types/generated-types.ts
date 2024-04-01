/* eslint-disable */
/* tslint:disable */

export interface pages_MODULES_richContent {
  type: "richContent";
  markdown: string;
}

export interface pages {
  title: string;
  thumbnail?: string;
  description?: string;
  hiddenInNav?: boolean;
  MODULES: (pages_MODULES_richContent)[];
  relatedPosts?: any[];
  uuid: any;
}

export interface posts_MODULES_richContent {
  type: "richContent";
  markdown: string;
}

export interface posts {
  title: string;
  date: string;
  thumbnail?: string;
  description?: string;
  MODULES: (posts_MODULES_richContent)[];
  relatedPosts?: any[];
  uuid: any;
}

export interface footer_columns_sections_items {
  text: string;
  link?: string;
}

export interface footer_columns_sections {
  heading?: string;
  items: footer_columns_sections_items[];
}

export interface footer_columns {
  sections: footer_columns_sections[];
}

export interface footer {
  columns: footer_columns[];
}

export interface settings_styleVariables {
  colorBg: string;
  colorFg: string;
  colorLink: string;
  colorLinkVisited?: string;
}

export interface settings {
  title: string;
  logo?: string;
  favicon: string;
  styleVariables: settings_styleVariables;
}

export interface redirectsRewrites_redirects {
  source: string;
  destination: string;
}

export interface redirectsRewrites {
  redirects: redirectsRewrites_redirects[];
}

export type GENERATED_COLLECTIONS = {
  "files": {
    "settingsGlobals": [
      "footer",
      "settings",
      "redirectsRewrites"
    ]
  },
  "folders": [
    "pages",
    "posts"
  ],
  "nested": [
    "pages"
  ]
};
export type GENERATED_LOOKUP = {
  pages:pages;
  posts:posts;
  footer:footer;
  settings:settings;
  redirectsRewrites:redirectsRewrites;
};
