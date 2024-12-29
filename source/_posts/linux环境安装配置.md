---
title: linux环境安装配置
date: 2023-05-15 14:29:26
cover: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
categories:
- 前端
tags:
- vps
---
- linux环境安装配置
<!--more-->

### 更改VPS系统时间（可选开启时间同步）
```js
rm -rf /etc/localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
### NTP同步时间 协议（可选择跳过）
```js
//Ubuntu/Debian系统
apt-get update
apt-get install ntp ntpdate -y
//CentOS/RHEL系统
yum install ntp ntpdate -y
//先停止NTP服务器，再更新时间
service ntpd stop                 //停止ntp服务
ntpdate us.pool.ntp.org           //同步ntp时间
service ntpd start                //启动ntp服务
```
### 安装宝塔
```js
//Debian
wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh
//centos
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```
### 安装curl
```js
//ubuntu/debian系统安装 Curl 方法
apt-get update -y && apt-get install curl -y 
//centos系统安装 Curl 方法
yum update -y && yum install curl -y
```
### 系统升级
```js
//开机启动
systemctl enable v2ray
//启动
systemctl start v2ray
```

### bt路由配置
```js
//网站 域名 配置文件  #SSL-END后(21行左右)
location /cs
{
	proxy_pass http://127.0.0.1:37554;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $http_host;
    proxy_read_timeout 300s;
}
//ssl配置
//let`s Encrypt 免费证书

```
### cloudflare dns配置
```js
//在域名供应商处填写nameserver服务指向cloudflare
//配置域名或二级域名指向服务器ip 开启代理
//配置 TXT类型 ssl内容
//SSL/TLS选项内加密模式改为完全(如果不修改,cloudflare的ssl与服务器ssl不匹配,连接失败)
//
```
### cloudflare workers
```js
//管理workers
//创建worker
//快速编辑
//内容
addEventListener(
    "fetch", event => {
        let url = new URL(event.request.url);
        url.hostname = "test.exmple.com";
        url.protocol = "https";
        let request = new Request(url, event.request);
        event.respondWith(
            fetch(request)
        )
    }
)
```


























#
