module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  /*   devServer: {
    proxy: {
      '/api/': {
        target: 'http://localhost:5000/api/posts',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '/api' },
        logLevel: 'debug',
      },
    },
  }, */
};
