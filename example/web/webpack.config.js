const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const appDirectory = path.resolve(__dirname, '../')
const webpackEnv = process.env.NODE_ENV || 'development'

const typescriptLoaderConfiguration = {
  test: /\.ts(x?)$/,
  exclude: /node_modules/,
  loader: 'ts-loader',
  options: {
    configFile: path.resolve(appDirectory, 'web', 'tsconfig.json'),
  },
}

const babelLoaderConfiguration = {
  test: /\.js$/,
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/destiny'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['module:metro-react-native-babel-preset'],
      plugins: ['react-native-web'],
    },
  },
}

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
}

module.exports = {
  mode: webpackEnv,

  entry: [path.resolve(appDirectory, 'index.web.js')],

  output: {
    filename: 'app-[hash].bundle.js',
    path: path.resolve(appDirectory, 'dist'),
  },

  devtool: 'nosources-source-map',

  module: {
    rules: [typescriptLoaderConfiguration, babelLoaderConfiguration, imageLoaderConfiguration],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },

  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.jsx', '.web.js', '.jsx', '.js'],
  },
}
