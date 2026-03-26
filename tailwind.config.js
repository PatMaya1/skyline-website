/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        navy: '#000d51',
        accent: '#2460fd',
        'accent-dark': '#0d4ae6',
        page: '#f3f3f3',
        light: '#f7f6f6',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Albert Sans', 'system-ui', 'sans-serif'],
        nav: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
