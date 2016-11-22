'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

function isExternal(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('bower_components') >= 0 ||
         userRequest.indexOf('node_modules') >= 0 ||
         userRequest.indexOf('libraries') >= 0;
}

// Example:
// https://www.youtube.com/watch?v=qPHlCDOzCEk

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router',
            'redux-promise',
            'redux-thunk',
            'redux-form',
            'react-tap-event-plugin',
            'material-ui',
            'lodash',
            'axios',
            'pouchdb-browser'
        ],
        app: ['./src/index.js']
    },
    output: {
      path: path.resolve(__dirname, 'static/'),
      filename: 'js/[name].js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    plugins: [
        // Output extracted CSS to a file
        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // Uglify javascript
        new webpack.optimize.UglifyJsPlugin({
            compressormo: {
                warnings: false,
                screw_ie8: true
            }
        }),
        // Create a service worker
        new SWPrecacheWebpackPlugin({
            cacheId: 'mockingbird',
            filename: './sw.js',
            maximumFileSizeToCacheInBytes: 10485760,
            directoryIndex: null,
            staticFileGlobs: [
                "fonts/**.woff",
                "fonts/**.woff2",
                "/**.html",
                "/**.txt",
                "static/**.js",
                "static/**.txt",
                "static/**.json",
                "static/js/**.js",
                "static/css/**.css",
                "static/fonts/**.eot",
                "static/fonts/**.svg",
                "static/fonts/**.ttf",
                "static/fonts/**.otf",
                "static/img/**.png",
                "static/img/icon/**.png"
            ],
            runtimeCaching: [{
              handler: 'cacheFirst',
              urlPattern: /\/$/,
            }],
            verbose: true
        }),
        // Deploy everything to template
        new HtmlWebpackPlugin({
            template: 'templates/index.tpl.html',
            filename: path.resolve(__dirname, 'templates/') + '/index.html',
            hash: true,
            inject: 'body',
            chunks: ["commons", "app"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: './js/commons-[hash].js',
            chunks: ["vendor", "app"]
        })
    ],
    // ESLint options
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: true
    },
};
