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
    plugins: [
        new webpack.ProvidePlugin({
            _: "lodash",
            $: "jquery",
            "jQuery"              : "jquery",
            "window.jQuery"       : "jquery",
        })
    ],
    module: {
        loaders: [
            { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
        ],
    }
}

