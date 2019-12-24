
# 2-5 Plugin

Plugin 用于扩展 Webpack 功能，各种各样的 Plugin 几乎让 Webpack 可以做任何构建相关的事情。

## 配置 Plugin

Plugin 的配置很简单，`plugins` 配置项接受一个数组，数组里每一项都是一个要使用的 Plugin 的实例，Plugin 需要的参数通过构造函数传入。

```
const CommonsChunkPlugin = require(&amp;aposwebpack/lib/optimize/CommonsChunkPlugin&amp;apos);

module.exports = {
  plugins: [
    // 所有页面都会用到的公共代码提取到 common 代码块中
    new CommonsChunkPlugin({
      name: &amp;aposcommon&amp;apos,
      chunks: [&amp;aposa&amp;apos, &amp;aposb&amp;apos]
    }),
  ]
};

```

使用 Plugin 的难点在于掌握 Plugin 本身提供的配置项，而不是如何在 Webpack 中接入 Plugin。

几乎所有 Webpack 无法直接实现的功能都能在社区找到开源的 Plugin 去解决，你需要善于使用搜索引擎去寻找解决问题的方法。

#  results matching ""

# No results matching ""
