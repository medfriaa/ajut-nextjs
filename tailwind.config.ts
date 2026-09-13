import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12261E",
        forest: "#2F6B4F",
        forestDark: "#204A37",
        forestLight: "#E7F0EA",
        amber: "#E0973A",
        amberLight: "#FBEEDD",
        bg: "#FAF9F6",
        border: "#E7E4DC",
        muted: "#6B7167",
        danger: "#B4453C",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
