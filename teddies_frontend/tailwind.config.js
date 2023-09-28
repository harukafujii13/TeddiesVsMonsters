/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#CE8C3D',
          lightOrange: '#F8F8E4',
          navy: '#124069',
          redBrown: '#442022',
          modalBackground: '#9D9B9B',
        },
        secondary: {
          green: '#CBFFA9',
          pink: '#FF9B9B',
          gray: '#A8A196',
        },
        danger: '#DC3545',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mulish: ['var(--font-mulish)'],
        LDRKaet: ['var(--font-LDRKaet)'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
