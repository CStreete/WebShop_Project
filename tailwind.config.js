/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'mainFont': ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
