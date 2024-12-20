---
title: 玩客云-casaos安装软件
date: 2024-03-22 17:57:36
cover: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
category: [后端]
tags: [linux]
draft: false
---

[casaos镜像项目地址](https://github.com/hzyitc/armbian-onecloud)
下载`minimal.burn.img`类型
短接位置搜百度

https://casaos.io/
https://awesome.casaos.io/content/3rd-party-app-stores/list.html


### 共享文件夹无法访问
windows 访问 \\192.168.2.110\smb
电视手机访问 smb://192.168.2.110
放行防火墙
```bash
ufw allow samba
```
关闭防火墙
```bash
ufw disable
```
电视手机端需要输入用户名密码,还提示错误没有权限
需要开启smb1.0
```bash
# 路径 /etc/samba/smb.conf
# 修改支持smb1.0
min protocol = NT1
# 从1.0向上兼容版本
protocol = SMB1  # 亲测无法启动
# 重启服务
systemctl restart smbd
```

## docker安装

首先确保已经安装了Docker并且正常运行。
```shell
# 检查Docker版本
docker --version
# 检查Docker服务状态
systemctl status docker
```

### 安装qbittorrent
```bash
# 安装
apt install qbittorrent-nox
# 启动代码
qbittorrent-nox -d
# 添加开机启动
systemctl enable qbittorrent
```
账号:admin
密码:adminadmin
报错:Failed to enable unit: Unit file qbittorrent.service does not exist.
是因为没有`qbittorrent.service`文件
```bash
# 创建文件
vim /etc/systemd/system/qbittorrent.service
```
内容
```bash
[Unit]
Description=qBittorrent Daemon Service
After=network.target

[Service]
User=YOUR_USERNAME # 用户名 whoami命令查看用户名
Group=YOUR_GROUP   # 用户组 groups命令查看用户组
Type=simple
ExecStart=/usr/bin/qbittorrent-nox
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
vim使用shift+insert插入代码
```bash
:wq #保存并退出
```
接下来，重新加载 systemd 并启用 qbittorrent 服务：
```bash
sudo systemctl daemon-reload
sudo systemctl enable qbittorrent.service
```
最后，启动 qbittorrent 服务并检查其状态：
```bash
sudo systemctl start qbittorrent.service
sudo systemctl status qbittorrent.service
```

### casaos docker安装Jellyfin

使用Docker命令拉取Jellyfin镜像。
```shell
docker pull jellyfin/jellyfin:latest
```
创建一个新的Docker容器并将其与主机共享音视频文件目录（这里假设为~/media）。
```shell
docker run -d \
  --name=jellyfin \
  -v ~/media:/config \
  -p 8096:8096 \
  jellyfin/jellyfin:latest
```
casaos中会出现jellyfin重构图标
等待片刻后，通过Web浏览器访问 http://localhost:8096/ 就能打开Jellyfin界面了。


### 安装小雅alist

[视频教程](https://www.bilibili.com/video/BV19Z421U7u6/?spm_id_from=333.337.search-card.all.click&vd_source=5008e8935b055452764aab248fcfa448)
[获取token](https://alist.nn.ci/zh/guide/drivers/aliyundrive.html)
[获取335为验证码 myopentoken](https://alist.nn.ci/tool/aliyundrive/request.html)

安装
```shell
bash -c "$(curl http://docker.xiaoya.pro/update_new.sh)"
```
小雅转存文件
https://www.alipan.com/s/rP9gP3h9asE
获取的资源id
`65fc1f5c5f7e56e31d5e4377850b8220c1b14096`
https://www.alipan.com/drive/file/resource/65fc1f5c5f7e56e31d5e4377850b8220c1b14096


### 安装小雅alist2
```bash
bash -c "$(curl --insecure -fsSL https://ddsrem.com/xiaoya_install.sh)"
 
bash -c "$(curl -sLk https://ddsrem.com/xiaoya_install.sh)" 
```
`/mnt/docker/xiaoya`
 
第一，32位token获取地址：
https://alist.nn.ci/zh/guide/drivers/aliyundrive.html
第二 280位token（open token）获取地址：
https://alist.nn.ci/zh/guide/drivers/aliyundrive_open.html
第三 小雅缓存目录
https://www.alipan.com
 
单独安装阿里云盘清理守护：
```bash
bash -c "$(curl -s https://xiaoyahelper.zngle.cf/aliyun_clear.sh | tail -n +2)" -s 3 -tg
```
小雅官方安装命令
```bash
bash -c "$(curl http://docker.xiaoya.pro/update_new.sh)" -s host
 ```
webdav 账号密码
用户:  
重启就会自动更新数据库及搜索索引文件
```bash
docker restart xiaoya
```
 
xiao挂alist配置
xiaoya 挂 alist V3
 
网址：
http://192.168.*.*:5678
例：http://192.168.5.5:5678
 
令牌一键获取
```bash
docker exec -i xiaoya sqlite3 data/data.db <<EOF
select value from x_setting_items where key = "token";
EOF
```
手机端 
nplayer 
电脑端
potplayer
电视端TVbox配置
```bash
http://192.168.5.5:5678/tvbox/my.json
```
 
已经安装好docker后的完整命令
```bash
docker run -d -p 5678:80 -p 2345:2345 -p 2346:2346 -v /mnt/xiaoya:/data -v /mnt/xiaoya/data:/www/data --restart=always --name=xiaoya xiaoyaliu/alist:latest
```

### 安装aria2 pro

[视频地址](https://www.bilibili.com/video/BV1fS421A7kC)

安装arial2-pro面板
需要给文件目录权限 
`chmod 777 /media/devmon/h1/aria2/config`
`chmod 777 /media/devmon/h1/aria2/downloads`
```bash
docker run -d \
    --name aria2-pro \
    --restart unless-stopped \
    --log-opt max-size=1m \
    --network host \
    -e PUID=0 \
    -e PGID=0 \
    -e RPC_SECRET=abc \                         # 此处abc为与下面ariang对接的密码
    -e RPC_PORT=6800 \
    -e LISTEN_PORT=6888 \
    -e IPV6_MODE=true \
    -v /media/devmon/h1/aria2/config:/config \              # 配置文件路径 冒号右边不要修改
    -v /media/devmon/h1/aria2/downloads:/downloads \        # 下载路径 冒号右边不要修改
    p3terx/aria2-pro
```
如果执行失败的话尝试先手动拉取再执行`docker pull p3terx/aria2-pro`
安装ariang核心
```bash
docker run -d \
    --name ariang \
    --log-opt max-size=1m \
    --restart unless-stopped \
    --network host \
    p3terx/ariang --port 6880 --ipv6

```
aria2 重构端口6880  ariang重构端口6888
// 此处我的防火墙已经关闭不用映射
由于 Aria2 暂时没有 UPnP 功能，所以必须进行端口映射，配置防火墙开放监听端口 6888，参考视频https://www.bilibili.com/video/BV17Z421m7nA

### docker安装Navidrome

首先，您需要拉取 Navidrome 的 Docker Hub 镜像：
```bash
docker pull deluan/navidrome:latest

```
运行 Navidrome 容器：
```bash
docker run -d \
  --name=navidrome \
  -p 4533:4533 \
  -v navidrome-data:/config \
  -v /media/devmon/h1/music:/music \
  ghcr.io/deluan/navidrome:latest
```
--name=navidrome：指定容器的名称为 "navidrome"。
-p 4533:4533：将容器的 4533 端口映射到主机的 4533 端口，用于访问 Navidrome 的 Web 界面。
-v navidrome-data:/config：将 Navidrome 的配置文件存储在名为 "navidrome-data" 的 Docker 数据卷中。
-v /path/to/music/library:/music：将您的音乐库路径挂载到容器中，替换 "/path/to/music/library" 为实际的音乐库路径。