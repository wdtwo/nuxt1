---
title: linux工具箱
date: 2023-05-15 14:29:26
image: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
category: 
- 前端
tags: 
- linux
---
- 多合一脚本
- IO测试+测速
- 回程路由脚本一
- 回程路由脚本二
- 流媒体解锁查看
- BBR
<!--more-->
### 宝塔

https://www.bilibili.com/read/cv13681960

1. 多合一脚本
```
wget -O box.sh https://raw.githubusercontent.com/BlueSkyXN/SKY-BOX/main/box.sh && chmod +x box.sh && clear && ./box.sh
```
IO测试+测速
`wget -qO- https://raw.githubusercontent.com/oooldking/script/master/superbench.sh | bash`

回程路由脚本一
`wget -qO- git.io/besttrace | bash`

回程路由脚本二
`curl https://raw.githubusercontent.com/zhucaidan/mtr_trace/main/mtr_trace.sh|bash`

流媒体解锁查看
`bash -c "$(curl -L mcnb.top/netflix.sh)"`

BBR
`wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh" && chmod +x tcp.sh && ./tcp.sh`


#### 上传本地文件到Linux服务器
```js
yum install lrzsz
rz
```
#### 设置防火墙自启动
https://blog.csdn.net/qq_38025219/article/details/95879632
```js
systemctl enable firewalld
```
#### 设置时区
```js
timedatectl set-timezone "Asia/Shanghai"
ipconfig /flushdns
```

#### 生成测速文件
```js
dd if=/dev/zero of=100mb.bin bs=100M count=1
```
