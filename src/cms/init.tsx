"use client";

import React, { lazy, useEffect, useState } from "react";

import { cmsConfig } from "./config";
import { registerPreviewStyles, registerPreviewTemplates } from "./preview";
import { registerWidgets } from "./widgets";
import type { LayoutContextType } from "@/contexts/LayoutContext";

export type CmsLoaderProps = Pick<LayoutContextType, "navTree">;

const cmsInit = async () => {
  const { default: CMS } = await import("decap-cms-app");

  CMS.init({ config: cmsConfig });

  const CmsComponent: React.FC<CmsLoaderProps> = ({ navTree }) => {
    registerWidgets(CMS);

    registerPreviewTemplates(CMS, { navTree });

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
