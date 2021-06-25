const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let mode = "development";
let target = "web";
const plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
];

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

if (process.env.SERVE) {
  // We only want React Hot Reloading in serve mode
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode: mode,
  target: target,

  // This is unnecessary in Webpack 5, because it's the default.
  // However, react-refresh-webpack-plugin can't find the entry without it.
  entry: "./src/index.js",

  output: {
    // this places all images processed in an image folder
    assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,

        type: "asset",

        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: plugins,

  resolve: {
    extensions: [".js", ".jsx"],
  },

  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};
