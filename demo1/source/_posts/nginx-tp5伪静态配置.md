---
title: nginx-tp5伪静态配置
date: 2023-06-20 14:03:34
image: https://cdn.wdtwo.com/anzhiyu/big_92974_18.png
category: 
- 后端
tags: 
- nginx
---
tp5伪静态配置
```bash
if (!-e $request_filename){
    rewrite ^(.*)$ /index.php?s=$1 last;
    break;
}
```