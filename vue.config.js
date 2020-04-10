module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_mixins.scss"; @import "@/assets/scss/_variables.scss";`
      }
    }
  }
};
