const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // config.module.rule('js').exclude.add(/\.worker\.js$/)
    // https://stackoverflow.com/questions/52086438/cant-use-worker-loader-with-vuejs-and-webpack
    // https://github.com/dynamind/minimal-vue-worker
    config.module
      .rule('worker-loader')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end()
  }
})
