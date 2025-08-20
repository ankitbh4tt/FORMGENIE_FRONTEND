/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
        title: ['Lato', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        neutral: {
          50: "#f7f7f7",
          200: "#e5e7eb",
          800: "#1f2937",
        },
        primary: {
          50: "#f3f1ff",
          100: "#ede9fe",
          200: "#d8d4fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        purple: {
          600: "#9333ea",
          700: "#7e22ce",
        },
      },
      fontSize: {
        xs: ["12px", { lineHeight: "19.2px" }],
      },
      borderRadius: {
        none: "0px",
      },
      spacing: {
        0: "0px",
      },
    },
  },
  plugins: [],
};