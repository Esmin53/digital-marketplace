/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f6fff8", 
        "secondary": "#D4ECDD", 
        "accent-teal": "#2ec4b6", 
        "accent-teal-200": "#cbf3f0", 
        "accent-teal-300": "#b2f7ef", 
        "border": "#e5e5e5", 
        "text": "#181823",
        "accent-gray": "#606470",
        "accent-lightgray": "#ced4da", 
        "button": "#216869" 
      },
      fontFamily: {
        smooch: ['Smooch Sans', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        playwrite: ['Playwrite VN', 'sans-serif'],
      },
    },
  },
  plugins: [],
}