const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSCSS = new ExtractTextPlugin('stylesheets/[name].css')
//const CopyWebpackPlugin = require('copy-webpack-plugin')

const devBuild = process.env.NODE_ENV !== 'production'
const nodeEnv = devBuild ? 'development' : 'production'

const config = {
    entry: {
        'client-bundle': [ 'babel-polyfill', './client/js/clientEntryPoint.js' ],
        //        'client-bundle-redux' : './client/Recipes-redux/startup/clientRegistration'
    },
    output: {
        path: path.resolve(__dirname, 'web/assets/build/'),
        publicPath: '/assets/build/',
        filename: '[name].js',
    },
    resolve: {
        extensions: [ '.js', '.jsx' ],
    },
    plugins: [
        extractSCSS,
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            'jQuery'              : 'jquery',
            'window.jQuery'       : 'jquery',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv),
            },
        }),
    ],
    module: {
        rules: [
            { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/i, loader: extractSCSS.extract([ 'css-loader','sass-loader' ]) },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: { limit: 10000, mimetype: 'application/font-woff' }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: { limit: 10000, mimetype: 'application/octet-stream' }
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: { limit: 10000, mimetype: 'image/svg+xml' }
            },
            { test: /\.jpe?g$/, loader: 'file-loader' }
        ],
    }
}

if (devBuild) {
    console.log('Webpack dev build')
    config.devtool = '#eval-source-map'
} else {
    config.plugins.push(
        new webpack.optimize.DedupePlugin()
    )
    console.log('Webpack production build')
}

module.exports = config
