---
title: vue多入口配置
published: 2023-06-21 21:25:38
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 前端
tags: [vue]
draft: false
---

[原文](https://www.jianshu.com/p/05c1bc5074a9)

<!--more-->
```js
npm install -g @vue/cli
npm uninstall -g vue-cli
```
```js
//vue.config.js
module.exports = {
    pages: {
        console: {
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry: 'src/modules/console/console.js',
            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'public/console.html',
            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'console.html',
            // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
            // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'console page',
            // 包含的模块，可选项
            chunks: ['console']
        },
        // 只有entry属性时，直接用字符串表示模块入口
        client: 'src/modules/client/client.js'
    }
}

```
```js
//解决多入口文件tit无法修改问题
npm install vue-chat-title -S
```
```js
//创建模块，在src下创建目录modules，在modules下创建两个模块console和client；在public下添加模版console.html和clien.html。
./src/modules/client/client.js+router.js+Client.vue
./src/modules/console/console.js+router.js+Console.vue
```
```js
//./console/router.js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    { path: '/', name: 'login', component: r => { require(['./login/Login'], r) }, meta: { title: 'console 登录' }}
]

export default new VueRouter({
    routes: routes
})
```
```js
//./console/console.js
import Vue from 'vue'
import Console from './Console.vue'
import router from './router'
Vue.use(require('vue-wechat-title'))
new Vue({
    router,
    render: h => h(Console)
}).$mount('#console') //console.html  => id='console'
```
```vue
//./console/Console.vue
<template>
    <div id="console" v-wechat-title="$route.meta.title">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: "console"
    }
</script>
<style scoped></style>
```
