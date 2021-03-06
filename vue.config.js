module.exports = {
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    }
  },
  publicPath: "/",
  outputDir: "dist",
  pwa: {
    iconPaths: {
      favicon64: "favicon.ico",
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  runtimeCompiler: true,
  devServer: {
      open: true,
      host: 'localhost',
      port: '8081',
      proxy: {
          '/api': {
              target: 'http://localhost:8010/api/auth', // 要请求的地址
              ws: true,
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  }
};
