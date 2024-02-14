import * as ts from "typescript";

const path = require('path');
const transformer = require('../../src').default;

module.exports = {
  mode: "development",
  entry: "./src/source.ts",
  output: {
    path: path.resolve(__dirname, "transformed"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          compiler: 'ts-patch/compiler',
          // getCustomTransformers: (program: ts.Program) => ({
          //   before: [transformer(program, null, { ts })],
          // }),
        },
      },
    ],
  },
};
