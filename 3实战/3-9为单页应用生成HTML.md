
# 3-9 为单页应用生成 HTML

## 引入问题

在[3-6 使用 React 框架](3-6使用React框架.html)中，是用最简单的 `Hello,Webpack` 作为例子让大家理解，
这个例子里因为只输出了一个 `bundle.js` 文件，所以手写了一个 `index.html` 文件去引入这个 `bundle.js`，才能让应用在浏览器中运行起来。

在实际项目中远比这复杂，一个页面常常有很多资源要加载。接下来举一个实战中的例子，要求如下：

1. 项目采用 ES6 语言加 React 框架。
1. 给页面加入 [Google Analytics](https://analytics.google.com/analytics/web/)，这部分代码需要内嵌进 HEAD 标签里去。
1. 给页面加入 [Disqus](https://disqus.com) 用户评论，这部分代码需要异步加载以提升首屏加载速度。
1. 压缩和分离 JavaScript 和 CSS 代码，提升加载速度。

在开始前先来看看该应用最终发布到线上的代码：

```
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;!--注入 Chunk app 依赖的 CSS--&gt;
  &lt;style rel="stylesheet"&gt;h1{color:red}&lt;/style&gt;
  &lt;!--内嵌 google_analytics 中的 JavaScript 代码--&gt;
  &lt;script&gt;
(function(i,s,o,g,r,a,m){i[&amp;aposGoogleAnalyticsObject&amp;apos]=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,&amp;aposscript&amp;apos,&amp;aposhttps://www.google-analytics.com/analytics.js&amp;apos,&amp;aposga&amp;apos);
ga(&amp;aposcreate&amp;apos, &amp;aposUA-XXXXX-Y&amp;apos, &amp;aposauto&amp;apos);
ga(&amp;apossend&amp;apos, &amp;apospageview&amp;apos);
  &lt;/script&gt;
  &lt;!--异步加载 Disqus 评论--&gt;
  &lt;script async="" src="https://dive-into-webpack.disqus.com/embed.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="app"&gt;&lt;/div&gt;
&lt;!--导入 app 依赖的 JS--&gt;
&lt;script src="app_746f32b2.js"&gt;&lt;/script&gt;
&lt;!--Disqus 评论容器--&gt;
&lt;div id="disqus_thread"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

```

> 
HTML 应该是被压缩过的，这里为了方便大家阅读而格式化了 HTML，并且加入了注释。


构建出的目录结构为：

```
dist
├── app_792b446e.js
└── index.html

```

可以看到部分代码被内嵌进了 HTML 的 HEAD 标签中，部分文件的文件名称被打上根据文件内容算出的 Hash 值，并且加载这些文件的 URL 地址也被正常的注入到了 HTML 中。
如果你还采用手写 `index.html` 文件去完成以上要求，这就会使工作变得复杂、易错，项目难以维护。
本节教你如何自动化的生成这个符合要求的 `index.html`。

## 解决方案

推荐一个用于方便的解决以上问题的 Webpack 插件 [web-webpack-plugin](https://github.com/gwuhaolin/web-webpack-plugin)。
该插件已经被社区上许多人使用和验证，解决了大家的痛点获得了很多好评，下面具体介绍如何用它来解决上面的问题。

首先，修改 Webpack 配置为如下：

```
const path = require(&amp;apospath&amp;apos);
const UglifyJsPlugin = require(&amp;aposwebpack/lib/optimize/UglifyJsPlugin&amp;apos);
const ExtractTextPlugin = require(&amp;aposextract-text-webpack-plugin&amp;apos);
const DefinePlugin = require(&amp;aposwebpack/lib/DefinePlugin&amp;apos);
const { WebPlugin } = require(&amp;aposweb-webpack-plugin&amp;apos);

module.exports = {
  entry: {
    app: &amp;apos./main.js&amp;apos// app 的 JavaScript 执行入口文件
  },
  output: {
    filename: &amp;apos[name]_[chunkhash:8].js&amp;apos,// 给输出的文件名称加上 Hash 值
    path: path.resolve(__dirname, &amp;apos./dist&amp;apos),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [&amp;aposbabel-loader&amp;apos],
        // 排除 node_modules 目录下的文件，
        // 该目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, &amp;aposnode_modules&amp;apos),
      },
      {
        test: /\.css$/,// 增加对 CSS 文件的支持
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: [&amp;aposcss-loader?minimize&amp;apos] // 压缩 CSS 代码
        }),
      },
    ]
  },
  plugins: [
    // 使用本文的主角 WebPlugin，一个 WebPlugin 对应一个 HTML 文件
    new WebPlugin({
      template: &amp;apos./template.html&amp;apos, // HTML 模版文件所在的文件路径
      filename: &amp;aposindex.html&amp;apos // 输出的 HTML 的文件名称
    }),
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css`,// 给输出的 CSS 文件名称加上 Hash 值
    }),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production，以去除源码中只有开发时才需要的部分
      &amp;aposprocess.env&amp;apos: {
        NODE_ENV: JSON.stringify(&amp;aposproduction&amp;apos)
      }
    }),
    // 压缩输出的 JavaScript 代码
    new UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
  ],
};

