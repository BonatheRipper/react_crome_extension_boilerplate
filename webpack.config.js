const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    popup: path.resolve("./src/popup/popup.jsx"),
    options: path.resolve("./src/options/options.jsx"),
    background: path.resolve("./src/background/background.js"),
    contentScript: path.resolve("./src/contentScript/contentScript.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|Backend)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugin: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
      },
      {
        type: "asset/resource",
        test: /\.(png|jpg|jpeg|gif|svg|)$/,
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new HtmlWebpackPlugin({
      template: "./src/static/popup.html",
      filename: "popup.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/options/options.html",
      filename: "options.html",
    }),

    // ...getHtmlPlugins(["popup", "options"]),
  ],
  resolve: {
    extensions: [".js", "jpg", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"],
    modules: ["src", "node_modules"], // Assuming that your files are inside the src dir
  },
  optimization: {
    splitChunks: { chunks: "all" },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        title: "React Extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
