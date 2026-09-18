// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,jsx}'],
//   theme: {
//     extend: {
//       colors: {
//         paper: '#0B0D14',
//         ink: '#EDEEF2',
//         muted: '#8E93A6',
//         rule: '#22263A',
//         surface: '#12152260',
//         signal: {
//           DEFAULT: '#6366F1',
//           dark: '#A5B4FC',
//           tint: '#1B1E3D',
//         },
//         byte: {
//           DEFAULT: '#2DD4BF',
//           tint: '#0E2C2B',
//         },
//         warn: {
//           DEFAULT: '#F59E0B',
//           tint: '#332210',
//         },
//       },
//       fontFamily: {
//         display: ['"Instrument Serif"', 'Georgia', 'serif'],
//         sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
//         mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
//         hand: ['"Caveat"', 'cursive'],
//       },
//       maxWidth: {
//         content: '68ch',
//       },
//       boxShadow: {
//         'glow-violet': '0 0 50px -8px rgba(139, 92, 246, 0.55)',
//         'glow-cyan': '0 0 50px -8px rgba(34, 211, 238, 0.5)',
//         'glow-soft': '0 0 30px -10px rgba(139, 92, 246, 0.35)',
//       },
//       backgroundImage: {
//         'grid-pattern':
//           'linear-gradient(rgba(139,92,246,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.09) 1px, transparent 1px)',
//         aurora: 'linear-gradient(115deg, #8B5CF6 0%, #6366F1 35%, #22D3EE 70%, #EC4899 100%)',
//       },
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#0D0D0D',
        ink: '#F7F7F2',
        muted: '#9C9C94',
        rule: '#2B2B2B',
        surface: '#161616',
        signal: {              // now LIME — primary accent
          DEFAULT: '#CBFF3D',
          dark: '#A6E600',
          tint: '#1E2A08',
        },
        byte: {                // now PINK — secondary accent
          DEFAULT: '#FF3E9A',
          tint: '#2A0A1C',
        },
        warn: {                // now ELECTRIC AMBER
          DEFAULT: '#FFC300',
          tint: '#2A2005',
        },
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '68ch' },
      boxShadow: {
        brutal: '7px 7px 0 0 #F7F7F2',
        'brutal-lime': '7px 7px 0 0 #CBFF3D',
        'brutal-pink': '7px 7px 0 0 #FF3E9A',
        'brutal-sm': '4px 4px 0 0 #F7F7F2',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(203,255,61,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(203,255,61,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}