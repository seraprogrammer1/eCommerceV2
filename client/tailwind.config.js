/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-navy": "#1d203b",
        "light-grayish-blue": "#dadfef",
        "vibrant-sky-blue": "#3dbee4",
        black: "#000000",
        "mid-grayish-blue": "#566196",
      },
      spacing: {
        "500px": "500px",
        "100px": "100px",
        "150px": "150px",
        "170px": "170px",
      },
      screens: {
        "small-mobile": "400px",
        tablet: "850px",
        laptop: "1024px",
        desktop: "1280px",
        "max-2xl": { max: "1535px" },
        "max-xl": { max: "1279px" },
        "max-lg": { max: "1023px" },
        "max-md": { max: "767px" },
        "max-sm": { max: "639px" },
        "max-xs": { max: "479px" },
        "max-xxs": { max: "399px" },
      },
      gridTemplateColumns: {
        "1-full": "repeat(1, 100%)",
        "2-full": "repeat(2, 100%)",
        "3-full": "repeat(3, 100%)",
        "4-full": "repeat(4, 100%)",
        "5-full": "repeat(5, 100%)",
      },
      scrollSnapType: {
        "x-mandatory": "x mandatory",
      },
      scrollSnapAlign: {
        start: "start",
        middle: "center",
        end: "end",
      },
      animation: {
        grow: "grow 0.5s ease-in-out forwards",
        shrink: "shrink 0.5s ease-in-out forwards",
        slideLeft: "slideLeft 1s ease-in-out forwards",
        slideRight: "slideRight 1s ease-in-out forwards",
        slideRightReverse: "slideRightReverse 1s ease-in-out forwards",
        slideLeftReverse: "slideLeftReverse 1s ease-in-out forwards",
      },
    },
  },
  plugins: [
    "prettier-plugin-svelte",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
};
