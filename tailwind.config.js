/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'manga': {
          'beige': '#F5F0E6',
          'dark': '#2B2B2B',
          'red': '#D97A7A',
          'yellow': '#F2D58D',
          'blue': '#A8D0DB',
          'green': '#A8D8B9',
          'purple': '#C9A0DC',
          'border': '#1C1C1C',
          'text': '#333333'
        }
      },
      fontFamily: {
        'manga': ['M PLUS Rounded 1c', 'sans-serif'],
        'comic': ['Wild Words', 'cursive'],
        'zen': ['Zen Kaku Gothic New', 'sans-serif']
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sketch': 'sketch 2s ease-out forwards',
        'panel-reveal': 'panelReveal 1.5s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        sketch: {
          '0%': { 
            strokeDasharray: '0 1000',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': { 
            strokeDasharray: '1000 0',
            opacity: '1'
          }
        },
        panelReveal: {
          '0%': {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
            opacity: '0'
          },
          '100%': {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: '1'
          }
        }
      }
    },
  },
  plugins: [],
};