/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
      },
      colors: {
        "dark-grey": "#212227",
        "medium-grey": "#606060",
        "light-grey": "#EBEBEB",
        white: "#ffffff",
        black: "#000000",
        blue: "#4B8CC8",
      },
    },
  },
  plugins: [],
};
