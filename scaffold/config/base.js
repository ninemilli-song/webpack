module.exports = (config, resolve) => {
  return () => {
    config
      // 入口名称
      .entry('app')
      // 入口路径
      .add(resolve('src/main.js'))
      .end()
      // 模式 "production" | "development" | "none"
      // .mode(process.env.NODE_ENV) 等价下面
      .set('mode', process.env.NODE_ENV)
      // 出口
      .output
      .path(resolve('dist'))
      .filename('[name].bundle.js');

      // // 开启 sourceMap
      const sourceMapLevel = process.env.NODE_ENV === 'production' ? 'cheap-source-map' : 'eval-source-map';
      config.devtool(sourceMapLevel);
  }
}
