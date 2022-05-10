const webpack = require("webpack");
const dotenv = require("dotenv");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { paths } = require("../utils");

module.exports = {
  target: "web",
  context: paths.client,
  entry: "./index.tsx",
  resolve: {
    alias: {
      "@": `${paths.client}`,
      "@components": `${paths.client}/components`,
      "@pages": `${paths.client}/pages`,
      images: `${paths.assets}/${paths.images}`,
    },
    extensions: [".ts", ".tsx", ".js", "jsx", "json", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.client.json",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.config().parsed),
    }),
    new ESLintPlugin({ eslintPath: require.resolve("eslint") }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.assets}/${paths.images}`,
          to: `${paths.images_build}`,
        },
      ],
    }),
  ],
};
