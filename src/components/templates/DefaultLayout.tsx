"use client";

import "@/styles/globals.css";

import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

type DefaultLayoutProps = React.PropsWithChildren;

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ul id="skip-links" className="sr-only focus-within:not-sr-only !fixed">
        <li>
          <a href="#main-content">Skip to main content</a>
        </li>
      </ul>

      <Header />

      <main id="main-content" className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};
