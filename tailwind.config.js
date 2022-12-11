/** @type {import('tailwindcss').Config} */
module.exports = {
  // presets: [],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./core/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: false,
  darkMode: 'class',
  theme: {
    extend: {
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      spacing: {
        4: '1rem',
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
        "fw": "1440px",
      },
      fontSize: {
        'xxs': '.6rem',
        'smaller': '.95rem'
      },
      fontFamily: {
        'light': ['Eina Light'],
        'semibold': ['Eina SemiBold'],

        // 'light': ['Eina Light', ...fontFamily.sans],
        // 'semibold': ['Eina SemiBold', ...fontFamily.sans],
        // 'bold': ['Eina Bold', ...fontFamily.sans],
      },
      width: {
        '28': '7rem',
        'c_large': '1200px',
        "38": "10rem",
        "48": "12rem",
        "52": "13rem",
        "56": "14rem",
        "60": "15rem",
        "64": "16rem",
        "68": "17rem",
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
        'flex-half': "calc((100%/2) - 15px)",
        'flex-fourth': "calc((100% / 4) - 20px)"
      },
      inset: {
        'flexiblemargin': "calc((100vw - 1420px) / 2)",
        '100': '100px',
        '200': '200px',
        '250': '250px',
        '300': '300px',
        '400': '400px',
        '20': '20px',
        '22': '22px',
        '24': '24px',
        '26': '26px',
        '28': '28px',
        '30': '30px',
        '35': '35px',
        '40': '40px',
        '45': '45px',
        '46': '46px',
        '47': '47px',
        '48': '48px',
        '49': '49px',
        '50': '50px',
        '51': '51px',
        '52': '52px',
        '53': '53px',
        '54': '54px',
        '55': '55px',
        '60': '60px'
      },
      height: {
        'hero': '500px',
        "48": "12rem",
        "52": "13rem",
        "56": "14rem",
        "60": "15rem",
        "64": "16rem",
        "68": "17rem",
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
      },
      padding: {
        ".5": ".125rem"
      },
      maxWidth: {
        "48": "12rem",
        "52": "13rem",
        "56": "14rem",
        "60": "15rem",
        "64": "16rem",
        "68": "17rem",
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
        "fw": "1440px",
        'c_large': '1200px'
      },
      maxHeight: {
        "36": "9rem",
        "40": "10rem",
        "44": "11rem",
        "48": "12rem",
        "52": "13rem",
        "56": "14rem",
        "60": "15rem",
        "64": "16rem",
        "68": "17rem",
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
        "112": "28rem",
        "120": "30rem",
        "124": "31rem",
        "128": "32rem",
        "132": "33rem",
        "136": "34rem",
        "140": "35rem",
        "144": "36rem",
        "fw": "1440px"
      },
      zIndex: {
        '-2': '-2',
        '-4': '-4',
        '-6': '-6',
        '-12': '-12',
      },
      backgroundColor: {
        // 'primary': '#89bdf9',
        'black': '#000000',
        // 'primary': '#1c1b1b',
        'light': '#f5f5f5',
        'light-200': '#f0f0f0',
        'light-300': '#e8e8e8',
        'black-905': '#1c1b1b',
      },
      colors: {
        // black: {
        //   'primary': '#1c1b1b',
        // },
        gray: {
          'primary': '#6a6a6a',
          'custom-50': '#f4f4f4',
          'custom-52': '#eaeaea',

          'custom-hover': '#eaeaea',


          'custom-51': '#e9ecef',
          'custom-52a': '#fafafa',
          'custom-53': '#f3f4f5',

          'custom-497': '#f3f4f6',
          'custom-498': '#f8f9fa',
          'custom-499': '#a6a6a6',
          'custom-500': '#939393',
          'custom-501': '#7e8a88',
          'custom-502': '#333333',
          'custom-503': '#5d5d5d',
          'custom-504': '#333333',
          'custom-505': '#939eaa',
          'custom-506': '#657380',
          'custom-506a': '#6c727f',
          'custom-507': '#888888',
          'custom-508': '#333333',
          'custom-898': '#26292a',
          'custom-899': '#16161a',
          'custom-900': '#1f2023',
          'custom-901': '#111111',
          'custom-902': '#151515',
          'custom-903': '#242424',
          'custom-904': '#2b2b2b',
          'custom-905': '#838383',
          'custom-906': '#686969',
          'custom-907': '#666666',
          100: '#f3f6f9',
          200: '#ebedf3',
          300: '#e4e6ef',
          400: '#5C607B',
        },

        primary: {
          'black': '#1c1b1b',
          'gray': '#6a6a6a',
          'red': '#e65a4c',
        },
      },
      lineHeight: {
        'large': '54px'
      },
      transitionProperty: {
        'height': 'height',
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '2000px',

      'ipad': '768px',
      'tablet': '768px',
      'tablet-x': '1024px',
      'laptop': '1280px',
      'desktop': '1536px',
      'monitor': '2000px',
    },
  },
  plugins: [],
}
