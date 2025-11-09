import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: "#F6F7FB",
        primary: {
          DEFAULT: "#4C6FFF",
        },
        muted: {
          DEFAULT: "#94A3B8",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05), 0 6px 16px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl: "14px",
      },
    },
  },
  plugins: [],
} satisfies Config;
