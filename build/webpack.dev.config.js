const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
console.log(path.resolve(__dirname, "../public/index.html"));
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src/main.js"), //入口文件
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      // ... other rules
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: "./",
    }),
    new HtmlWebpackPlugin({
      title: "Vue.js",
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      inject: true,
    }),
    new VueLoaderPlugin(),
  ],
};
