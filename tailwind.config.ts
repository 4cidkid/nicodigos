import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        main: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#5fa4fb",
          "500": "#3a81f7",
          "600": "#1c5ceb",
          "700": "#1c4dd9",
          "800": "#1d3fb0",
          "900": "#1e3a8a",
          "950": "#172554",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Helvetica Neue", "Helvetica", "Arial"],
        "roboto-slab": [
          "var(--font-roboto-slab)",
          "Times New Roman",
          "Times",
          "Serif",
        ],
        montserrat: [
          "var(--font-montserrat)",
          "Arial",
          "Helvetica",
          "sans-serif",
        ],
      },
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    function ({
      addVariant,
    }: {
      addVariant: (name: string, selector: string) => void;
    }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
export default config;
