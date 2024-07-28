/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#83C9F4',
      },
      fontSize: {
        '5xl': '50px',
      },

    },
  },
  plugins: [],
}

