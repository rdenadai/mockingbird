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

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux'
        ],
        'react-extras': [
            'react-router',
            'react-tap-event-plugin',
            'material-ui'
        ],
        'redux-extras': [
            'redux-promise',
            'redux-thunk',
            'redux-form'
        ],
        libraries: [
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
                "static/fonts/**.woff",
                "static/fonts/**.woff2",
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
            inject: 'body',
            filename: path.resolve(__dirname, 'templates/') + '/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "react-extras",
            chunks: ['react-extras'],
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "redux-extras",
            chunks: ['redux-extras'],
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "libraries",
            chunks: ['libraries'],
            minChunks: Infinity
        })
    ],
    // ESLint options
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: true
    },
};
