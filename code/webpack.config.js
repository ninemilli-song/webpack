const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
  	rules: [
  		{
  			// 用正则去匹配要用该 loader 转换的 CSS 文件
  			test: /\.css$/,
  			use: ExtractTextPlugin.extract({
  				// 转换 .css 文件需要使用的 Loader
          		use: ['css-loader'],
  			}),
  		},
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        // 同时匹配 ts，tsx 后缀的 TypeScript 源码文件 
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      },
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
  resolve: {
    // 先尝试 ts，tsx 后缀的 TypeScript 源码文件 
    extensions: ['.ts', '.tsx', '.js'] 
  },
  // 输出source-map 方便直接调试ES6源码
  devtool: 'source-map',
  plugins: [
  	new ExtractTextPlugin({
  		// 从 .js 文件中提取出来的 .css 文件的名称
      	filename: `[name]_[chunkhash:8].css`,
  	}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      hash: true,                                 // 为静态资源生成hash值
      minify: {                                   // 压缩HTML文件
        removeComments: true,                   // 移除HTML中的注释
        collapseWhitespace: true,               // 删除空白符与换行符
      },
    })
  ]
};