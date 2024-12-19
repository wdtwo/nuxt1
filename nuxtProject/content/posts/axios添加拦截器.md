---
title: axios添加拦截器
date: 2024-07-11
description: ''
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
tags: [axios]
category: [前端]
draft: false 
---


## 添加拦截器
```js
import axios from 'axios'
// 设置axios拦截器  
axios.interceptors.response.use(  
  response => response, // 如果响应状态码在2xx范围内，则直接返回响应  
  error => {  
    // 如果401则跳转到错误页
    if (error.response && error.response.status === 401) {  
        window.location.href = `${window.location.origin}/#/error`
    }  
    // 对于其他错误，返回Promise.reject()以便调用者可以处理错误  
    return Promise.reject(error);  
  }  
);

```
## 设置请求头
```js
// 请求类型
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.timeout = 1000000000 // 超时时间
// axios.defaults.withCredentials = true; // 允许携带cookie

// 请求头携带token
let obj = {
  token      : localStorage.getItem('token'),
  loginid    : localStorage.getItem('loginid'),
  flag       : localStorage.getItem('flag')
}
axios.defaults.headers.common['Authorization'] = JSON.stringify(obj)
```