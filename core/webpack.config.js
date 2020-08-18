const path = require("path");

const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "amd",
  },
  plugins: [new MomentLocalesPlugin()],
};
