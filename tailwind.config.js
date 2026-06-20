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
          900: '#1a202c',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
          400: '#9ca3af',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
        },
      },
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
