
# 常用 Plugins

本节将对本书用到的及其它常用 Plugin 做一个汇总，以方便你在这快速查找到你需要的 Plugin。

### 用于修改行为

- **[define-plugin](https://webpack.js.org/plugins/define-plugin/)**：定义环境变量，在[4-7区分环境](../4优化/4-7区分环境.html)中有介绍。
- **[context-replacement-plugin](https://webpack.js.org/plugins/context-replacement-plugin/)**：修改 `require` 语句在寻找文件时的默认行为。
- **[ignore-plugin](https://webpack.js.org/plugins/ignore-plugin/)**：用于忽略部分文件。

### 用于优化

- **[commons-chunk-plugin](https://webpack.js.org/plugins/commons-chunk-plugin/)**：提取公共代码，在[4-11提取公共代码](../4优化/4-11提取公共代码.html)中有介绍。
- **[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)**：提取 JavaScript 中的 CSS 代码到单独的文件中，在[1-5使用 Plugin](../1入门/1-5使用Plugin.html) 中有介绍。 
- **[prepack-webpack-plugin](https://github.com/gajus/prepack-webpack-plugin)**：通过 Facebook 的 Prepack 优化输出的 JavaScript 代码性能，在 [4-13使用 Prepack](../4优化/4-13使用Prepack.html) 中有介绍。
- **[uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)**：通过 UglifyES 压缩 ES6 代码，在 [4-8压缩代码](../4优化/4-8压缩代码.html)中有介绍。
- **[webpack-parallel-uglify-plugin](https://github.com/gdborton/webpack-parallel-uglify-plugin)**：多进程执行 UglifyJS 代码压缩，提升构建速度。
- **[imagemin-webpack-plugin](https://www.npmjs.com/package/imagemin-webpack-plugin)**：压缩图片文件。
- **[webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith)**：用插件制作雪碧图。
- **[ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)**：开启 Webpack Scope Hoisting 功能，在[4-14开启 ScopeHoisting](../4优化/4-14开启ScopeHoisting.html)中有介绍。 
- **[dll-plugin](https://webpack.js.org/plugins/dll-plugin/)**：借鉴 DDL 的思想大幅度提升构建速度，在[4-2使用 DllPlugin](../4优化/4-2使用DllPlugin.html)中有介绍。
- **[hot-module-replacement-plugin](https://webpack.js.org/plugins/hot-module-replacement-plugin/)**：开启模块热替换功能。

### 其它

- **[serviceworker-webpack-plugin](https://github.com/oliviertassinari/serviceworker-webpack-plugin)**：给网页应用增加离线缓存功能，在[3-14 构建离线应用](../3实战/3-14构建离线应用.html)中有介绍。
- **[stylelint-webpack-plugin](https://github.com/JaKXz/stylelint-webpack-plugin)**：集成 stylelint 到项目中，在[3-16检查代码](../3实战/3-16检查代码.html)中有介绍。
- **[i18n-webpack-plugin](https://github.com/webpack-contrib/i18n-webpack-plugin)**：给你的网页支持国际化。
- **[provide-plugin](https://webpack.js.org/plugins/provide-plugin/)**：从环境中提供的全局变量中加载模块，而不用导入对应的文件。
- **[web-webpack-plugin](https://github.com/gwuhaolin/web-webpack-plugin)**：方便的为单页应用输出 HTML，比 html-webpack-plugin 好用。

#  results matching ""

# No results matching ""
