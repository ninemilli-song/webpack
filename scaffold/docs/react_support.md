# 支持 JSX 语法

## 引入 @babel/preset-react

> npm install --save-dev @babel/preset-react

## 修改 babel 配置

babel.js 添加 preset

```
module.exports = function(api) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            chrome: 59,
            edge: 13,
            firefox: 50,
            safari: 8
          }
        }
      ],
      [
        '@babel/preset-typescript',
      ],
      [
        '@babel/preset-react'
      ]
    ],
    plugins: [
      // '@babel/plugin-syntax-dynamic-import',
      // 'syntax-dynamic-import',
      // '@babel/plugin-transform-typescript',
      'transform-class-properties',
      '@babel/proposal-object-rest-spread'
    ]
  };
};
```

## Caveats

1. 去掉 `@babel/preset-typescript` 中的 allExtensions 配置
2. 去掉 `@babel/plugin-transform-typescript` 插件

Why?

`allExtensions: true` 的情况下，此时所有扩展文件都会当成 TS 或 TSX 处理，如果没有开启 isTSX 配置的话，js 扩展名下的文件中 jsx 语法会无法识别。

默认只能在 **TSX** 文件中使用 jsx 语法，如果需要在其它扩展名的文件使用 jsx 语法，则需要开启 isTSX配置
