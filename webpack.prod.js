var { merge } = require("webpack-merge");
var config = require("./webpack.config");

module.exports = merge(config, {
  mode: "production",
  devtool: "inline-source-map",
});
