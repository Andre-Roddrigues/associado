import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "xs": "520px"
      },
    },
    extend: {
      colors: {
        // Base colors
        'blue-light': '#3b82f6',
        'blue-sky': '#0ea5e9',
        'blue-cyan': '#06b6d4',
        'blue-emerald': '#10b981',
        'blue-violet': '#6366f1',
        'blue-pink': '#ec4899',
        'blue-gray': '#64748b',

        // Neutrals
        'soft-white': '#f1f5f9',
        'soft-gray': '#cbd5e1',
        'midnight': '#1e293b',
        'navy': '#1e40af',
        'indigo': '#4f46e5',

        // Dark blue variations
        'dark-blue': '#030b72',
        'dark-blue-light': '#040e8a',
        'dark-blue-lighter': '#050aa1',
        'dark-blue-darker': '#02073a',
      },
      backgroundImage: {
        // Core dark blue gradients
        'gradient-darkblue': 'linear-gradient(to right, var(--tw-gradient-from, #030b72), var(--tw-gradient-to, #040e8a)',
        'gradient-darkblue-dark': 'linear-gradient(to right, #030b72, #050aa1)',
        
        // Directional variants
        'gradient-darkblue-t': 'linear-gradient(to top, #030b72, #040e8a)',
        'gradient-darkblue-tr': 'linear-gradient(to top right, #030b72, #040e8a)',
        'gradient-darkblue-r': 'linear-gradient(to right, #000000, #040e8a)',
        'gradient-darkblue-br': 'linear-gradient(to bottom right, #030b72, #040e8a)',
        'gradient-darkblue-b': 'linear-gradient(to bottom, #030b72, #040e8a)',
        'gradient-darkblue-bl': 'linear-gradient(to bottom left, #030b72, #040e8a)',
        'gradient-darkblue-l': 'linear-gradient(to left, #030b72, #040e8a)',
        'gradient-darkblue-tl': 'linear-gradient(to top left, #030b72, #040e8a)',
        'gradient-darkblue-radial': 'radial-gradient(circle, #030b72, #040e8a)',

        // Color combinations
        'gradient-darkblue-light': 'linear-gradient(to right, #030b72, #3b82f6)',
        'gradient-darkblue-sky': 'linear-gradient(to right, #030b72, #0ea5e9)',
        'gradient-darkblue-cyan': 'linear-gradient(to right, #030b72, #06b6d4)',
        'gradient-darkblue-emerald': 'linear-gradient(to right, #030b72, #10b981)',
        'gradient-darkblue-violet': 'linear-gradient(to right, #030b72, #6366f1)',
        'gradient-darkblue-indigo': 'linear-gradient(to right, #030b72, #4f46e5)',
        'gradient-darkblue-pink': 'linear-gradient(to right, #030b72, #ec4899)',
        'gradient-darkblue-gray': 'linear-gradient(to right, #030b72, #64748b)',
        
        // Neutral combinations
        'gradient-darkblue-white': 'linear-gradient(to right, #030b72, #ffffff)',
        'gradient-darkblue-soft': 'linear-gradient(to right, #030b72, #f1f5f9)',
        'gradient-darkblue-gray-soft': 'linear-gradient(to right, #030b72, #cbd5e1)',
        'gradient-darkblue-black': 'linear-gradient(to right, #030b72, #000000)',
        'gradient-darkblue-midnight': 'linear-gradient(to right, #030b72, #1e293b)',
        
        // Special gradients
        'gradient-darkblue-darker': 'linear-gradient(to right, #030b72, #02073a)',
        'gradient-darkblue-transparent': 'linear-gradient(to right, #030b72, transparent)',
        'gradient-darkblue-to-transparent': 'linear-gradient(to right, transparent, #030b72)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwind-clip-path'),
    function({ addUtilities }: any) {
      const newUtilities = {
        // Custom clip paths
        '.clip-path-hero': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
        },
        '.clip-path-footer': {
          'clip-path': 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config

export default config