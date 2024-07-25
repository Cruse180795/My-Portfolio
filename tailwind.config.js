/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: [
    './src/**/*.{html,js}'
  ],
  theme: {
    extend: {
      fontFamily:{
        'poppins':['Poppins','Sans-serif'],
        'nunito':['Nunito', 'Sans-serif']
      },
      colors:{
        '80082-LightGray': '#6E7886',
        '80082-DarkGray': '#2C2F38',
        '80082-Pink': '#DA506E',
        '80082-Blue': '#67C4E3'
      },
      animation:{
        'fade-in': 'fadeIn 0.75s ease-in-out forwards'
      },
      keyframes:{
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ]
}

