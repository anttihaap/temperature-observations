var webpack = require("webpack");
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "../public");
var SRC_DIR = path.resolve(__dirname, "src");

module.exports = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },
  externals: ['axios'],
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-2"]
        }
      }
    ]
  },
  devServer: {
    port: 8081,
    //used to get routes working
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      }
    }
  }
};
