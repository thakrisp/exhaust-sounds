module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        img: '120px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
