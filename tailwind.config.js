/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调 - 深海像素蓝
        'pixel-bg': '#0a0f1a',
        'pixel-surface': '#131b2e',
        'pixel-border': '#1e293b',
        // F1主题色
        'f1-red': '#e10600',
        'f1-red-dark': '#8b0000',
        // 像素强调色
        'pixel-cyan': '#00d9ff',
        'pixel-gold': '#ffd700',
        'pixel-silver': '#c0c0c0',
        'pixel-bronze': '#cd7f32',
        // 文字
        'pixel-text': '#f1f5f9',
        'pixel-text-dim': '#94a3b8',
        // 车队颜色
        'team-redbull': '#1e41ff',
        'team-ferrari': '#dc0000',
        'team-mercedes': '#00d2be',
        'team-mclaren': '#ff8000',
        'team-aston': '#006f62',
        'team-alpine': '#0090ff',
        'team-williams': '#005aff',
        'team-racingbulls': '#2b4562',
        'team-sauber': '#52e252',
        'team-haas': '#b6babd',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'terminal': ['VT323', 'monospace'],
        'display': ['"ZCOOL KuaiLe"', 'cursive'],
      },
      fontSize: {
        'pixel-xs': '0.5rem',
        'pixel-sm': '0.625rem',
        'pixel': '0.75rem',
        'pixel-lg': '1rem',
        'pixel-xl': '1.25rem',
        'pixel-2xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'pixel-bounce': 'pixelBounce 0.5s ease-in-out',
        'scanline': 'scanline 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        pixelBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,0.5)',
        'pixel-hover': '6px 6px 0px 0px rgba(0,0,0,0.5)',
        'pixel-active': '2px 2px 0px 0px rgba(0,0,0,0.5)',
        'glow': '0 0 20px rgba(225, 6, 0, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
