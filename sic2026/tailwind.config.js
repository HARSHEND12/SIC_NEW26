/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#0A0A18',
        ink: '#F3F1FF',
        muted: '#9C9AC2',
        rule: '#2A2A4A',
        surface: '#13132E',
        signal: {
          DEFAULT: '#8B5CF6',
          dark: '#C4B5FD',
          tint: '#241C4A',
        },
        byte: {
          DEFAULT: '#22D3EE',
          tint: '#0E2E36',
        },
        warn: {
          DEFAULT: '#FB923C',
          tint: '#3A2412',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '68ch',
      },
      boxShadow: {
        'glow-violet': '0 0 50px -8px rgba(139, 92, 246, 0.55)',
        'glow-cyan': '0 0 50px -8px rgba(34, 211, 238, 0.5)',
        'glow-soft': '0 0 30px -10px rgba(139, 92, 246, 0.35)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(139,92,246,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.09) 1px, transparent 1px)',
        aurora: 'linear-gradient(115deg, #8B5CF6 0%, #6366F1 35%, #22D3EE 70%, #EC4899 100%)',
      },
    },
  },
  plugins: [],
}
