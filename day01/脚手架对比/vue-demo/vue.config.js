// const { defineConfig } = require('@vue/cli-service');
// module.exports = defineConfig({
//   transpileDependencies: true,
// });
module.exports = {
  chainWebpack:config =>{
    config.module
        .rule('vue')
        .use('vue-loader')
          .tap(options=>{
            return options
          })
  }
}