---
title: vue-router路由守卫
published: 2024-06-05
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 前端
tags: [vue,vue-router,js]
draft: false
---
## 路由守卫
```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', component: Home },
  // 添加meta属性，requiresAuth为true的路由需要认证
  { path: '/about', component: About, meta: { requiresAuth: true }},
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 这里应该是你的认证逻辑
    const isAuthenticated = false 
    if (isAuthenticated) {
      next()
    } else {
      // 如果认证失败，跳转到登录页
      next('/login')
    }
  } else {
    // 如果没有meta.requiresAuth，则直接放行
    next()
  }
})
// // 全局后置守卫
// router.afterEach((to, from) => {
//   console.log(`导航到 ${to.path} 完成`)
// })
export default router
```

## 身份验证逻辑

1. 基于令牌的认证（Token-based Authentication）：
  - 使用 JWT（JSON Web Tokens）
  - 使用 OAuth 2.0
  - 使用 API 密钥
2. 基于会话的认证（Session-based Authentication）：
  - 使用传统的服务器端会话管理
  - 使用 Cookie 进行会话管理
3. 第三方认证服务（Third-party Authentication Services）：
  - 使用 OAuth 提供商（如 Google, Facebook, GitHub 等）
  - 使用身份验证即服务（如 Auth0, Firebase Authentication 等）


### 使用 JWT（JSON Web Tokens）
JWT 是一种非常流行的基于令牌的认证方式。客户端在登录时获取一个令牌，并在后续的请求中将令牌发送给服务器进行验证。
`在登录时，获取 JWT 令牌`
```js
async function login(username, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  const data = await response.json()
  if (response.ok) {
    localStorage.setItem('token', data.token) // 保存令牌
    return true
  } else {
    throw new Error(data.message)
  }
}
```
`路由验证`
```js
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
```
### 使用cookie进行会话管理
`在登录时，服务器会设置一个会话 Cookie`
```js
async function login(username, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include' // 确保请求中包含 Cookie
  })
  if (response.ok) {
    return true
  } else {
    const data = await response.json()
    throw new Error(data.message)
  }
}
```
`路由验证`
```js
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const response = await fetch('/api/check-session', {
      method: 'GET',
      credentials: 'include'
    })
    if (response.ok) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
```
### 第三方认证服务
使用 Auth0
Auth0 是一个身份验证即服务的平台，提供简单的 API 来实现用户认证。
```js
import createAuth0Client from '@auth0/auth0-spa-js'
let auth0 = null
async function initAuth0() {
  auth0 = await createAuth0Client({
    domain: 'YOUR_AUTH0_DOMAIN',
    client_id: 'YOUR_AUTH0_CLIENT_ID'
  })
}
async function login() {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  })
}
async function handleRedirectCallback() {
  await auth0.handleRedirectCallback()
  const user = await auth0.getUser()
  localStorage.setItem('user', JSON.stringify(user))
}
async function isAuthenticated() {
  return await auth0.isAuthenticated()
}
```
`路由验证`
```js
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await auth0.isAuthenticated()
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```
