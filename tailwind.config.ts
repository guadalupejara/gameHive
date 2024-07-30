/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in the app directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include all files in the components directory if used
    "./public/**/*.{html}", // Include HTML files if used
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
