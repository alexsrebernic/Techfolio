const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      screens: {
        sidebar: '1400px'
      },
      fontFamily: {
        sans: ['var(--aw-font-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-to-white' : `linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0%,
          rgba(64, 64, 64, 0) 70%,
          rgba(255, 255, 255, 0.5) 90%,
          rgb(255, 255, 255) 100%
        )`,
        'gradient-to-black' : `linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0%,
          rgba(26, 26, 26, 0) 70%,
          rgba(26, 26, 26, 0.5) 90%,
          rgb(26, 26, 26) 100%
        )`
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
