---
title: vue安装依赖提示证书过期
date: 2024-03-09 19:28:39
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 
- 前端
tags: 
- vue
---

这个问题提示是证书过期导致的。
可以尝试禁用SSL证书验证。

```bash
yarn config set strict-ssl false
```
SSL证书验证
安装依赖时，使用npm或者yarn等包管理器从远程仓库下载包，这些操作通常是通过HTTPS协议进行的，而HTTPS协议是基于SSL/TLS协议的。在这个过程中，您的计算机（客户端）会与远程服务器进行安全通信，这时就需要进行SSL证书验证。
Error: Node Sass does not yet support your current environment: Windows 64-bit w ith Unsupported runtime (93) For more information on which environments are supported please see: https://github.com/sass/node-sass/releases/tag/v4.14.1
这个错误表明Node Sass不支持您当前的环境：Windows 64位，运行时版本为93。
可以调整一下node使用的版本。