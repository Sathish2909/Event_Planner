import type { Config } from 'tailwindcss';

/**
 * Design direction: a "backstage call sheet" — the paperwork that runs a
 * live event. Ink-dark running-order rail, warm paper canvas, amber spotlight
 * accent, hairline dividers instead of card-kit shadows.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C1B22',
        paper: '#F1F0EA',
        surface: '#FFFFFF',
        line: '#DFDCD3',
        slate: {
          DEFAULT: '#6B6A66',
          light: '#9A988F'
        },
        amber: {
          DEFAULT: '#E8A33D',
          dark: '#C6842A',
          soft: '#FBEBD2'
        },
        teal: {
          DEFAULT: '#2B6E63',
          soft: '#DCEAE7'
        },
        rose: {
          DEFAULT: '#B4483C',
          soft: '#F5DEDB'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '14px'
      },
      maxWidth: {
        content: '640px'
      }
    }
  },
  plugins: []
};

export default config;
