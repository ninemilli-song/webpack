## 简介


## 服务器渲染添加样式

### 生成 asset-manifest.json

1. 安装 webpack-assets-manifest

> npm install webpack-assets-manifest --save-dev

2. 修改 webpack.config.js 添加 webpack-assets-manifest 插件

```
plugins: [
  ...
  new WebpackAssetsManifest({ // 生成 asset-manifest.json
    // Options go here
    output: 'asset-manifest.json' // 自定义名称
  }),
  ...
]
```

3. 修改服务器代码 http_server.js ：

```
const express = require('express');
const { render } = require('./dist/bundle_server');
const app = express();
import buildPath from './dist/asset-manifest.json'; // 引入静态资源描述文件

// 调用构建出的 bundle_server.js 中暴露出的渲染函数，再拼接下 HTML 模版，形成完整的 HTML 文件
app.get('/', function (req, res) {
  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="/${buildPath['main.css']}">
      </head>
      <body>
        <div id="app">${render()}</div>
        <!--导入 Webpack 输出的用于浏览器端渲染的 JS 文件-->
        <script src="/${buildPath['main.js']}"></script>
      </body>
    </html>
  `);
});

// 静态文件目录
app.use(express.static('./dist'));

app.listen(3000, function () {
  console.log('app listening on port 3000!')
});
```

将html 中的静态资源路径全部映射到 buildPath 中

4. 生成客户端文件和服务器端文件

修改 package.json:

```
...
"clean": "rimraf dist/",
"prebuild": "npm run clean",
"build": "webpack --config webpack.config.js && webpack --config webpack_server.config.js",
...
```

运行命令：

```
npm run build
```
