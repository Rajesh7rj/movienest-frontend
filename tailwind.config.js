/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2BD17E',
        error: '#EB5757',
        background: '#093545',
        input: '#224957',
        card: '#092C39',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['64px', { lineHeight: '80px' }],
        'heading-2': ['48px', { lineHeight: '56px' }],
        'heading-3': ['32px', { lineHeight: '40px' }],
        'heading-4': ['24px', { lineHeight: '32px' }],
        'heading-5': ['20px', { lineHeight: '24px' }],
        'heading-6': ['16px', { lineHeight: '24px' }],
        'body-lg': ['20px', { lineHeight: '32px' }],
        'body-md': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '24px' }],
        'body-xs': ['12px', { lineHeight: '24px' }],
        caption: ['14px', { lineHeight: '16px' }],
      },
      fontWeight: {
        semibold: 600,
        bold: 700,
        regular: 400,
      },
      maxWidth: {
        container: '1440px',
      },
      spacing: {
        2: '2px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
        64: '64px',
        80: '80px',
        120: '120px',
        160: '160px',
      },
    },
    container: {
      center: true,
      padding: '24px',
    },
  },
  plugins: [],
}
