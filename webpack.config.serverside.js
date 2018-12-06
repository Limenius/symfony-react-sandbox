var Encore = require("@symfony/webpack-encore");

Encore
  // directory where all compiled assets will be stored
  .setOutputPath("var/webpack/")
  // what's the public path to this directory (relative to your project's document root dir)
  .setPublicPath("/")
  // empty the outputPath dir before each build
  .cleanupOutputBeforeBuild()
  // enable react in babel
  .enableReactPreset()
  // so we don't need to deal with runtime.js
  .disableSingleRuntimeChunk()
  // will output as app/Resources/webpack/server-bundle.js
  .addEntry("server-bundle", "./assets/js/entryPoint.js");
// export the final configuration
module.exports = Encore.getWebpackConfig();
