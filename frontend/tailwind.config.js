/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F18721',     
        'secondary': '#F59E0B', 
        'accent': '#10B981', 
        'background': '#F3F4F6', 
        'text': '#111827', 
      }
    },
  },
  plugins: [],
}