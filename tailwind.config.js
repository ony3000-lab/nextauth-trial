const { fontFamily } = require('tailwindcss/defaultTheme');
const {
  tjClassNames,
  tjTheme,
  tjPlugin,
} = require('tailwind-joy/tw-extension');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', { raw: tjClassNames }],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)', ...fontFamily.sans],
      },
      colors: tjTheme.colors,
      keyframes: tjTheme.keyframes,
      animation: tjTheme.animation,
    },
  },
  plugins: [tjPlugin],
};
