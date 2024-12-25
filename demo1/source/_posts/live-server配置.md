---
title: live-server配置
published: 2023-06-08 11:39:00
image: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
category: 前端
tags: [测试环境]
draft: false
---

- 安装
- 配置代理

(github)[https://github.com/tapio/live-server]
<!--more-->

# 安装
```bash
npm install -g live-server
```

# 配置代理

直接命令行配置代理
```bash
live-server --proxy=/api:http://example.com:8000/api
```
配置多个代理
```bash
live-server --proxy=/api:http://example.com:8000/api,/images:http://example.com:8000/images
```

在项目根目录创建proxy.json文件(测试会报错)
```json
{
  "/api": {
    "target": "https://example.com",
    "changeOrigin": true
  }
}
```
执行命令行
```bash
live-server --proxy=/.proxy.json
```

# npm package.json配置代理
初始化项目
```bash
npm init
```
server未配置代理
proxy已配置代理
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "live-server --open=./index.html --port=8081",
	  "proxy": "live-server --open=./index.html --port=8081 --proxy=/Meeting:http://172.28.8.201:8081/Meeting"
},
```
运行
```bash
npm run server
npm run proxy
```
