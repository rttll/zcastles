module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Z Castles'
      return args
    })
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_mixins.scss"; @import "@/assets/scss/_variables.scss";`
      }
    }
  }
};
