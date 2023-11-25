import type { Config } from "tailwindcss";
import type { Config as DaisyConfig } from "daisyui";
import daisyui from "daisyui";

const config: Config & { daisyui: DaisyConfig } = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: false,
    darkTheme: "dark",
  },
  plugins: [daisyui],
};
export default config;
