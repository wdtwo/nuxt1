---
title: vue登录状态判断
date: 2023-05-05 09:41:45
cover: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
categories:
- 前端
tags:
- vue
---

vue登录状态判断
<!--more-->

vue-router
```js
 meta:{
    title:"文档",
    requireAuth:true //是否需要判断
},

router.beforeEach((to,from,next)=>{
    //修改页面title
    if(to.meta.title){
        document.title = to.meta.title
    }
    if(to.meta.requireAuth){//判断该路由是否需要登录权限
        if(store.state.token){//通过vuex的state获取当前的token是否存在
            next()
        }else{
            //如果没通过返回到登录页面
            next({
                path:"/",
            })
        }
    }else{
        next();
    }    
})
```
