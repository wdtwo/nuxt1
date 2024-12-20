---
title: 小皮面板nginx配置
date: 2023-06-07 08:56:23
cover: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
category: [后端]
tags: [linux]
draft: false
---


# 伪静态

配置以后首页无法访问 子页面可以访问
```bash
location / {
    index  index.html index.htm;
    #autoindex  on;
    # 添加下面代码 开启nginx的重写模块
    if (!-e $request_filename) {
        rewrite  ^(.*)$  /index.php?s=/$1  last;
        break;
    }
    # 添加代码截止
}
```