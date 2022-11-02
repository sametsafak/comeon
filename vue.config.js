const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    // set this true to test facebook sdk or something else that requires https enabled in localhost server
    https: false,
  },
  transpileDependencies: true,
  // https://cli.vuejs.org/config/#lintonsave
  lintOnSave: 'warning',
  // use this option for production linking
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue/demo/4.0/' : '/',
  publicPath: '/',
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  ...(process.env.NODE_ENV !== 'production' && { css: { sourceMap: true } }),
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
      symlinks: false,
    },
    // if environment is production, do not create source-maps (they will be created in experimental env)
    ...(process.env.NODE_ENV !== 'production' && { devtool: 'source-map' }),
  },
})
