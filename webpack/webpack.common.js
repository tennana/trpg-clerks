const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const browser = process.env.BROWSER !== "firefox" ? "chrome" : process.env.BROWSER;
const BUILD_DIR_NAME = 'dist';
const SRC_DIR_NAME = 'src';

module.exports = {
  entry: {
    popup: path.join(__dirname, `../${SRC_DIR_NAME}/popup.ts`),
    backgroundCcfolia: path.join(__dirname, `../${SRC_DIR_NAME}/background/${browser}/background-ccfolia.ts`),
    backgroundExtensions: path.join(__dirname, `../${SRC_DIR_NAME}/background/${browser}/background-extensions.ts`),
  },
  output: {
    path: path.join(__dirname, `../${BUILD_DIR_NAME}`),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
    ],
  },
  resolve: {
    conditionNames: ['svelte'],
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
      '@': path.resolve(__dirname,`../${SRC_DIR_NAME}/background/${browser}/`)
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: './images', to: `../${BUILD_DIR_NAME}/images`, context: 'public' },
        { from: './popup.html', to: `../${BUILD_DIR_NAME}/popup.html`, context: 'public' },
        { from: `${process.env.BROWSER}_manifest.json`, to: `../${BUILD_DIR_NAME}/manifest.json`, context: 'public' },
      ],
    }),
  ],
};
