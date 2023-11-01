/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreyBackground: '#424242',
        darkGreyBackground: '#303030',
      },

    },
  },
  plugins: [],
}

