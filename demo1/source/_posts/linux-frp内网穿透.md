---
title: linux-frp内网穿透
date: 2023-10-13 14:22:57
image: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
category: 
- 后端
tags: 
- linux
---

## 软件包下载

[github项目地址](https://github.com/fatedier/frp)

[windows客户端](https://cdn.wdtwo.com/download/frp/frp_0.42.0_windows_amd64.zip)
[linux服务端](https://cdn.wdtwo.com/download/frp/frp_0.42.0_linux_amd64.tar.gz)

## 配置

### windows客户端配置

解压配置`frpc.ini`

```bash
[common]
server_addr = 123.123.123.123 # 服务器的ip地址
server_port = 8888 # 服务器被连接的端口号

[web01]
type = http
local_ip = 0.0.0.0 # 本地的ip地址 默认即可
local_port = 8080  # 本地服务需要映射出去的端口号 
custom_domains = abc.expmle.com # 映射出去能访问的域名 需要配置域名
```
配置完成后可以在cmd执行
`frpc -c frpc.ini`
或者新建bat脚本一键启动
```bash
@echo off
start /B frpc -c frpc.ini
```

### linux服务端配置

把服务端压缩包下载解压
```bash
wget https://github.com/fatedier/frp/releases/download/v0.42.0/frp_0.42.0_linux_amd64.tar.gz
# 解压缩
tar -xvf frp_0.42.0_linux_amd64.tar.gz
```
然后编辑frps.ini文件
```bash
[common]
bind_port = 此处为接收连接的端口 和客户端8888相同
vhost_http_port = 此处为http服务的端口 随意设置
```
如果有宝塔需要先打开8888端口 也就是上面需要连接的端口
然后去配置域名指向abc.expmle.com 默认为静态网站 反向代理端口号127.0.0.1:8888 此处端口号为上面的http端口号

配置好以后在服务器控制台执行
```bash
./frps -c ./frps.ini
```

## 注意

windows客户端应该在服务端先启动以后再启动 否则连接不上
如果服务端停止客户端需要重新启动
