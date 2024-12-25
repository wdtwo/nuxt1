---
title: nginx部署vue3静态项目
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
date: 2024-10-24
description: ''
tags: 
- js
- vue3
- nginx
category: 
- 前端
---

## 访问vue3路由地址报错404

需要在nginx的配置文件中添加以下代码：
```bash
location / {
    try_files $uri $uri/ /index.html;
}
```

try_files指令是Nginx中的一个非常有用的指令，它用于尝试按顺序提供文件，直到找到一个存在的文件为止。在这个例子中：
try_files指令后面的参数表示尝试文件的顺序：
1. $uri：这是请求中的URI，Nginx会首先尝试提供与请求URI直接对应的文件。例如，如果请求的是/example.jpg，Nginx会尝试提供服务器上位于该URI路径下的example.jpg文件。
2. $uri/：如果第一个参数$uri对应的文件不存在，Nginx会尝试将请求视为对目录的请求，并尝试提供该目录下的默认文件（这通常是通过index指令定义的，但在这里，try_files指令会先检查目录是否存在）。
3. /index.html：如果前面的尝试都失败了（即请求的文件或目录都不存在），Nginx会回退到提供根目录下的index.html文件。这通常用于单页应用（SPA）或前端路由的场景，其中所有未知路径的请求都应该回退到主index.html文件，由前端JavaScript代码处理路由。

总的来说，这段配置的目的是为了优雅地处理文件请求，确保即使请求的资源不存在，用户也能得到一个有效的响应（通常是前端应用的入口点）。


### 部署在一个域名的路由路径上 需要配置nginx
```bash
location /invoice {  
    root /www/wwwroot;  # 确保这是您的 Vue 应用构建输出的正确目录  
    try_files $uri $uri/ /invoice/index.html;  # 所有未找到的请求都将返回 index.html 
    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {  
    expires 30d;  
    add_header Cache-Control "public, no-transform";  
    }  
}
```
vite.config.ts
```js
bash:"/invoice"
```