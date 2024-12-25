---
title: vue.config配置
published: 2023-11-13 08:46:29
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 前端
tags: [vue]
draft: false
---
[官网]('https://vuex.vuejs.org/zh-cn/')

## 开发环境配置判断
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
```js
// TerserPlugin 是一个用于优化和缩小 JavaScript 的 Webpack 插件。它利用 Terser 这个 JavaScript 压缩工具来减小你的 JavaScript 文件的体积，从而提高加载速度和性能。
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    //webpack配置
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境配置
            return {
                //文件限制最大4MB
                performance: {
                    maxEntrypointSize: 4000000,
                    maxAssetSize: 4000000
                },
                // 禁止console
                optimization: {
                    minimizer: [
                        new TerserPlugin({
                            terserOptions: {
                                compress: {
                                  // drop_console: true,
                                }
                            }
                        })
                    ]
                }
            }
        } else {
            // 为开发环境修改配置
            return {
                //文件限制最大4MB
                performance: {
                    maxEntrypointSize: 4000000,
                    maxAssetSize: 4000000
                },
            }
        }
    },
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        extract: true,
        // 是否开启 CSS source map
        sourceMap: false
    },
    assetsDir: 'assets',                   //静态资源目录（js, css, img）
    outputDir: '../plushtml/index',        //build输出目录
    publicPath: 'template/plushtml/index', //基本路径 
    indexPath: '../index/index.html',
    productionSourceMap: false,            // 阻止map文件生成
    filenameHashing:false,                 //去掉hash版本号
    lintOnSave: false,                     //是否开启eslint 代码检查工具
    devServer: {
        open: true,          //是否自动弹出浏览器页面
        host: "localhost",   //本地地址
        port: '8080',        //本地端口
        https: false,        //是否使用https协议
        hotOnly: false,      //是否开启热更新
        proxy: {             // 可以配置多个代理
            '/api': {
                target: 'https://api.wdtwo.com/', //API服务器的地址
                ws: true,                         //代理websockets
                changeOrigin: true,               // 虚拟的站点需要更换origin 是否开启跨域
                pathRewrite: {                    //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': '/'                    // 这种接口配置出来     http://XX.XX.XX.XX:8083/api/login
                    //'^/api': '/api'                  这种接口配置出来     http://XX.XX.XX.XX:8083/login
                }
            }
        },
    },
}
```

## main.js
```js
Vue.config.productionTip = false // 关闭 Vue.js 在生产环境中的提示信息
Vue.prototype.axios = axios      // 配置全局axios
axios.defaults.baseURL = '/api'  // 配置接口地址
```
## 全局使用axios
```js
this.axios.get('/api/xxx').then(res => {})
```

## 其他配置
```js
// 这表示发送的请求主体是 JSON 格式，并且使用 UTF-8 编码
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 表示请求可以包含凭证信息（如 cookies 和 HTTP 认证信息）
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true;
// 指定在预检请求（OPTIONS 请求）成功之后，结果可以被缓存的最大时间（以秒为单位）
axios.defaults.headers.post['Access-Control-Max-Age'] = 10;
```