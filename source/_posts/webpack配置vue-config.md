---
title: webpack配置vue.config
date: 2023-06-21 21:27:22
cover: https://cdn.wdtwo.com/anzhiyu/webpack903634.jpg
categories:
- 前端
tags:
- js
- webpack
---

[官网]('https://vuex.vuejs.org/zh-cn/')
<!--more-->

## 开发环境配置
```js
var baseURL
if (process.env.NODE_ENV == 'development') {
  //开发环境
    baseURL = '/api';
} else {
    baseURL = '/'
}
axios.defaults.baseURL = baseURL
```

## vue.config.js
``` js
module.exports = {
  //publicPath: './',//基本路径 
  outputDir: 'dist',   //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  //indexPath: '/',//页面路径
  filenameHashing:false,//去掉hash版本号
  productionSourceMap: false, // 阻止map文件生成
  lintOnSave: false, //是否开启eslint 代码检查工具
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",//本地地址
    port: '8080',//本地端口
    https: false,  //是否使用https协议
    hotOnly: false, //是否开启热更新
    proxy: {
    //main.js
    //Vue.config.productionTip = false
    //Vue.prototype.axios = axios
    //axios.defaults.baseURL = '/api'
      '/api': {
        target: 'https://api.wdtwo.com/', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更换origin 是否开启跨域
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': '/'   // 这种接口配置出来     http://XX.XX.XX.XX:8083/api/login
          //'^/api': '/api' 这种接口配置出来     http://XX.XX.XX.XX:8083/login
        }
      }
    },
  },
  css: {
      // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
      extract: true,
      // 是否开启 CSS source map
      //sourceMap: false
  },
}
```
