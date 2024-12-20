---
title: vue-router
date: 2023-06-21 21:37:00
cover: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: [前端]
tags: [vue]
draft: false
---
[官网]('https://router.vuejs.org/zh/guide/#html')  
<!--more-->
`npm install vue-router --save`  
`npm install vue-loader --save`  
`npm run dev`  
`npm run serve`  
`yarn run serve`  

## demo
```js
//main.js
import Vue from 'vue'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```
```html
<router-link to='/foo'>go to foo</router-link>
<router-link to='/bar'>go to bar</router-link>
<router-link :to="{'name':'About'}">about</router-link>
<router-view></router-view>
```
```js
//router.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
Vue.use(Router)
export default new Router({
    mode : 'history',
    base: process.env.BASE_URL,
    routes : [
        {
            path : '/',
            name : 'home',
            component : Home
        },
        {
            path : '/index',
            name : 'index',
            component : Index
        },
        {
            path : '/about',
            name : 'about',
            component : () => import('./views/About.vue')
            //打包以后会按需加载
        },
        {
            path : '/login',
            name : 'login',
            component : Login
        },
    ]
})
```
### 模板内容
```html
<script>
export default({
    computed : {
        username(){
            return this.$router.params.username
        }
    },
    methods : {
        goBack(){
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    }
})
</script>
```
### 嵌套路由
```js
export default new router({
    routes : [
        {
            path : '/',
            name : 'index',
            component : Index,//component: ()=> import('./views/index.vue')
            meta : {title:'内部资料',keyword:'首页',description:'data'},
            children:[{
                path : 'second',
                name : 'second',
                component : second,
                meta : {title:'内部资料1',keyword:'首页1',description:'data1'}
            }]
        },
    ]
})
```
### 动态路由
```js
export default new router({
    routes : [
        {
            path : '/about/:id',
            name : 'about',
            component : About
        },
    ]
})
```
### 路由全路径检测
```js
//main.js
//登陆验证
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin)){  // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('loginInfo')) {  // 判断当前用户的登录信息loginInfo是否存在
      next();
    } else {
      next({
        path: '/login'
      })
    }
  }else {
    next();
  }
})
//登陆验证结束
```
### 跨域设置
`config>index.js>dev:{}`
```js
将target设置为我们需要访问的域名，然后在main.js中设置全局属性：Vue.prototype.HOST = '/api'
至此，我们就可以在全局使用这个域名了，如下：
var url = this.HOST + '/movie/in_theaters'

this.$http.get(url).then(res => {
    this.movieList = res.data.subjects;
},res => {
    console.info('调用失败');
});
```
### 路由懒加载
```js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: loadView('Home')
    },
    {
      path: '/about',
      name: 'about',
      component: loadView('About')
    }
  ]
})
```
### 去掉#号
```js
const router = new VueRouter({
  mode: '',//history
  base: process.env.BASE_URL,
  routes
})
```
