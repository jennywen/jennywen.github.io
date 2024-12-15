/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/index.js"
  ],  
  theme: {
    extend: {
      fontFamily: {
        sans: ['neue-haas-grotesk-text', 'sans-serif'],
        serif: ['Swear Text', 'serif'],
      }, colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'dark': '#000',
        'medium': '#2B2B23',
        'light': '#A5A19A',
        'extra-light': '#F8F8F8'
      }, boxShadow: {
        'md': '6px 6px 0 0 rgba(0,0,0,0.1)'
      }
    },
  }
}
