# package.json

```
{
  "name": "webpack-temp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development node build/dev.js",    // 开发环境
    "build": "cross-env NODE_ENV=production node build/build.js",   // 生产环境
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cross-env": "^6.0.3",  // 兼容环境
    "css-loader": "^3.4.0", // css-loader
    "rimraf": "^3.0.0",     // 删除文件
    "webpack": "^4.41.4"    // webpack
    "ora": "^4.0.3",        // 控制台进度动画
  },
  "devDependencies": {
    "extract-text-webpack-plugin": "^3.0.2",    // 提取 css为单独文件
    "html-webpack-plugin": "^3.2.0",            // 生成 HTML5 文件
    "mini-css-extract-plugin": "^0.8.2",
    "vue-cli-plugin-commitlint": "^1.0.10",
    "webpack-chain": "^6.2.0",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.1"
  }
}
```

# webpack chain 链式调用进行配置

# 目录

```
.
├── README.md
├── babel.js
├── build
│   ├── base.js
│   ├── build.js
│   └── dev.js
├── config
│   ├── BundleSplitting.js
│   ├── ForkTsChecker.js
│   ├── FriendlyErrorsWebpackPlugin.js
│   ├── HtmlWebpackPlugin.js
│   ├── Manifest.js
│   ├── MiniCssExtractPlugin.js
│   ├── babelLoader.js
│   ├── base.js
│   └── style.js
├── dist
│   ├── app.bundle.js
│   ├── app.bundle.js.map
│   ├── app.css
│   ├── app.css.map
│   ├── index.html
│   ├── manifest.bundle.js
│   └── manifest.bundle.js.map
├── lib
│   └── index.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── index.html
├── src
│   ├── main.js
│   ├── style
│   │   ├── app.css
│   │   ├── index.css
│   │   ├── index.less
│   │   ├── index.postcss
│   │   └── index.scss
│   └── ts
│       └── index.ts
└── tsconfig.json
```

# 优化

## 分离Manifest

>当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。

/config/Manifest.js
```
module.exports = (config, resolve) => {
  return () => {
    config
      .optimization
      .runtimeChunk({
        name: "manifest"
      })
  }
}
```

## Code Splitting

> 1. 使用动态 import 或者 require.ensure 语法
> 2. 使用 babel-plugin-import 插件按需引入一些组件库

动态引入

添加插件以支持 import()

> npm install --save-dev @babel/plugin-syntax-dynamic-import

babel.js
```
plugins: [
  '@babel/plugin-syntax-dynamic-import',
  ……
]
```

测试
module.js
```
export let counter = 3;
export function incCounter() {
  counter++;
};
```

main.js
```
let filename = 'module.js';
import('./' + filename).then((counter, incCounter) => {
  console.log(counter);
  incCounter();
  console.log(counter);
});
```

## Bundle Splitting

将公共的包提取到 chunk-vendors 里面，比如你require('vue')，webpack 会将 vue 打包进 chunk-vendors.bundle.js

config/optimization.js
```
module.exports = (config, resolve) => {
  return () => {
    config
      .optimization.splitChunks({
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 3,
        maxInitialRequests: 3,
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      })
    config.optimization.usedExports(true)
  }
}
```

# Tree Shaking

1. 设置 package.json

```
"sideEffects": true,
```

2. 禁止 babel 模块转换

babel.js
```
presets: [
[
  '@babel/preset-env',
  {
    modules: false,
    ……
  }
],
```

至此 webpack 已经可以分析出哪些代码被引用到，哪些没有用到，如下：

dist/app.bundle.js
```
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
  'use strict';
  /* unused harmony export square */
  /* harmony export (immutable) */ __webpack_exports__['a'] = cube;
  function square(x) {
    return x * x;
  }

  function cube(x) {
    return x * x * x;
  }
});
```

3. 使用uglifyjs-webpack-plugin 剔除那此没有引用到的代码

安装：

> npm i -D uglifyjs-webpack-plugin

配置：

config/optimization.js
```
module.exports = (config, resolve) => {
  return () => {
    ……
    // Tree Shaking - 确保代码是es6格式,即 export，import
    config.optimization.usedExports(true)  // production 环境下默认为 true
    config.optimization.sideEffects(true)  // production 环境下默认为 true
    config.optimization
      .minimizer('js')
      .use(require.resolve('uglifyjs-webpack-plugin'), [{test: /\.js(\?.*)?$/i, sourceMap: true}])
  }
}

```

大功告成

**注意坑**

1. tree shaking 不支持动态引入的模块
2. 动态引入模块时的引入路径不可以是变量或表达式，否则会导致所以 tree shaking 失败，错误示例如下：
```
let filename = './module.js';
import(filename).then(res =>{})

or

let filename = 'module.js';
import('./' + filename).then(res =>{})
```
