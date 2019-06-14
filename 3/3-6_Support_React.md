## 简介

React 项目的代码 主要是 JSX 语法 和 Class 语法，由于所有 JavaScript 引擎都不支持这两种语法，所以需要将其进行转换。

你可能想到了 *Babel*，Right! 下面来看看如何使用 Babel 或 TypeScript 将 React 框架支持起来


## 使用 Babel 支持 React

Babel支持 React 需要安装依赖 *babel-preset-react* 

安装依赖：

```
# 安装 React 基础依赖
npm i -D react react-dom
# 安装 babel 完成语法转换所需依赖
npm install --save-dev @babel/preset-react
```

修改 .babelrc 配置文件加入 React Presets

```
"presets": [
    "@babel/preset-react"
],
```

现在你的 .js 文件就可以支持 JSX 语法了


## 通过 TypeScript 支持 React

TypeScript 相比于 Babel 的优点在于它原生支持 JSX 语法，你不需要重新安装新的依赖，只需修改一行配置。 但 TypeScript 的不同在于：

* 使用了 JSX 语法的文件后缀必须是 tsx。
* 由于 React 不是采用 TypeScript 编写的，需要安装 react 和 react-dom 对应的 TypeScript 接口描述模块 @types/react 和 @types/react-dom 后才能通过编译。

修改 TypeScript 编译器配置文件 tsconfig.json 增加对 JSX 语法的支持:

```
{
  "compilerOptions": {
    "jsx": "react" // 开启 jsx ，支持 React
  }
}
```

将你的.js文件改变.tsx后缀，修改文件代码：

```
import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}

render(<Button/>, window.document.getElementById('app'));
```

用 *awesome-typescript-loader* 转换 ts和 tsx 文件，并且查找后缀中加上.tsx，修改 *webpack.config.js* :

```
const path = require('path');

module.exports = {
  // TS 执行入口文件
  entry: './main',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 先尝试 ts，tsx 后缀的 TypeScript 源码文件 
    extensions: ['.ts', '.tsx', '.js',] 
  },
  module: {
    rules: [
      {
        // 同时匹配 ts，tsx 后缀的 TypeScript 源码文件 
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devtool: 'source-map',// 输出 Source Map 方便在浏览器里调试 TypeScript 代码
};
```

安装 React 的 TS 接口描述：

```
npm i react react-dom @types/react @types/react-dom
```