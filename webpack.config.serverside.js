// Webpack configuration for server bundle

const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {

    // the project dir
    context: __dirname,
    entry: [
        './client/Recipes/startup/serverRegistration'
        //'./client/Recipes-redux/startup/serverRegistration'
        ],
    output: {
        filename: 'app/Resources/webpack/server-bundle.js',
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
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            'jQuery'              : 'jquery',
            'window.jQuery'       : 'jquery',
        })
    ],
    module: {
        loaders: [
            { test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
        ],
    },
};
