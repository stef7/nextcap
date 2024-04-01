"use client";

import { getCmsVariablesRootStyle } from "@/styles/cms-variables";
import settings from "@cms-content/settings.json";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Readonly<GlobalErrorProps>) {
  return (
    <>
      <h1>Sorry, something went wrong</h1>
      <button onClick={reset}>Try again</button>
      <small>{error.digest}</small>
    </>
  );
}
