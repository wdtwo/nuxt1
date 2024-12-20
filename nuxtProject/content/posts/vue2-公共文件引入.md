---
title: vue公共文件引入
published: 2023-06-21 21:23:28
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 前端
tags: [vue]
draft: false
---
vue公共文件引入
<!--more-->
## 公共文件引入
*对于项目中会公共使用到的头部 尾部等文件可以统一在App.vue文件中引入*
```html
<template>
    <div id='app'>
        <tabBar></tabBar>
        <router-view></router-view>
    </div>
</template>
<script>
import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
vue.use(Mint)

import font from './assets/font/iconfont.css'
import tabBar from './compents/footer'
export default {
    name : 'app',
    data (){
        return {
            msg : 'hello world'
        }
    }
    components : {
        tabBar
    }
}
</script>
```
