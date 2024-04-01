"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Readonly<GlobalErrorProps>) {
  console.error(error);
  return (
    <html lang="en">
      <body>
        <h1>Sorry, something went wrong!</h1>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
