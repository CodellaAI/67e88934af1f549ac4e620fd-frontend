
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        gold: {
          50: '#fefdf7',
          100: '#fdf8e3',
          200: '#faedb4',
          300: '#f8e185',
          400: '#f5d456',
          500: '#f3c728',
          600: '#e6b80b',
          700: '#bc950a',
          800: '#95770b',
          900: '#7a610d',
          950: '#473600',
        },
      },
      fontFamily: {
        sans: ['var(--font-assistant)', 'sans-serif'],
        serif: ['var(--font-david-libre)', 'serif'],
      },
      boxShadow: {
        'gold-sm': '0 1px 2px 0 rgba(243, 199, 40, 0.05)',
        'gold': '0 1px 3px 0 rgba(243, 199, 40, 0.1), 0 1px 2px 0 rgba(243, 199, 40, 0.06)',
        'gold-md': '0 4px 6px -1px rgba(243, 199, 40, 0.1), 0 2px 4px -1px rgba(243, 199, 40, 0.06)',
        'gold-lg': '0 10px 15px -3px rgba(243, 199, 40, 0.1), 0 4px 6px -2px rgba(243, 199, 40, 0.05)',
        'gold-xl': '0 20px 25px -5px rgba(243, 199, 40, 0.1), 0 10px 10px -5px rgba(243, 199, 40, 0.04)',
      },
    },
  },
  plugins: [],
}
