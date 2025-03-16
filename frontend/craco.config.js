const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new NodePolyfillPlugin()
      ]);
      return webpackConfig;
    },
  },
};