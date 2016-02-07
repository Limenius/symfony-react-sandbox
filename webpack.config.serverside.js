// Webpack configuration for server bundle

const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {

    // the project dir
    context: __dirname,
    devtool: 'sourcemap',
    entry: [
        'babel-polyfill',
        './client/Recipes/startup/serverRegistration'
        ],
        output: {
            filename: 'server-bundle.js',
        },
        resolve: {
            extensions: ['', '.js', '.jsx'],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(nodeEnv),
                },
        }),
        ],
        module: {
            loaders: [
                { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
                ],
            },
        };
