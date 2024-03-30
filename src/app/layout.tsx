import type { Metadata } from "next";
import settings from "@cms-content/settings.json";

export const metadata: Metadata = {
  title: {
    template: `%s - ${settings.title}`,
    default: settings.title,
  },
};

export default async function RootLayout({ children }: React.PropsWithChildren) {
  return children;
}
