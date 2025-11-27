/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        // 💡 اصلاح: انیمیشن حرکت یک تکه خط (Moving Dash) برای مستطیل
        'running-dash': {
          '0%': { 'stroke-dashoffset': '376' }, // محیط مستطیل حدود 376 است
          '100%': { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        // 💡 کلاس جدید برای استفاده در Header.jsx
        'running-border': 'running-dash 6s linear infinite', 
      },
    },
  },
  plugins: [],
}