---
title: nodejs安装
published: 2023-05-15 14:29:26
image: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
category: 后端
tags: [linux,node]
draft: false
---
- centos7用yum安装node.js
- 更新node.js各版本yum源
- node.js版本管理器
- 卸载
<!--more-->
### centos7用yum安装node.js
[原文](https://blog.csdn.net/linzengfa/article/details/72850755)
#### 更新node.js各版本yum源
```js
1. Node.js v8.x安装命令
    `#curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -`
2. Node.js v7.x安装命令
    `#curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -`
3. Node.js v6.x安装命令
    `#curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -`
4. Node.js v5.x安装命令
    `#curl --silent --location https://rpm.nodesource.com/setup_5.x | bash -`
5. yum安装node.js
    `yum install -y nodejs`
6. 查看node.js版本
    `node -v`
```
#### node.js版本管理器
```js
1. 安装指定版本
    `n <version>`
2. 安装最新版本
    `n latest`
3. 安装稳定版本
    `n stable`
4. 删除某个版本
    `n rm <version>`
5. 查看所有版本
    `n list`
```
#### 卸载
```js
`yum remove nodejs npm -y`
```