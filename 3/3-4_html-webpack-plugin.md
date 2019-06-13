## 简介

使用[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)可以将 webpack生成的 bundle 文件插入到指定的 html 模板中生成生的 html

由于webpack 生成的 bundle 文件可能配置生成 hash 所以使用 *html-webpack-plugin* 可以很方便的将 bundle 文件插入到新生成的 html中


## 引入 Webpack

webpack plugin 配置中添加 html-webpack-plugin

```
const HtmlWebpackPlugin = require('html-webpack-plugin');

...

plugins: [
  new ExtractTextPlugin({
    // 从 .js 文件中提取出来的 .css 文件的名称
      filename: `[name]_[chunkhash:8].css`,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: 'body',
    hash: true,                                 // 为静态资源生成hash值
    minify: {                                   // 压缩HTML文件
      removeComments: true,                   // 移除HTML中的注释
      collapseWhitespace: true,               // 删除空白符与换行符
    },
  })
]
...
```

安装 html-webpack-plugin

```
# 安装 Webpack 插件
npm i -D html-webpack-plugin
```