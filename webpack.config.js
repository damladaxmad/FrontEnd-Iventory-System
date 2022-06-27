proxy: {
    '/api': {
      target: 'http://localhost:80',
        changeOrigin: true,
    },
  },