```

以上配置中，大多数都是按照前面已经讲过的内容增加的配置，例如：

- 增加对 CSS 文件的支持，提取出 Chunk 中的 CSS 代码到单独的文件中，压缩 CSS 文件；
- 定义 `NODE_ENV` 环境变量为 `production`，以去除源码中只有开发时才需要的部分；
- 给输出的文件名称加上 Hash 值；
- 压缩输出的 JavaScript 代码。

但最核心的部分在于 `plugins` 里的：

```
new WebPlugin({
  template: &amp;apos./template.html&amp;apos, // HTML 模版文件所在的文件路径
  filename: &amp;aposindex.html&amp;apos // 输出的 HTML 的文件名称
})

```

其中 `template: &amp;apos./template.html&amp;apos` 所指的模版文件 `template.html` 的内容是：

```
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;!--注入 Chunk app 中的 CSS--&gt;
  &lt;link rel="stylesheet" href="app?_inline"&gt;
  &lt;!--注入 google_analytics 中的 JavaScript 代码--&gt;
  &lt;script src="./google_analytics.js?_inline"&gt;&lt;/script&gt;
  &lt;!--异步加载 Disqus 评论--&gt;
  &lt;script src="https://dive-into-webpack.disqus.com/embed.js" async&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="app"&gt;&lt;/div&gt;
&lt;!--导入 Chunk app 中的 JS--&gt;
&lt;script src="app"&gt;&lt;/script&gt;
&lt;!--Disqus 评论容器--&gt;
&lt;div id="disqus_thread"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

```

该文件描述了哪些资源需要被以何种方式加入到输出的 HTML 文件中。

以 `&lt;link rel="stylesheet" href="app?_inline"&gt;` 为例，按照正常引入 CSS 文件一样的语法来引入 Webpack 生产的代码。
`href` 属性中的 `app?_inline` 可以分为两部分，前面的 `app` 表示 CSS 代码来自名叫 `app` 的 Chunk 中，后面的 `_inline` 表示这些代码需要被内嵌到这个标签所在的位置。

同样的 `&lt;script src="./google_analytics.js?_inline"&gt;&lt;/script&gt;` 表示 JavaScript 代码来自相对于当前模版文件 `template.html` 的本地文件 `./google_analytics.js`，
而且文件中的 JavaScript 代码也需要被内嵌到这个标签所在的位置。

也就是说资源链接 URL 字符串里问号前面的部分表示资源内容来自哪里，后面的 querystring 表示这些资源注入的方式。

除了 `_inline` 表示内嵌外，还支持以下属性：

- `_dist` 只有在生产环境下才引入该资源
- `_dev` 只有在开发环境下才引入该资源
- `_ie` 只有IE浏览器才需要引入的资源，通过 `[if IE]&gt;resource&lt;![endif]` 注释实现

这些属性之间可以搭配使用，互不冲突。例如 `app?_inline&amp;_dist` 表示只在生产环境下才引入该资源，并且需要内嵌到 HTML 里去。

`WebPlugin` 插件还支持一些其它更高级的用法，详情可以访问该[项目主页](https://github.com/gwuhaolin/web-webpack-plugin)阅读文档。

> 
本实例[提供项目完整代码](http://webpack.wuhaolin.cn/3-9为单页应用生成HTML.zip)


#  results matching ""

# No results matching ""
