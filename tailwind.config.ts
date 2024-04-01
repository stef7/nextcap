import typographyPlugin from "@tailwindcss/typography";

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/{app,pages,components,cms}/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin],
};
export default config;
