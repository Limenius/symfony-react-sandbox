const webpack = require('webpack');

module.exports = {
    entry: [
            './hola.js'
    ],
    target: 'node',
    output: {
        filename: "server-bundle.js"
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                },
                cacheDirectory: true
            }
        ]
    }
}

