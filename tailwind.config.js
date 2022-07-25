/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/*.tsx",
    "./src/lib/*.tsx",
    "./src/pages/*.tsx",
    "./src/*.tsx"
  ],
  theme: {
    screens: {
      'xs': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
     },
  },
  plugins: [],
}
