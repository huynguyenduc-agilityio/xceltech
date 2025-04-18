import type { Config } from 'tailwindcss';
import TailwindAnimate from 'tailwindcss-animate';

// Themes
import {
  fontFamily,
  colors,
  fontSize,
  borderRadius,
  screens,
} from './src/themes';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        black: { ...colors.black },
        gray: { ...colors.gray },
        blue: { ...colors.blue },
        red: { ...colors.red },
        green: { ...colors.green },
      },
      fontFamily,
      fontSize,
      borderRadius,
      screens,
    },
  },
  plugins: [TailwindAnimate],
};

export default config;
