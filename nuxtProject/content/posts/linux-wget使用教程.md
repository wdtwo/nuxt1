---
title: wget使用教程
published: 2023-05-15 14:29:26
image: https://cdn.wdtwo.com/anzhiyu/nimg.ws.126.jpg
category: 后端
tags: [linux]
draft: false
---
### wget使用教程
<!--more-->

`wget是一个从网络上自动下载文件的自由工具，支持通过HTTP、HTTPS、FTP三个最常见的TCP/IP协议下载，并可以使用HTTP代理。wget名称的由来是“World Wide Web”与“get”的结合。`
```js
    //demo1 下载单个文件
    wget http://cachefly.cachefly.net/100mb.test
    //重命名下载
    wget -O 138vps.test http://cachefly.cachefly.net/100mb.test
    //限速下载
    wget --limit-rate=300k http://cachefly.cachefly.net/100mb.test
    //断点续传
    wget -c http://cachefly.cachefly.net/100mb.test
    //后台下载
    wget -b http://cachefly.cachefly.net/100mb.test
    //查看后台进度
    tail -f wget-log
    //伪装浏览器下载
    wget --user-agent="Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16" http://cachefly.cachefly.net/100mb.test
    //同时下载多个文件 放在一个文档里
    wget -i 138vps.txt
    //下载ftp 匿名
    wget ftpurl
    //用户名密码
    wget --ftp-user=USERNAME --ftp-password=PASSWORD ftpurl
    //镜像网站
    wget --mirror -p --convert-links -P ./ http://soft.138vps.com
    //如果你只想下载图片
    wget -r -A.jpg,.png,.gif http://soft.138vps.com
    //如果你只不想下载图片
    wget --reject=jpg http://soft.138vps.com
    //wget下载有的资源时必须用选项 --no-check-certificate，否则会提示没有认证不允许下载。比如https
    wget --no-check-certificate url
```
