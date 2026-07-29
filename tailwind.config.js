/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // New color theme: teal -> cyan (replaces the original purple/violet theme)
        brand: {
          50: "#effcf9",
          100: "#c9f6ec",
          200: "#94ecd9",
          300: "#5cdcc4",
          400: "#2ec3ab",
          500: "#149d8c",
          600: "#0f7d72",
          700: "#0f635c",
          800: "#114f4b",
          900: "#0d3a38",
        },
        accent: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
