/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // primary: "#F18721",
        primary: "#4BB8DE",

        // secondary: "#FFD399",
        secondary: "#ABDEEF",
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
