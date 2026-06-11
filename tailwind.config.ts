import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#000000",
        surface: {
          card: "#0a0a0c",
          elevated: "#101012",
          deep: "#06060a",
          light: "#f1f7fe",
        },
        ink: "#fcfdff",
        primary: {
          DEFAULT: "#fcfdff",
          on: "#000000",
        },
        body: "rgba(252,253,255,0.95)",
        charcoal: "rgba(252,253,255,0.85)",
        mute: "#d1d4d5",
        ash: "#a8aeaf",
        stone: "#666a6d",
        accent: {
          orange: {
            DEFAULT: "#ff801f",
            glow: "rgba(255,89,0,0.3)",
          },
          yellow: "#ffc53d",
          blue: {
            DEFAULT: "#3b9eff",
            glow: "rgba(0,117,255,0.4)",
          },
          green: {
            DEFAULT: "#11ff99",
            glow: "rgba(34,255,153,0.25)",
          },
          red: {
            DEFAULT: "#ff2047",
            glow: "rgba(255,32,71,0.4)",
          },
        },
        hairline: {
          DEFAULT: "rgba(255,255,255,0.12)",
          strong: "rgba(255,255,255,0.22)",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
        xs: "4px",
      },
      fontFamily: {
        display: ["Domaine Display", "serif"],
        sans: ["Inter", "sans-serif"],
        favorit: ["ABC Favorit", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
