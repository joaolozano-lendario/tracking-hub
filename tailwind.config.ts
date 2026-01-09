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
        dark: {
          bg: '#0a0a0a',
          card: '#161616',
          border: '#262626',
          text: '#f5f5f5',
          muted: '#a3a3a3',
        },
        light: {
          bg: '#f8f8f8',
          card: '#ffffff',
          border: '#e5e5e5',
          text: '#171717',
          muted: '#737373',
        },
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        }
      },
    },
  },
  plugins: [],
}

export default config
