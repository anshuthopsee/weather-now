/** @type {import('tailwindcss').Config} */

const colors  = require("tailwindcss/colors");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gradient-start-blue': '#4834D4',
        'custom-gradient-start-green': '#02cf61',
        'custom-gradient-start-purple': '#ad03fc',
        'custom-gradient-end': '#0C0C0C',
        primary: "#202225",
        secondary: "#5865f2",
        gray: {
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f3f5"
        }
      },
      fontFamily: {
        'pixelify': ["Pixelify Sans", "sans-serif"],
      },
      boxShadow: {
        'custom': '0 5px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      backgroundColor: {
        'white-opacity-20': 'rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
}