module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#a685e2',
        },
        severity: {
          success: '#86d35f',
          warning: '#edc25e',
          error: '#e23645',
        },
        gray: {
          50: '#faf9fa',
          100: '#e5e3e8',
          200: '#beb9c6',
          300: '#978fa3',
          400: '#70677e',
          500: '#4b4554',
          600: '#3e3946',
          700: '#322e38',
          800: '#25222a',
          900: '#19171c',
        },
      },
      fontFamily: {
        sans: [
          '"Source Sans Pro"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Roboto"',
          '"Oxygen"',
          '"Ubuntu"',
          '"Cantarell"',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
};
