const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = {
  ...defineConfig({
    transpileDependencies: true
  }),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  }
}
