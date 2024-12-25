---
title: vue-api.js外部调用ajax请求
date: 2023-06-21 21:45:20
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 
- 前端
tags: 
- vue
---
api.js配置
<!--more-->

## main.js
``` js
import api from  '@/plugins/api'
Vue.prototype.api = api
```
## Home.vue
```js
this.api.getDatas('/datas/get').then(res=>{
	console.log(res)
})
this.api.postDatas('/datas/post').then(res=>{
	console.log(res)
})
```
## api.js
```js
import axios from 'axios'

var baseURL
if (process.env.NODE_ENV == 'development') {
  //开发环境
    baseURL = '/api';
} else {
    baseURL = '/'
}
axios.defaults.baseURL = baseURL

//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//超时时间 毫秒
axios.defaults.timeout = 5000
//拦截器 拦截请求前和请求后，then,catch处理之前，对数据进行处理
// axios.interceptors.request.use(
//   res=>{
//     console.log('request','success')
//   },
//   err=>{
//     console.log('request','err')
//   }
// )
// axios.interceptors.response.use(
//   res=>{
//     console.log('response','success')
//   },
//   err=>{
//     console.log('response','err')
//   }
// )

function get(url){
  return new Promise((reslove,reject)=>{
    axios.get(url).then(res=>{
      if(res.status == 200){
        reslove(res.data)
      }else{
        reject(res)
      }
    })
  })
}
function post(url,params){
  //console.log(url,params)
  return new Promise((reslove,reject)=>{
    axios.post(url,params).then(res=>{
      if(res.status == 200){
        reslove(res.data)
      }else{
        reject(res)
      }
    })
  })
}

export default {
  getDatas:url=>get(url),
  postDatas:(url,params={})=>post(url,params),

  demo(url,params={}){
    return new Promise((reslove,reject)=>{
        setTimeout(() => {
            reslove('666')
        }, 3000);
    })
  }
}
```
