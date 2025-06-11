/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#F18721",
        secondary: "#FFD399",
        olther: "#6C5BA7",
        danger: "#B1124D",
        accent: "#10B981",
        background: "#F3F4F6",
        text: "#111827",
      },
    },
  },
  plugins: [],
};
