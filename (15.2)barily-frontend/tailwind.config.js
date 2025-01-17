/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          300:"#e0e7fe",
          500:"#3238a7",
          600:"#5046e4",
        }
        
      }
    },
  },
  plugins: [],
}

