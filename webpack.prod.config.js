const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClosurePlugin = require('closure-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'tsickle-loader',
          options: {
            tsconfig: path.resolve(__dirname, 'tsconfig.prod.json'),
            externDir: './externs'
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[sha1:hash:hex:4]'
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      ignoreOrder: false
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss']
  },
  optimization: {
    minimizer: [
      new ClosurePlugin(
        {
          mode: 'STANDARD',
          childCompilations: true
        },
        {
          externs: [path.resolve(__dirname, 'externs/externs.js')],
          languageOut: 'ECMASCRIPT5',
          compilation_level: 'ADVANCED'
        }
      )
    ],
    usedExports: true,
    splitChunks: {
      name: true
    },
    concatenateModules: true
  }
};

module.exports = config;
