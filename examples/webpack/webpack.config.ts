import * as ts from "typescript";

const path = require('path');
const transformer = require('../../src').default;

module.exports = {
  mode: "development",
  entry: "./src/source.ts",
  infrastructureLogging: {
    level: 'info', // или 'warn', 'error', 'log' в зависимости от необходимого уровня логирования
  },
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
          transpileOnly: false,
          // getCustomTransformers: (program: ts.Program) => ({
          //   before: [transformer(program, null, { ts })],
          // }),
        },
      },
    ],
  },
};
