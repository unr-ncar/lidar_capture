/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        spin: 'spinner .75s infinite linear'
      },
      keyframes: {
        spinner: {
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}

