/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0B2414',
        'bg-secondary': '#102E1B',
        'bg-glass': 'rgba(255, 255, 255, 0.04)',
        'border-gold': '#D4AF37',
        'border-gold-dim': 'rgba(212, 175, 55, 0.3)',
        'text-primary': '#F5F1E8',
        'text-secondary': '#A8B5A1',
        'accent-green': '#7AA281',
        'accent-yellow': '#FFD700',
        'danger': '#C44536',
        'bronze': '#CD7F32',
        'silver': '#C0C0C0',
      },
      fontFamily: {
        display: ['Bebas Neue', 'Oswald', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
        watermark: ['Anton', 'Playfair Display Black', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 24px rgba(212, 175, 55, 0.25)',
      },
      keyframes: {
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(212, 175, 55, 0.3)' },
          '50%': { borderColor: '#D4AF37' },
        }
      },
      animation: {
        'border-glow': 'border-glow 2s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
