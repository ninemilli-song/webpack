const express = require('express');
const { render } = require('./dist/bundle_server');
const app = express();
const buildPath = require('./dist/asset-manifest.json');

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
