---
title: nvm node版本管理
published: 2023-05-15 14:29:26
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 前端
tags: [npm,node]
draft: false
---
- nvm node版本管理
- 其他命令
<!--more-->

### nvm node版本管理
下载
`https://github.com/coreybutler/nvm-windows/releases`
```js
//测试
nvm -v
//列出安装版本
nvm ls
//安装最近版本
nvm install node
//列出所有可安装版本号
nvm list available
//安装指定版本号
nvm install 11.13.0
//使用特定版本
nvm use 11.13.0
//卸载相应版本
nvm uninstall 11.13.0
```

#### 其他命令
```c
nvm arch ：显示node是运行在32位还是64位。
nvm install <version> [arch] ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。
nvm list [available] ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
nvm on ：开启node.js版本管理。
nvm off ：关闭node.js版本管理。
nvm proxy [url] ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
nvm node_mirror [url] ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm npm_mirror [url] ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm uninstall <version> ：卸载指定版本node。
nvm use [version] [arch] ：使用制定版本node。可指定32/64位。
nvm root [path] ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
nvm version ：显示nvm版本。version可简化为v。
```
