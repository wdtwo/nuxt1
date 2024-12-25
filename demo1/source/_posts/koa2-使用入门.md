---
title: koa2使用入门
published: 2023-06-21 22:22:13
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 前端
tags: [node,koa2]
draft: false
---
- 环境安装
- 使用
- 启动服务
- koa2+mysql搭建简易博客
- 目录结构
- 包说明
- default.js配置
<!--more-->
[原文](https://www.jianshu.com/p/244ca8bb5b89)
## 环境安装
```js
1. koa 安装
    `npm install -g koa`
2. koa-generator 安装
    `npm install -g koa-generator`
```
## 使用
```js
1. 下载项目
    `koa test && cd test && npm install`
    `koa2 test && cd test && npm install`
```
## 启动服务
```js
    `npm start`
```

## koa2+mysql搭建简易博客
[原文](https://blog.csdn.net/wclimb/article/details/77890793)
- nodejs v8.1.0
- koa v2.3.0
- mysql 5.7.0

```js
//创建数据库
`CREATE DATABASE nodesql;`
`SHOW DATABASE;`
USE nodesql;
SHOW tables;
```
## 目录结构
```js
- config 存放默认文件
- lib 存放操作数据库文件
- middlewares 存放判断登录与否文件
- public 存放样式和头像文件
- routes 存放路由文件
- views 存放模板文件
- index 程序主文件
- package.json 包括项目名、作者、依赖等等
```
```js
//新建项目
`mkdir koa2-blog`
`cd koa2-blog`
`npm init`
`npm i koa koa-bodyparser koa-mysql-session koa-router koa-session-minimal koa-static koa-views md5 moment mysql ejs markdown-it chai mocha koa-static-cache --save-dev`
```
## 包说明
```js
1. koa node框架
2. koa-bodyparser 表单解析中间件
3. koa-mysql-session、koa-session-minimal 处理数据库的中间件
4. koa-router 路由中间件
5. koa-static 静态资源加载中间件
6. ejs 模板引擎
7. md5 密码加密
8. moment 时间中间件
9. mysql 数据库
10. markdown-it markdown语法
11. koa-views 模板呈现中间件
12. chai mocha 测试使用
13. koa-static-cache 文件缓存
```
```js
//项目文件配置
config
    default.js
lib
    mysql.js
middlewares
    check.js
mode_modules
    --
public
    images
    index.css
routes
    posts.js
    signin.js
    signout.js
    signuo.js
test
    blog-test.js
views
    create.ejs
    edit.ejs
    footer.ejs
    header.ejs
    posts.ejs
    selfPosts.ejs
    signin.ejs
    signup.ejs
    sPost.js
index.js
package.json
```
`文件配置结束`
## default.js配置
```js
const config = {
    port:3000,
    database:{
        HOST:"66.98.112.130",
        PORT:3306,
        USERNAME:"nodesql",
        PASSWORD:"4DHdWeNLZRx8zniB",
        DATABASE:"nodesql"
    }
}
module.exports = config;
```
