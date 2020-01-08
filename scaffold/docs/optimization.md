# 开启 gzip

1. 安装 compression-webpack-plugin

> npm install compression-webpack-plugin --save-dev

2. webpack配置中添加 **compression-webpack-plugin**

/config/ComperssionWebpackPlugin.js

```
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [
      {
        algorithm: 'gzip',
        test: /\.js(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      }
    ]);
  };
};

```
