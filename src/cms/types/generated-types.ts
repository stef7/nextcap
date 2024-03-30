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

export interface footer_socials {
  facebook: string;
  linkedin: string;
  instagram?: string;
  xTwitter?: string;
}

export interface footer {
  socials: footer_socials;
}

export interface settings {
  title: string;
  logo?: string;
  favicon: string;
  colorBg: string;
  colorFg: string;
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
