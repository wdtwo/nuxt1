---
title: nuxt3搭建
date: 2024-06-26
description: ''
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
- vue
- nuxt
---

## 安装
```bash
npx nuxi@latest init project-demo1
```
## 开发模式运行
```bash
npm run dev -- -o
```
## nuxt.config.ts配置
`nuxt.config.ts`用于配置`Nuxt.js`应用的各种选项和参数。
以下是关于`nuxt.config.ts`的作用的详细解释：
1. 全局配置管理：
    - `nuxt.config.ts`允许你定义和管理`Nuxt.js`应用的全局配置。
    - 你可以在这个文件中设置应用的`路由`、`构建选项`、`CSS预处理`、`模块和插件`、`钩子`、`服务器端渲染配置`等等。
2. 环境变量管理：
    - `Nuxt`环境变量是在`nuxt.config.ts`文件中定义的全局变量，用于在应用程序中访问和使用不同环境下的配置信息。
    - 你可以通过`env`属性在`nuxt.config.ts`中定义环境变量，并在应用程序的代码中通过`process.env`对象来访问和使用这些环境变量。
    - 这使得你可以根据不同的环境（如开发、测试、生产）配置不同的变量值，提高开发效率和灵活性。
3. 配置文件扩展性：
    - `nuxt.config.ts`文件可以覆盖或扩展默认配置，以满足特定应用的需求。
    - 你可以通过定义自己的配置项或修改默认配置项来实现这一点。
4. 构建和优化选项：
    - 在`nuxt.config.ts`中，你可以设置应用的构建和优化选项，如CSS预处理器、资源别名、代码拆分等。
    - 这有助于提升应用的性能和加载速度。
5. 模块化配置：
    - `Nuxt.js`支持模块化和插件化，你可以在`nuxt.config.ts`中注册和使用`Nuxt.js`的官方模块或第三方模块。
    - 通过模块，你可以轻松地为应用添加新的功能或扩展现有功能。
6. 灵活性和可扩展性：
    - `nuxt.config.ts`提供了丰富的配置项和选项，使得你可以根据自己的需求灵活配置`Nuxt.js`应用。
    - 同时，由于`Nuxt.js`的模块化设计，你可以通过编写自己的模块或插件来扩展应用的功能。
7. 配置代码组织和类型安全：
    - 使用`TypeScript（.ts扩展名）`编写`nuxt.config.ts`可以提供类型安全和更好的代码组织。
    - 这有助于减少错误并提高代码的可读性和可维护性。
`nuxt.config.ts`是`Nuxt.js`应用中不可或缺的配置文件，它允许你全局管理应用的配置、环境变量、构建选项等，并提供了丰富的配置选项和模块化设计，使得你可以根据自己的需求灵活配置和管理`Nuxt.js`应用。
```ts
export default defineNuxtConfig({
  runtimeConfig: {
    // 仅在服务器端可用的私钥
    apiSecret: '123',
    // public中的密钥也在客户端公开
    public: {
      apiBase: '/api'
    }
  }
})

```
在vue文件中通过runtimeConfig获取配置
```js
    const runtimeConfig = useRuntimeConfig()
    console.log(runtimeConfig)
```
## app.config.ts

```ts
export default defineAppConfig({
    title: 'Hello Nuxt6666',
    theme: {
        dark: true,
        colors: {
            primary: '#ff0000'
        }
    }
})
```
在vue文件中通过runtimeConfig获取配置
```js
    const appConfig = useAppConfig()
    console.log(appConfig)
```