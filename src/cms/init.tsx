"use client";

import React, { lazy, useEffect, useState } from "react";

import { cmsConfig } from "./config";
import { identifyPreviewStylesToRegister, registerPreviewTemplates } from "./preview";
import { registerWidgets } from "./widgets";
import { SlugTree } from "@/utils/slugs-to-tree";

const cmsInit = async () => {
  const { registerPreviewStyles } = identifyPreviewStylesToRegister();

  return import("decap-cms-app").then(({ default: cms }) => {
    cms.init({ config: cmsConfig });

    registerPreviewStyles(cms);

    registerPreviewTemplates(cms);

    registerWidgets(cms);
  });
};

export const CmsApp = lazy(() => cmsInit().then(() => ({ default: () => null })));

export const CmsLoader: React.FC<{ navTree: SlugTree }> = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <CmsApp /> : <h1 className="text-4xl p-4 text-center">Loading CMS...</h1>;
};
