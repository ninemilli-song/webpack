## 简介

SCSS 可编程的CSS 依赖于 *node-sass*


## 引入 Webpack

webpack 配置中添加 sass-loader

```
module: {
  	rules: [
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 Loader
          use: ['css-loader', 'sass-loader'],
        }),
      }
  	]
  },
```

安装 sass-loader 和 node-sass

```
# 安装 Webpack Loader 依赖
npm i -D sass-loader
npm i -D node-sass
```