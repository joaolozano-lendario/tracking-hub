import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Academia Lendár[IA] Design System - Monocromático
        dark: {
          bg: '#000000',
          card: '#161616',
          border: '#323232',
          text: '#FFFFFF',
          muted: '#888888',
        },
        light: {
          bg: '#F8F8F8',
          card: '#FFFFFF',
          border: '#E8E8E8',
          text: '#000000',
          muted: '#646464',
        },
        accent: {
          DEFAULT: '#000000',
          hover: '#242424',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
