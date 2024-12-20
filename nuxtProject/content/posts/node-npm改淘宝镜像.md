---
title: npm 改淘宝镜像
date: 2023-05-15 14:29:26
cover: https://cdn.wdtwo.com/anzhiyu/npm8038603456.webp
category: [前端]
tags: [node,npm]
draft: false
---
- npm 改淘宝镜像
- centos npm 安装淘宝镜像
<!--more-->

### npm 改淘宝镜像
```js
1. Npm默认资源路径为：
    `https://registry.npmjs.org`
2. 在cmd下执行如下命令：
    `npm config set registry=https://registry.npm.taobao.org/`
3. 可以查看是否修改成功
    `npm config get registry`
4. 也可以在执行npm install [name]时临时资源下载路径：
    `npm install [name] --registry https://registry.npm.taogao.org`
```
### centos npm 安装淘宝镜像
#### 用官方安装方式：
```js
`npm install -g cnpm --registry=https://registry.npm.taobao.org`
```
#### 另一种方法：
```js
1. 注册模块镜像
    `npm set registry https://registry.npm.taobao.org`
2. node-gyp 编译依赖的 node 源码镜像
    `npm set disturl https://npm.taobao.org/dist`
3. 清空缓存
    `npm cache clean`
```
