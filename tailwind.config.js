/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4C6EF1",
        primary10: "#4F6BED1A",
        primary35: "#A1B1FB59",
        pb: "#1A1A1A",
        background: "#F7F7F9",
        gray400: "#9CA3AF",
      },
    },
  },
  plugins: [],
};
