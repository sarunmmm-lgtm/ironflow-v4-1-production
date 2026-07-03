import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kanit", "system-ui", "sans-serif"],
      },
      colors: {
        iron: {
          bg: "#030503",
          surface: "#0B0E0A",
          card: "#11160F",
          text: "#F7FFF2",
          muted: "#9AA394",
          accent: "#A7FF1A",
          accent2: "#6FE000",
        },
      },
      borderRadius: {
        app: "28px",
        hero: "34px",
      },
      boxShadow: {
        card: "0 30px 90px rgba(0,0,0,.62)",
        glow: "0 18px 42px rgba(167,255,26,.20)",
      },
    },
  },
  plugins: [],
};

export default config;
