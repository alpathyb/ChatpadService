/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.{pug, html}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      zIndex: {
        60: '60',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/line-clamp')],
};
