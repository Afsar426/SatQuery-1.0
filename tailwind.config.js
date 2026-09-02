/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core SpaceTech Earth-Intelligence System
        graphite: '#171817', // Obsidian Graphite (Primary Background - Deep Neutral)
        charcoal: '#222321', // Charcoal (Secondary Surfaces / Nav)
        stone: {
          DEFAULT: '#2B2C28', // Main Surface (Cards, Tool Panels, Drawers)
          hover: '#333530',
          elevated: '#383A34',
        },
        ivory: {
          DEFAULT: '#F1EBDD', // Warm Ivory (Primary Headings & Text)
          muted: '#E5DEC8',
        },
        dust: {
          DEFAULT: '#AAA89E', // Dust Grey (Secondary Text & Metadata)
          muted: '#78766D',
          dark: '#55544E',
        },
        amber: {
          signal: '#D6A84F', // Signal Amber (Primary Accent - 5% ratio: Active / Signal / CTA)
          muted: 'rgba(214, 168, 79, 0.12)',
          border: 'rgba(214, 168, 79, 0.35)',
          hover: '#C49842',
        },
        sage: {
          earth: '#879477', // Earth Sage (Secondary Accent - 15% ratio: Earth / Vegetation / Ready)
          muted: 'rgba(135, 148, 119, 0.12)',
          border: 'rgba(135, 148, 119, 0.35)',
          hover: '#788568',
        },
        sand: {
          pale: '#D8C8A6', // Pale Sand (Subtle Highlights / Map Overlays)
          muted: 'rgba(216, 200, 166, 0.12)',
          border: 'rgba(216, 200, 166, 0.35)',
        },
        terracotta: {
          muted: '#B76552', // Muted Terracotta (Changes / Anomalies / Alerts)
          bg: 'rgba(183, 101, 82, 0.12)',
          border: 'rgba(183, 101, 82, 0.35)',
          hover: '#A55745',
        },

        // SpaceTech Semantic Aliases for Seamless Theme Cohesion
        space: {
          950: '#171817', // Maps to Obsidian Graphite
          900: '#222321', // Maps to Charcoal
          850: '#2B2C28', // Maps to Stone Surface
          800: '#333530', // Elevated Stone
          750: '#383A34', // Stone Hover
          border: '#383A34', // 1px Precision Hairline Border
          borderLight: '#474942',
        },
        text: {
          primary: '#F1EBDD', // Warm Ivory
          secondary: '#AAA89E', // Dust Grey
          muted: '#78766D',
        },
        aerospace: {
          gold: '#D6A84F', // Signal Amber
          copper: '#B76552', // Muted Terracotta
          sapphire: '#D6A84F', // Signal Amber
          emerald: '#879477', // Earth Sage
          radar: '#D8C8A6', // Pale Sand
        },
        isro: {
          saffron: '#D6A84F', // Signal Amber
          amber: '#D6A84F',
          muted: 'rgba(214, 168, 79, 0.12)',
        },
        cyan: {
          accent: '#D6A84F', // Signal Amber
          hover: '#C49842',
          muted: 'rgba(214, 168, 79, 0.12)',
        },
        teal: {
          geo: '#879477', // Earth Sage
        },
        radar: {
          sar: '#D8C8A6', // Pale Sand
        },
        status: {
          success: '#879477', // Earth Sage
          warning: '#D6A84F', // Signal Amber
          error: '#B76552', // Muted Terracotta
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Sans"', 'monospace'],
        tech: ['"IBM Plex Sans"', 'sans-serif'],
      },
      borderRadius: {
        panel: '6px', // Subtle, engineered radius (not giant bubbles)
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      boxShadow: {
        'panel': '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        'subtle': '0 1px 1px 0 rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
