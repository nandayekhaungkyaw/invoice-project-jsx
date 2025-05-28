/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',           // or wherever your entry HTML is
    './src/**/*.{js,jsx,ts,tsx}',  // your React source files
  ],
  theme: {
    extend: {
      colors: {
        // Override default colors using hex or rgb instead of oklch
        primary: '#1DA1F2',
        secondary: '#FF7F50',
      },
    },
  },
  plugins: [],
}
