const path = require('path');

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  outputDir: path.resolve(__dirname, './server/public'),
  devServer: {
    proxy: {
      '/api/posts/*': {
        target: 'http://localhost:5000',
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Car Exhaust sounds';
      return args;
    });
  },
};
