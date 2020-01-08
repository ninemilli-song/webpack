// 优化

module.exports = (config, resolve) => {
  return () => {
  	//// 分离 Mainfest
  	config
      .optimization
      .runtimeChunk({
        name: "manifest"
      })
    // 将公共的包提取到 chunk-vendors 里面，比如你require('vue')，webpack 会将 vue 打包进 chunk-vendors.bundle.js
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
    // Tree Shaking - 确保代码是es6格式,即 export，import
    config.optimization.usedExports(true)
    config.optimization.sideEffects(true)
    config.optimization
    	.minimizer('js')
    	.use(require.resolve('uglifyjs-webpack-plugin'), [{test: /\.js(\?.*)?$/i, sourceMap: true}])
  }
}
