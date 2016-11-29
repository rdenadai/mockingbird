'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

// Example:
// https://www.youtube.com/watch?v=qPHlCDOzCEk
// To run the scripts use: npm run-script {dev | prod}

module.exports = {
    entry: {
        commons: [
            'react',
            'react-dom',
            'react-addons-transition-group',
            'react-addons-css-transition-group',
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
            'pouchdb-browser',
            'uuid',
            'velocity-animate',
            'redux-pouchdb',
            'moment'
        ],
        app: ['babel-polyfill', './src/index.js']
    },
    output: {
      path: path.resolve(__dirname, 'static/'),
      filename: 'js/compile/[name].js',
      publicPath: "/static/"
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
                    plugins: ["react-hot-loader/babel"]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader?modules=true&minimize=true", "css-loader?modules=true&minimize=true")
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    name: "fonts/fontawesome-webfont.[ext]",
                    limit: 10000,
                    mimetype: "application/font-woff"
                }
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    name: "fonts/fontawesome-webfont.[ext]",
                    limit: 10000,
                    mimetype: "application/font-woff"
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    name: "fonts/fontawesome-webfont.[ext]",
                    limit: 10000,
                    mimetype: "application/octet-stream"
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file",
                query: {
                    name: "fonts/fontawesome-webfont.[ext]"
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    name: "fonts/fontawesome-webfont.[ext]",
                    limit: 10000,
                    mimetype: "image/svg+xml"
                }
            }
        ]
    },
    plugins: [
        // Output extracted CSS to a file
        new ExtractTextPlugin('./css/compile/[name].css'),
        // Create a service worker
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: './js/compile/[name].js',
            chunks: ["commons", "app"]
        }),
        // Deploy everything to template
        new HtmlWebpackPlugin({
            template: 'templates/index.tpl.html',
            filename: path.resolve(__dirname, 'templates/') + '/index.html',
            inject: 'body',
            chunks: ["commons", "app"]
        }),
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
                "static/js/compile/**.js",
                "static/css/compile/**.css",
                "static/fonts/**.woff",
                "static/fonts/**.woff2",
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
        })
    ],
    devServer: {
      contentBase: "./templates",
      publicPath: "/static/",
      compress: true,
      hot: true,
      stats: { colors: true }
    },
    devtool: "eval",
    // ESLint options
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: true
    },
};
