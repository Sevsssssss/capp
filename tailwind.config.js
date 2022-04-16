module.exports = {
  content: [
  './public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}',
  "./node_modules/flowbite/**/*.js"
],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  theme: {
    colors: {
      brand: {
        darkblue: '#0E3385',
        lightblue: '#6484C4',
        white: '#FFFFFF',
        yellow: '#F9DA25',
        red: '#C51930',
        blue: '#0085FF'
      },
      state: {
        100: '#FA582E',
        200: '#0053D9',
        300: '#6008CD',
        400: '#04AD48',
        500: 'FF49CC',

      },
      blue :{
        100: '#0085FF',
        200: '#006ed4'
      },
      black: {
        100: '#000000',
        200: '#1D1D1D',
        300: '#282828',
      },
      grey: {
        100: '#333333',
        200: '#4F4F4F',
        300: '#828282',
        400: '#BDBDBD',
        500: '#E0E0E0',
        600: '#F5F7FB',
        700: '#FCFCFC',
      },
    },
    fontFamily: {
      heading: ['Roboto', 'serif'],
      body: ['Arimo', 'sans-serif']
    },
    screens: {
      xxs: '320px',
      xs: '500px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
      xxxl: '1620px',
    },
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin'),
    // require('tailwindcss-animatecss')({
    //   classes: ['animate__animated', 'animate__fadeIn', 'animate__bounceIn', 'animate__lightSpeedOut'],
    //   settings: {
    //     animatedSpeed: 1000,
    //     heartBeatSpeed: 1000,
    //     hingeSpeed: 2000,
    //     bounceInSpeed: 750,
    //     bounceOutSpeed: 750,
    //     animationDelaySpeed: 1000
    //   },
    //   variants: ['responsive', 'hover', 'reduced-motion'],
    // }),
  ],
}
