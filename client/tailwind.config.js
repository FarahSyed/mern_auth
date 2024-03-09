/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': '#b91c1c',
        'secondary': '#334155',
        'link': '#3b82f6',
      },
    },
  },
  plugins: [],
}