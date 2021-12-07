module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        img: '170px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
