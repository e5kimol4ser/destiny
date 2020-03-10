const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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

// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
const sourceMapConfiguration = {
  enforce: 'pre',
  test: /\.js$/,
  loader: 'source-map-loader',
}

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    //path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['react-native'],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
  },
}

// Import static images in JavaScript files.
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

  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js'),
  ],

  output: {
    filename: 'app-[hash].bundle.js',
    path: path.resolve(appDirectory, 'dist'),
  },

  devtool: 'source-map',

  module: {
    rules: [typescriptLoaderConfiguration, sourceMapConfiguration, babelLoaderConfiguration, imageLoaderConfiguration],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.jsx', '.web.js', '.jsx', '.js'],
  },
}
