/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      peach: '#D9B177',
      blue:'#2F4F4F',
       custom:'#0D6EFD',
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(47, 79, 79, 0.5), 0 2px 4px -1px rgba(47, 79, 79, 0.25)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

