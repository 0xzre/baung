/** @type {import('tailwindcss').Config} */
const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/tw-elements/dist/js/**/*.js",
];
const theme = {
  container: {
    padding: {
      DEFAULT: "1rem",
      sm: "2rem",
      lg: "4rem",
      xl: "5rem",
      "2xl": "4rem",
    },
  },
  extend: {
    boxShadow: {
      "3xl": "-1px 34px 47px -29px rgb(32 32 32 / 100%)",
      "4xl": " 0vw 0vw 0.5vw 0vw rgb(32 32 32 / 20%)",
      "5xl": " 0vw 0.5vw 0.5vw 0vw rgb(32 32 32 / 16%)",
      glass: "1px 5px 12px 1px rgba( 31, 38, 135, 0.37 )",
      "glass-card": "4px 4px 4px 4px rgba( 32, 32, 32, 0.37 )",
      "card-shadow": "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      "dark-shadow": "10px 10px 5px 0px rgba(130,130,130,0.75)",
    },

    colors: {
      background: {
        DEFAULT: "#F6F7FA",
        200: "#272727",
        300: "#2E2E2E",
      },
      primary: {
        DEFAULT: "#03D069",
        50: "#A1EDC7",
        100: "#81E8B4",
        200: "#62E2A1",
        300: "#42DC8F",
        400: "#23D67C",
        500: "#03D069",
        600: "#03B65C",
        700: "#029C4F",
        800: "#028242",
        900: "#026835",
      },
    },
  },
};
const plugins = [];

export default {
  content,
  theme,
  plugins,
}