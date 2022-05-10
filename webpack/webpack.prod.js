const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { InjectManifest } = require("workbox-webpack-plugin");

const { paths, publicPath } = require("../utils");
const common = require("./webpack.common");

const clientConfig = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    publicPath,
    path: `${paths.static}`,
    filename: `${paths.js}/[name].[contenthash:8].js`,
    chunkFilename: `${paths.js}/[name].[contenthash:8].chunk.js`,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico|webp|bmp|tiff)$/,
        type: "asset/resource",
        generator: {
          outputPath: paths.images,
          publicPath: `${paths.images}/`,
          filename: "[name]-[hash][ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          outputPath: paths.fonts,
          publicPath: `${paths.fonts}/`,
          filename: "[name]-[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: process.env.APP_NAME || "React Node TypeScript",
      template: `${paths.assets}/index.html`,
      scriptLoading: "defer",
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
      },
    }),
    new WebpackPwaManifest({
      name: process.env.APP_NAME || "React Node TypeScript",
      short_name: "RNT",
      description: "RNT",
      background_color: "#000",
      theme_color: "#111",
      inject: true,
      ios: true,
      icons: [
        {
          src: `${paths.assets}/images/pwa.png`,
          destination: "images",
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
        {
          src: `${paths.assets}/images/pwa.png`,
          sizes: [120, 152, 167, 180],
          destination: "images",
          ios: true,
        },
        {
          src: `${paths.assets}/images/pwa.png`,
          size: 1024,
          destination: "images",
          ios: "startup",
        },
      ],
    }),
    new InjectManifest({
      swSrc: paths.workbox,
      swDest: "service-worker.js",
    }),
    new MiniCssExtractPlugin({
      filename: `${paths.css}/[name].css`,
      chunkFilename: `${paths.css}/[id].css`,
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
    nodeEnv: "production",
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        styles: {
          test: /\.css$/,
          name: "styles",
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
});

const serverConfig = {
  mode: "production",
  context: paths.server,
  entry: "./server.ts",
  output: {
    publicPath,
    filename: "server.js",
    path: paths.build,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.server.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
};

module.exports = [serverConfig, clientConfig];
