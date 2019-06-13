## 简介

PostCSS 通过插件机制扩展CSS特性

PostCSS常用用途：

1. 给 CSS 自动添加前缀

2. 使用下一代 CSS 语法

> PostCSS 和 CSS 的关系就像 Babel 和 JavaScript 的关系，它们解除了语法上的禁锢，通过插件机制来扩展语言本身，用工程化手段给语言带来了更多的可能性。

> PostCSS 和 SCSS 的关系就像 Babel 和 TypeScript 的关系，PostCSS 更加灵活、可扩张性强，而 SCSS 内置了大量功能而不能扩展。


 在 PostCSS 启动时，会从目录下的 postcss.config.js 文件中读取所需配置，所以需要新建该文件，文件内容大体如下：

```
module.exports = ({ file, env }) => ({
    plugins: {
        'postcss-cssnext': {},
        'cssnano': env === 'production' ? {
            safe: true,
            sourcemap: true,
            autoprefixer: false,
        } : false
    }
});
```

*postcss-cssnext* 插件可以让你使用下一代 CSS 语法编写代码，再通过 PostCSS 转换成目前的浏览器可识别的 CSS，并且该插件还包含给 CSS 自动加前缀的功能

*cssnano* 是基于postcss的一款功能强大的插件包，它集成了近30个插件，只需要执行一个命令，就可以对我们的css做多方面不同类型的优化，比如：

* 删除空格和最后一个分号
* 删除注释
* 优化字体权重
* 丢弃重复的样式规则
* 优化calc()
* 压缩选择器
* 减少手写属性
* 合并规则
* ...



## 引入 Webpack

webpack 配置中添加 postcss-loader

```
module: {
  	rules: [
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 Loader
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      }
  	]
  },
```

安装 postcss-loader 和 插件依赖

```
# 安装 Webpack Loader 依赖
npm i -D postcss-loader css-loader style-loader
# 根据你使用的特性安装对应的 PostCSS 插件依赖
npm i -D postcss-cssnext
npm i -D cssnano
```