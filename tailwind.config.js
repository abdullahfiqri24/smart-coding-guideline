/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5b0202',
          700: '#470101',
          50: '#fbf3f3',
          100: '#f4e1e1',
        },
        gold: {
          DEFAULT: '#daa520',
          soft: '#f6e7bd',
          50: '#fdf8eb',
        },
        ink: {
          DEFAULT: '#080808',
          2: '#2a2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
