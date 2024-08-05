/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "375px",
        desktop: "1440px",
      },
      colors: {
        primary: {
          200: "hsl(148, 38%, 91%)",
          600: "hsl(169, 82%, 27%)",
          red: "hsl(0, 66%, 54%)",
        },
        neutral: {
          white: "hsl(0, 0%, 100%)",
          500: "hsl(186, 15%, 59%)",
          900: "hsl(187, 24%, 22%)",
        },
      },
      fontFamily: {
        karla: ["CustomKarla"],
      },
      fontSize: {
        label: "16px",
      },
    },
  },
  plugins: [],
};
