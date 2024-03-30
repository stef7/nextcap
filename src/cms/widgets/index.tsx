import type { CMS } from "decap-cms-core";

import { UuidWidget } from "./UuidWidget";

export const registerWidgets = (cms: CMS) => {
  cms.registerWidget("uuid", UuidWidget);
};
