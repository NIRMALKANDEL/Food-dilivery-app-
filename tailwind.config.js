/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./App.js", "./components/**/*.{js,jsx}", "./Utils/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7C3AED",
          dark: "#5B21B6",
          light: "#EDE9FE",
        },
        accent: {
          DEFAULT: "#F59E0B",
          dark: "#B45309",
          light: "#FEF3E2",
        },
        ink: "#3D4152",
      },
    },
  },
  plugins: [],
};
