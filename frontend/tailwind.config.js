/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          void: "#120f14",
          cream: "#ffe8d9",
          plum: "#4c2444",
          magenta: "#e746a0",
          orange: "#ff8857",
          peach: "#ffd3a5"
        }
      }
    }
  },
  plugins: []
};
