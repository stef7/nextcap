import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS",
};

export default async function AdminRootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="is-cms">
      <body>{children}</body>
    </html>
  );
}
