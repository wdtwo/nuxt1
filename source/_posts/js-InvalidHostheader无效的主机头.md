---
title: Invalid Host header无效的主机头
date: 2024-03-07 08:36:34
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 
- 前端
tags: 
- js
---

### 报错现象
在yarn serve 项目启动成功，但是页面显示Invalid Host header

### 二、报错原因分析
新版的`webpack-dev-server`出于安全考虑会默认检查`hostname`，用于防止不受信任的主机访问`DevServer`，当浏览器发出请求时，它会会检查请求中的主机头，若`hostname` 没有配置在内，则中断访问。

### 四、解决方案
#### allowedHosts
设置`allowedHosts`，这个选项是设置允许访问开发服务器的主机列表。将其设置为 `all` 表示允许任何主机访问开发服务器。这个选项与主机检查相关，但它更精确地控制哪些主机可以访问开发服务器，而不是完全禁用主机检查。也可以设置多个主机。具体查看官方文档allowedHosts官方介绍

设置所有主机列表
```js
allowedHosts: "all"
```
设置部分主机列表
```js
allowedHosts: ['xxx.com','xxx.com']
```
具体解决如下：
```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost', 
    port: 8089,
    historyApiFallback: true,
    allowedHosts: "all"
  }
})
```
#### disableHostCheck
在vue-cli版本为2.x的情况下该设置生效，`disableHostCheck`允许在开发服务器中禁用主机检查。默认情况下，`Webpack DevServer`会检查请求的主机是否与配置中的主机匹配，以增加安全性。如果配置中没有明确指定主机（host），`Webpack DevServer`将只允许本地主机访问，以防止潜在的安全风险。通过将 `disableHostCheck` 设置为 true，可以允许来自其他主机的请求，但这可能会增加潜在的安全风险，因此谨慎使用。
```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  disableHostCheck:true,
  devServer: {
    host: 'localhost', 
    port: 8089
  }
})
```
#### 如果vue-cli版本为3.x使用的时候会报下面的错误：
```bash
ValidationError: Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
- options has an unknown property 'disableHostCheck'. These properties are valid:
object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, magicHtml?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, server?, setupExitSignals?, setupMiddlewares?, static?, watchFiles?, webSocketServer? }
```
### 五、拓展
#### historyApiFallback
上面代码其中`historyApiFallback`用于在使用 `Vue Router` 或类似的前端路由库时，处理路由切换时的页面刷新问题。当你使用浏览器的前进和后退按钮或手动输入URL时，`Vue Router`或其他路由库会在前端进行路由切换，但如果没有合适的配置，刷新页面时会导致404错误。
```js
historyApiFallback:true
```
#### transpileDependencies
`transpileDependencies`用于配置需要通过 `Babel` 转译的依赖模块。默认情况下（false），`Vue CLI` 和 `Babel` 只会转译应用程序代码，而不会转译依赖模块（node_modules）中的代码。但有些依赖模块可能包含 ES6+ 语法，如果你需要转译这些依赖模块，可以使用 `transpileDependencies` 进行配置。但是`transpileDependencies: true` 只会广度遍历编译三方依赖，对于依赖的依赖则不会处理。
```js
transpileDependencies:true
transpileDependencies:['xxxx']//制定特定的依赖进行转译
```
#### lintOnSave
`lintOnSave` 用于控制在开发和保存文件时是否执行 `ESLint` 静态代码检查。`ESLint` 可以帮助你捕获潜在的代码问题和风格违规。

如果将 `lintOnSave` 设置为 `true`，则在保存文件时，`Vue CLI` 会自动运行 `ESLint` 检查，如果发现问题，将会在开发过程中报告错误和警告。
如果将 `lintOnSave` 设置为 `false`，则禁用了自动的 `ESLint` 检查，你需要手动运行检查。