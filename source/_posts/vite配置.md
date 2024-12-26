---
title: vite配置
date: 2024-06-14
description: ''
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 
- 前端
tags: 
- vue
---

## vite配置
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  // 插件配置
  plugins: [
    vue() // 使用 Vue 插件，支持 Vue 单文件组件
  ],
  // 模块解析配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 设置 '@' 为 'src' 目录的别名
    }
  },
  // 开发服务器配置
  server: {
    port: 3000, // 开发服务器端口号
    open: true, // 启动时自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 代理 API 请求到本地的 5000 端口
        changeOrigin: true, // 允许跨域
        rewrite: path => path.replace(/^\/api/, '') // 重写路径，去掉 '/api' 前缀
      }
    },
    hmr: {
      overlay: false // 禁用热模块替换时的错误遮罩
    }
  },
  // 构建配置
  build: {
    outDir: 'dist', // 打包输出目录
    sourcemap: true, // 是否生成 source map 文件
    target: 'es2015', // 浏览器兼容性目标
    minify: 'terser', // 使用 terser 进行代码压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console 语句
        drop_debugger: true // 移除 debugger 语句
      }
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // 主入口文件
        admin: path.resolve(__dirname, 'admin/index.html') // 管理后台入口文件
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
            // 将 node_modules 中的模块单独打包
          }
        }
      }
    }
  },
  // CSS 预处理器配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
        // 在所有 SCSS 文件中自动导入变量文件
      }
    }
  }
})

```

## 配置说明

1. 插件配置:
    - plugins: 使用 Vue 插件来支持 Vue 单文件组件的开发。
2. 模块解析配置:
    - resolve.alias: 设置路径别名，方便模块导入。
3. 开发服务器配置:
    - server.port: 设置开发服务器的端口号。
    - server.open: 启动开发服务器时自动打开默认浏览器。
    - server.proxy: 配置 API 请求代理，将 /api 前缀的请求代理到本地的 5000 端口。
    - server.hmr.overlay: 禁用热模块替换（HMR）时的错误遮罩。
4. 构建配置:
    - build.outDir: 设置打包输出目录。
    - build.sourcemap: 是否生成 source map 文件，便于调试。
    - build.target: 设置浏览器兼容性目标为 ES2015。
    - build.minify: 使用 terser 进行代码压缩。
    - build.terserOptions: 配置 terser 压缩选项，移除 console 和 debugger 语句。
    - build.rollupOptions: 配置 Rollup 打包选项，支持多页面应用和手动分块。
4. CSS 预处理器配置:
    - css.preprocessorOptions: 配置 SCSS 预处理选项，在所有 SCSS 文件中自动导入变量文件。

> 通过这些配置，你可以快速搭建一个功能完善的 Vite 项目，并根据需求进行自定义调整。