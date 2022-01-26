const path = require('path');

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  outputDir: path.resolve(__dirname, './server/public'),
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
