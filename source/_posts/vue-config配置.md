---
title: vue.config配置
date: 2023-11-13 08:46:29
cover: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
categories:
- 前端
tags:
- js
- vue
---

```js
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
  outputDir: '../plushtml/index',
  publicPath: 'template/plushtml/index',
  indexPath: '../index/index.html',
  productionSourceMap: false, // 阻止map文件生成
}

```