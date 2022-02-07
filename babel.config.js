module.exports = {
  plugins: [
      ["@babel/plugin-transform-modules-umd", {
      exactGlobals: true,
      globals: {
        index: 'TooltipSequenceV2'
      }
    }]
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};