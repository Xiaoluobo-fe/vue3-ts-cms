const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  },
  devServer: {
    proxy: {
      // 匹配所有以 /api 开头的请求
      '/api': {
        // 目标服务器地址（后端接口地址）
        target: 'http://api.hebdonghua.cn',
        // 开启代理，修改请求头中的host
        changeOrigin: true
        // 路径重写：如果后端接口没有 /api 前缀，就把 /api 去掉
        //   pathRewrite: {
        //     '^/api': ''
        //   }
        // }
      }
    }
  }
})
