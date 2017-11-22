var Encore = require('@symfony/webpack-encore');

Encore
    // directory where all compiled assets will be stored
    .setOutputPath('var/webpack/')
    // what's the public path to this directory (relative to your project's document root dir)
    .setPublicPath('/')
    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()
    // will output as app/Resources/webpack/server-bundle.js
    .addEntry('server-bundle', ['babel-polyfill', './assets/js/entryPoint.js'])
    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()

// export the final configuration
module.exports = Encore.getWebpackConfig()
