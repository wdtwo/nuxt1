---
title: dns-使用CloudflareTunnel实现内网穿透
date: 2023-12-21 09:26:58
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags:  [go]
draft: false
---

## 使用Cloudflare Tunnel实现内网穿透
[原文地址](https://zhuanlan.zhihu.com/p/621870045)
下载安装包
[github下载](https://github.com/cloudflare/cloudflared)

### Windows
下载Windows版本的二进制文件，比如'cloudflared-windows-amd64.exe'，然后复制到自己定义的目录里，名字改为'cloudflared.exe'。

### Linux
在Linux上，可以直接下载二进制文件，并给以可执行权限，比如安装amd64版本：
```bash
curl -L 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64' -o ./cloudflared
chmod +x ./cloudflared
```

### 登录
```bash
cloudflared tunnel login
```
输入命令后，会给出一个URL，打开浏览器访问这个URL，选择需要授权的网站。

### 创建Tunnel
创建一个Tunnel，名称可以自定义，比如'web':
```bash
cloudflared tunnel create <tunnel-name>
# 例如
cloudflared tunnel create web
```
创建成功后，会返回一个Tunnel ID，类似于'f7b0c0e0-0c0e-0c0e-0c0e-0c0e0c0e0c0e'。

### 配置DNS记录
使用如下命令配置DNS，其中的 <tunnel-name>是创建Tunnel时指定的名称，<domain>是自定义的域名，比如 web.example.com:

cloudflared tunnel route dns <tunnel-name> <domain>
### 例如
cloudflared tunnel route dns web web.example.com
如果还有其他域名需要配置，可以继续执行上面的命令。配置完成后可以前往Cloudflare控制台查看到CNAME记录。

## 编写配置文件

1. Linux的配置文件路径为 ~/.cloudflared/config.yml，
2. Windows的配置文件路径为 %USERPROFILE%\.cloudflared\config.yml，如果文件不存在，可以手动创建。

[配置文档](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/#supported-protocols)
配置文件内容如下，注意根据注释修改配置：
```bash
# Tunnel UUID，就是同目录下的json文件的文件名
tunnel: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# 鉴权文件路径，注意根据自己的路径修改，下面的例子是Linux的路径
credentials-file: /home/xxx/.cloudflared/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.json
protocol: https
# h2mux
# 服务配置
ingress:
  # hostname是刚才添加DNS记录时指定的域名
  - hostname: web.example.com
    # service是需要暴露的服务，比如这里反代了5244端口
    service: http://127.0.0.1:8080
  - hostname: web2.example.com
    # 这里的示例是windows 远程桌面服务
    service: rdp://localhost:3389
  # 最后记得添加一个默认404
  - service: http_status:404
```
### 配置完成后，验证一下配置文件是否正确：
```bash
cloudflared tunnel ingress validate
```
### 测试运行
输入如下命令启动Tunnel：
```bash
cloudflared tunnel --config ~/.cloudflared/config.yml run <tunnel-uuid>
# 例如
cloudflared tunnel --config ~/.cloudflared/config.yml run xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# 访问刚才配置的域名，如果能正常访问，说明配置成功。或者前往Cloudflare Zero Trust的控制台查看Tunnel的状态。
```
### 远程桌面配置
如果是需要在windows上使用远程桌面，在控制端上同样下载windows可执行文件，然后在文件目录打开cmd，输入如下命令即可，注意hostname填刚才设置了rdp service对应的域名。
```bash
cloudflared.exe access rdp --hostname web2.example.com --url localhost:3000
# 再打开windows远程桌面连接，计算机处填入 localhost:3000，设置好用户名和密码后点击连接即可。
```

## 配置开机自启动
目前我们所有的命令执行都需要手动操作，这显然是不放便的，因此需要配置开机自启动。
Linux
执行如下命令:
```bash
cloudflared service install
systemctl start cloudflared
```
注意：创建系统服务后，配置文件会被拷贝到/etc/cloudflared/config.yml，后续修改配置必须修改新文件
Windows
以管理员身份打开cmd，然后进入存放cloudflared.exe的目录，执行如下命令:
```bash
cloudflared.exe service install
```
按下 windows徽标键+R，输入 `regedit`，打开注册表，进入 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services`，找到Cloudflared，将ImagePath的值修改为 `C:\Cloudflared\bin\cloudflared.exe --config=C:\Users\%USERNAME%\.cloudflared\config.yml tunnel run`，注意修改路径为自己的可执行文件路径和配置文件路径。

再按下 windows徽标键+R，输入 `services.msc`，找到 Cloudflared agent服务，右键重新启动即可。



