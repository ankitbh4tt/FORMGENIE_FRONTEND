// postcss.config.cjs
console.log('PostCSS config loaded with Tailwind');
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.js', // Explicitly point to Tailwind config
    },
    'autoprefixer': {},
  },
};