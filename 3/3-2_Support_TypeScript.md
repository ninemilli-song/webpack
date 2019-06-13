# Webpack 支持 TypeScript
---

## 初识 TypeScript

TypeScript 是 JavaScript 的一个超集，主要提供了类型检查系统和对 ES6 语法的支持。原生环境并不支持 TypeScript，所以需要我们将它转换成 JavaScript 才可以在原生环境中运行。


## 改造代码为 TypeScript

修改代码文件后缀为.ts 

> show.js -> show.ts
> main.js -> main.ts

修改代码内容：

```
// show.ts
// 操作 DOM 元素，把 content 显示到网页上
// 通过 ES6 模块规范导出 show 函数
// 给 show 函数增加类型检查 
export function show(content: string) {
  window.document.getElementById('app').innerText = 'Hello,' + content;
}
// main.ts
// 通过 ES6 模块规范导入 show 函数
import {show} from './show';
// 执行 show 函数
show('Webpack');
```

使用 TypeScript 官方提供的编译器能把 TypeScript 转换成 JavaScript。 在当前项目根目录下新建一个用于配置编译选项的 tsconfig.json 文件，编译器默认会读取和使用这个文件，配置文件如下：

```
{
  "compilerOptions": {
    "module": "commonjs", // 编译出的代码采用的模块规范
    "target": "es5", // 编译出的代码采用 ES 的哪个版本
    "sourceMap": true // 输出 Source Map 方便调试
  },
  "exclude": [ // 不编译这些目录里的文件
    "node_modules"
  ]
}
```

全局安装编译器：

> npm install -g typescript

通过 tsc 命令可以编译 ts 文件

> tsc hello.ts // 可以生成 hello.js


## 修改 webpack 配置

1. 修改入口文件

2. 支持 .ts 扩展名

3. 添加 awesome-typescript-loader

```
const path = require('path');

module.exports = {
  // 执行入口文件
  entry: './main',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 先尝试 ts 后缀的 TypeScript 源码文件
    extensions: ['.ts', '.js'] 
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devtool: 'source-map',// 输出 Source Map 方便在浏览器里调试 TypeScript 代码
};
```

安装依赖

> npm i -D typescript awesome-typescript-loader
