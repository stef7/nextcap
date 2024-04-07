"use client";

import React, { lazy, useEffect, useState } from "react";
import { registerPreviewStyles, registerPreviewTemplates } from "./preview";
import { registerWidgets } from "./widgets";

import type { DefaultLayoutProps } from "@/components/templates/DefaultLayout";

export type CmsLoaderProps = DefaultLayoutProps;

const cmsInit = async () => {
  const [{ default: CMS }, { cmsConfig }] = await Promise.all([import("decap-cms-app"), import("./config")]);

  CMS.init({ config: cmsConfig });

  const CmsComponent: React.FC<CmsLoaderProps> = (cmsLoaderProps) => {
    registerWidgets(CMS);

    registerPreviewTemplates(CMS, cmsLoaderProps);

    registerPreviewStyles(CMS);

    return null;
  };

  return { default: CmsComponent };
};

const CmsLazy = lazy(cmsInit);

export const CmsLoader: React.FC<CmsLoaderProps> = (cmsLoaderProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted ? (
        <CmsLazy {...cmsLoaderProps} />
      ) : (
        <h1 className="text-3xl p-4 text-center flex flex-col justify-center min-h-[100dvh]">Loading CMS...</h1>
      )}
      <div id="nc-root" />
    </>
  );
};
