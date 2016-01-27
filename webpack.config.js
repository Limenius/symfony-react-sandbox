const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'babel-polyfill',
            'jquery',
            'react'
        ],
        app: "./client/src/app.js"
    },
    devtool: 'sourcemap',
    output: {
        path: "./web/assets/build/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: require.resolve('jquery'), loader: 'expose?jQuery' },
            { test: require.resolve('jquery'), loader: 'expose?$' },
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                },
                cacheDirectory: true
            }
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            /* chunkName= */"vendor",
            /* filename= */"vendor.bundle.js")
    ]
}

