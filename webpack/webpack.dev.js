const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { paths, publicPath } = require("../utils");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    publicPath,
    path: `${paths.static}`,
    filename: `${paths.js}/[name].js`,
    chunkFilename: `${paths.js}/[name].chunk.js`,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        type: "asset/resource",
        generator: {
          outputPath: paths.images,
          publicPath: `${paths.images}/`,
          filename: "[name][ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          outputPath: paths.fonts,
          publicPath: `${paths.fonts}/`,
          filename: "[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: process.env.APP_NAME || "React Node TypeScript",
      template: `${paths.assets}/index.html`,
      scriptLoading: "defer",
    }),
  ],
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
