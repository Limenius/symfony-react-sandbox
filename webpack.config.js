const webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractSCSS = new ExtractTextPlugin('stylesheets/[name].css');

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
        extractSCSS,
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
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            {test: /\.scss$/i, loader: extractSCSS.extract(['css','sass'])},
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ],
    }
}

