const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  // Other configuration options...
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  // Other configuration options...
};
new CssMinimizerPlugin({
  minimizerOptions: {
    preset: ['default', { discardComments: { removeAll: true } }],
  },
});
