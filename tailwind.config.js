/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        blob: 'blob 8s infinite'
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(24px, -36px) scale(1.08)' },
          '66%': { transform: 'translate(-18px, 18px) scale(0.96)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' }
        }
      }
    }
  },
  plugins: []
};
