/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{hbs, html, js}"],
  theme: {
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1449px'
    // },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
