/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        'twitter-blue': '#1d9bf0',
        'twitter-green': '#00ba7c',
        'twitter-red': '#f91880',
        'twitter-yellow': '#ffd400',
        'twitter-gray': '#536471',
        'twitter-light-gray': '#71767b',
        'twitter-border': '#e7e9ea',
        'twitter-hover': 'rgba(0, 0, 0, 0.03)',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
