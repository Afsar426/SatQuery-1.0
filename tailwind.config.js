/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sat: {
          bg: '#F5F5F1',
          ink: '#17212B',
          blue: '#315A73',
          'blue-hover': '#24475c',
          'blue-light': '#EBF1F5',
          slate: '#66737D',
          'slate-light': '#8A97A2',
          border: '#D8DCD9',
          'border-subtle': '#E5E8E5',
          card: '#FFFFFF',
          surface: '#EEF0EC',
          success: '#2E7D32',
          'success-light': '#E8F5E9',
          warning: '#D97706',
          'warning-light': '#FEF3C7',
          error: '#DC2626',
          'error-light': '#FEE2E2',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Menlo', 'monospace'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(23, 33, 43, 0.05), 0 1px 2px -1px rgba(23, 33, 43, 0.05)',
        'card': '0 2px 6px 0 rgba(23, 33, 43, 0.04), 0 1px 2px 0 rgba(23, 33, 43, 0.03)',
      }
    },
  },
  plugins: [],
};
