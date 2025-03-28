/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {

      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: [],
}