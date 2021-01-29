module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue3-todo/" : "/",
  pwa: {
    name: "To do",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "GenerateSW"
  }
};
