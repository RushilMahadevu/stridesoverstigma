/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./index.html",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            DEFAULT: '#111827',     // Primary action color
            light: '#1f2937',       // Hover
            contrast: '#ffffff',
          },
        },
      },
    },
    plugins: [],
  }