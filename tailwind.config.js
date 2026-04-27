module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'streak-0': '#ebedf0',
        'streak-1': '#9be9a8',
        'streak-2': '#40c463',
        'streak-3': '#30a14e',
        'streak-4': '#216e39',
      },
    },
  },
};
