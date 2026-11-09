import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f7ff',
          100: '#e1efff',
          200: '#c6e2ff',
          300: '#94c6fb',
          400: '#5da5f0',
          500: '#247cda',
          600: '#1268c8',
          700: '#0b57af',
          800: '#0a4086',
          900: '#092e64',
          950: '#071e44',
        },
        ink: {
          50: '#f7faff',
          100: '#ebf3fc',
          200: '#dce7f3',
          300: '#bed0e4',
          400: '#9dafc4',
          500: '#72849b',
          600: '#586d87',
          700: '#415771',
          800: '#2c405b',
          900: '#102a49',
        },
        accent: '#247cda',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
