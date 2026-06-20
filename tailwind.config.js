/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#02cbf9',
        teal: '#58e7e4',
        dark: {
          900: '#080c10',
          800: '#0d1117',
          700: '#111827',
          600: '#1a2332',
          500: '#1e293b',
          400: '#243044',
          300: '#334155',
          200: '#475569',
          100: '#64748b',
        },
      },
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
