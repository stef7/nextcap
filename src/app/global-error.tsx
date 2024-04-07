"use client";

import "@/styles/global.css";

import { ErrorComponent } from "@/components/organisms/ErrorComponent";
import { getCmsVariablesRootStyle } from "@/styles/cms-variables";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError(props: Readonly<GlobalErrorProps>) {
  return (
    <html lang="en">
      <head>
        <style>{getCmsVariablesRootStyle()}</style>
      </head>
      <body>
        <ErrorComponent {...props} />
      </body>
    </html>
  );
}
