---
title: vue打包配置
date: 2024-12-20
cover: https://cdn.wdtwo.com/anzhiyu/lianjie038036.jpg
category: [其他]
tags: [AI,chatgpt]
draft: false
---

```js
module.exports = {
  publicPath: "./", // 部署应⽤包时的基本 URL
  outputDir: "dist", // npm run build ⽣成的⽂件夹，默认是dist
  assetsDir: "static", // 在kaixin⽂件夹下⾯⽣成static⽬录存放js,img,css等静态资源
  indexPath: "index.html", // ⽣成的单⽂件的，⽂件名，
  filenameHashing: true, // 文件名哈希（默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希）
  pages: {
    index: {
      // page 的入口文件
      entry: 'src/index/main.js',
      // 模板文件
      template: 'public/index.html',
      // 在 dist/index.html 的输入文件
      filename: 'index.html',
      // 当使用页面 title 选项时，
      // template 中的 title 标签需要的是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vandor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板文件默认是 'public/subpage.html'
    // 如果不存在，就回退到 'public/index.html'
    // 输出文件默认是 'subpage.html'
    subpage: 'src/subpage/main.js'
  },
  // 是否在保存的时候使用'eslint-loaer'进行检查。
  lintOnSave: true,
  // 是否使用带有浏览器内编译器的完整构建版本
  runtimeCompiler: false,
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
  integrity: true,
  // 配置跨域服务代理
  devServer: {
    host: "127.0.0.1", // 配置主机地址
    port: process.env.NODE_ENV == 'production' ? 3000 : 8888, // 配置运⾏的端⼝
    // proxy: "接⼝地址",  跨域代理！ 【重要！】
    proxy: { // 配置多个！
      // '/api': {
      //   target: 'http://localhost:3030/api',
      //   ws: true, // 跨域地址是https协议！
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": ""   // 将 '/api' 替换成 ''  
      //   }
      // }
    },
  },
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // Css-loader 时，使用 `{ Css: { ... } }`。
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },
}
```