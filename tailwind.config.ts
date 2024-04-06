import typographyPlugin from "@tailwindcss/typography";

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/{app,pages,components,cms}/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      spacing: {
        container: "var(--containerSpacing)",
        containerInline: "max(var(--containerSpacing), calc(50% - (var(--containerWidth) / 2)))",
      },
    },
  },
  corePlugins: {
    // preflight: false,
  },
  plugins: [
    typographyPlugin,

    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          pi: (value) => ({ paddingInline: value }),
          pbl: (value) => ({ paddingBlock: value }),
          pbs: (value) => ({ paddingBlockStart: value }),
          pbe: (value) => ({ paddingBlockEnd: value }),
        },
        { values: theme("padding") },
      );
      matchUtilities(
        {
          mi: (value) => ({ marginInline: value }),
          mbl: (value) => ({ marginBlock: value }),
          mbs: (value) => ({ marginBlockStart: value }),
          mbe: (value) => ({ marginBlockEnd: value }),
        },
        { values: theme("margin") },
      );
    }),
  ],
};
export default config;
