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

export interface posts {
  title: string;
  date: string;
  thumbnail?: string;
  description?: string;
  markdown: string;
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

export type settings_lang_options = "aa" | "ab" | "ae" | "af" | "ak" | "am" | "an" | "ar" | "as" | "av" | "ay" | "az" | "ba" | "be" | "bg" | "bi" | "bm" | "bn" | "bo" | "br" | "bs" | "ca" | "ce" | "ch" | "co" | "cr" | "cs" | "cu" | "cv" | "cy" | "da" | "de" | "dv" | "dz" | "ee" | "el" | "en" | "en-AU" | "en-CA" | "en-GB" | "eo" | "es" | "es-419" | "es-ES" | "es-MX" | "et" | "eu" | "fa" | "ff" | "fi" | "fj" | "fo" | "fr" | "fr-CA" | "fy" | "ga" | "gd" | "gl" | "gn" | "gu" | "gv" | "ha" | "he" | "hi" | "ho" | "hr" | "ht" | "hu" | "hy" | "hz" | "ia" | "id" | "ie" | "ig" | "ii" | "ik" | "io" | "is" | "it" | "iu" | "ja" | "jv" | "ka" | "kg" | "ki" | "kj" | "kk" | "kl" | "km" | "kn" | "ko" | "kr" | "ks" | "ku" | "kv" | "kw" | "ky" | "la" | "lb" | "lg" | "li" | "ln" | "lo" | "lt" | "lu" | "lv" | "mg" | "mh" | "mi" | "mk" | "ml" | "mn" | "mr" | "ms" | "mt" | "my" | "na" | "nb" | "nd" | "ne" | "ng" | "nl" | "nn" | "no" | "nr" | "nv" | "ny" | "oc" | "oj" | "om" | "or" | "os" | "pa" | "pi" | "pl" | "ps" | "pt" | "pt-BR" | "qu" | "rm" | "rn" | "ro" | "ru" | "rw" | "sa" | "sc" | "sd" | "se" | "sg" | "si" | "sk" | "sl" | "sm" | "sn" | "so" | "sq" | "sr" | "ss" | "st" | "su" | "sv" | "sw" | "ta" | "te" | "tg" | "th" | "ti" | "tk" | "tl" | "tn" | "to" | "tr" | "ts" | "tt" | "tw" | "ty" | "ug" | "uk" | "ur" | "uz" | "ve" | "vi" | "vo" | "wa" | "wo" | "xh" | "yi" | "yo" | "za" | "zh" | "zh-Hans" | "zh-Hant" | "zu";

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
  lang: settings_lang_options;
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
