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
