/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green_v_1: '#285430',
        green_v_2: '#5F8D4E',
        green_v_3: '#F4FFF3',
        white_v_1: '#FAFAFA',
      }
    },
  },
  plugins: [],
}

