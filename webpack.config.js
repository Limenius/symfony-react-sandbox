const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './client/Recipes/startup/clientRegistration'
    ],
    devtool: 'sourcemap',
    output: {
        path: "./web/assets/build/",
        filename: 'client-bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            { test: require.resolve('jquery'), loader: 'expose?jQuery' },
            { test: require.resolve('jquery'), loader: 'expose?$' },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
        ],
    }
}

