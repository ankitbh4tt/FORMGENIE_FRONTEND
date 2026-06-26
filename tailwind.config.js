/** @type {import('tailwindcss').Config} */
// Design tokens (colors, fonts, radii, shadows) are defined CSS-first in
// src/index.css via Tailwind v4 `@theme`. This file only declares content
// sources and dark-mode strategy.
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
