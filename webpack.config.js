const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'babel-polyfill',
            'jquery'
        ],
        app: "./client/src/app.js"
    },
    output: {
        path: "./web/assets/build/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: require.resolve('jquery'), loader: 'expose?jQuery' },
            { test: require.resolve('jquery'), loader: 'expose?$' },
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            /* chunkName= */"vendor",
            /* filename= */"vendor.bundle.js")
    ]
}

