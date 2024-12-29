---
title: nginx路由配置
date: 2023-02-10 22:30:54
tags:
- nginx
---

## x-ui安装地址
```bash
bash <(curl -Ls https://raw.githubusercontent.com/vaxilu/x-ui/master/install.sh)
```


```nginx
 location /abc
{
    proxy_pass http://127.0.0.1:37554;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $http_host;
    proxy_read_timeout 300s;
}
```









