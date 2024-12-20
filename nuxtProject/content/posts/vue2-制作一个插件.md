---
title: vue制作一个插件
date: 2024-05-16
description: ''
cover: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: [前端]
tags: [vue]
draft: false
---

## 创建一个插件文件
```js
import axios from 'axios';

const MyAxiosPlugin = {
  install(Vue) {
    // 设置 axios 的默认 baseURL
    axios.defaults.baseURL = '/api';
    // 添加实例方法
    Vue.prototype.$axios = axios;
  }
};
export default MyAxiosPlugin;
```
## 使用插件
```js
import MyAxiosPlugin from './plugins/axios';
Vue.use(MyAxiosPlugin);
```





