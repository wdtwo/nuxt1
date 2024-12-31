---
title: java若依框架前端配置
layout: post
date: 2024-12-30 10:51:14
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
- vue
---

## vite.config.js配置
```js
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    // base: VITE_APP_ENV === 'production' ? '/' : '/',
    
    // 构建时输出目录 前端访问路由地址
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    build: {
      outDir: '../ruoyi-ui-template', // 构建时输出目录
      assetsDir: 'static', // 放置生成的静态资源的目录
    },
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // vite 相关配置
    server: {
      port: 8321,
      host: true,
      open: true,
      cors: false,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        }
      }
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  }
})
```

## 静态路由配置

在`系统管理`->`菜单管理`中新增菜单.配置`路由地址`,路由地址为访问地址,配置`组件地址`,组件地址为组件路径.
配置好后不需要在项目的`router`中配置,直接访问路由地址即可.

- 目录为默认显示
- 菜单可以控制权限显示
- 按钮可以控制权限显示

创建好菜单后,在`角色管理`->`角色编辑`中配置菜单权限.





