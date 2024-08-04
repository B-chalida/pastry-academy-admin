/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', "cursive"],
        dancing_script: ['"Dancing Script"', "cursive"],
        cormorant: ['"Cormorant", "serif"'],
        noto_sand_thai: ['"Noto Sans Thai"', "sans-serif"],
        dosis: ['"Dosis"', "sans-serif"],
        adamina: ['"Adamina"', "serif"],
        plus_jakarta_sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        "contentMain-mercury": "#eae9e9",
        "contentHighlight-silver": "#cbcaca",
        "textMain-mirage": "#1a2232",
        "textSecondary-riverbed": "#424a55",
      },
    },
  },
  plugins: [],
};
