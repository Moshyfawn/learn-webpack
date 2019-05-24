const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
require("dotenv").config();
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: "./dist",
    open: true,
    stats: "errors-only",
    // TODO use error-overlay-webpack-plugin instead
    overlay: true,
    host: process.env.HOST,
    port: process.env.PORT,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Output"
    }),
    new CleanWebpackPlugin(),
    new webpack.WatchIgnorePlugin([path.join(__dirname, "node_modules")])
  ]
};
