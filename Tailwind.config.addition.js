// Tambahkan ke tailwind.config.js Anda

module.exports = {
  theme: {
    extend: {
      keyframes: {
        'phone-float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-20px) rotate(1deg)',
          },
        },
        'shadow-pulse': {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'translateX(-50%) scale(1)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'translateX(-50%) scale(1.1)',
          },
        },
        'glow-rotate': {
          '0%': {
            transform: 'translate(-50%, -50%) rotate(0deg)',
          },
          '100%': {
            transform: 'translate(-50%, -50%) rotate(360deg)',
          },
        },
        'pulse-subtle': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.95',
            transform: 'scale(1.02)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        'phone-float': 'phone-float 4s ease-in-out infinite',
        'shadow-pulse': 'shadow-pulse 4s ease-in-out infinite',
        'glow-rotate': 'glow-rotate 8s linear infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
}