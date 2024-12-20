---
title: docker环境安装
date: 2024-06-10
description: ''
cover: 'https://cdn.wdtwo.com/anzhiyu/lianjie038036.jpg'
tags: [docker]
category: [docker]
draft: false 
---

## 官方安装
```bash
bash -c "$(curl -s http://docker.xiaoya.pro/update_new.sh⁠)"
```

## 使用阿里云镜像安装 Docker

## 更新包索引并安装依赖：
```bash
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
```
## 添加 Docker 的官方 GPG 密钥：
```bash
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
## 设置稳定的存储库：
```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
## 更新包索引并安装 Docker Engine：
```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```
## 验证 Docker 是否安装成功：
```bash
sudo systemctl status docker
```
## 如果 Docker 安装成功并运行，你应该会看到类似以下的输出：
```bash
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since ...
       Docs: https://docs.docker.com
   Main PID: ... (dockerd)
      Tasks: ...
     Memory: ...
     CGroup: /system.slice/docker.service
             └─... /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

## 从docker hub 拉取镜像
1. 搜索指定名称的镜像
2. 然后点击Tags，选择一个版本
3. 点击Digest进入镜像详情页
4. 从境外服务器拉取相应的镜像文件
   
### 拉取镜像命令
```bash
# docker pull 镜像包名称@版本号
docker pull xiaoyaliu/alist:latest
# 通过id拉取镜像
docker pull xiaoyaliu@sha256:f8aeea----------------------------
```
### 保存镜像为tar.gz
```bash
# docker save -o 保存的压缩包路径和名称 镜像名称(image):版本号(tag)
docker save -o /mnt/xiaoya.tar.gz xiaoyaliu/alist:latest
# 通过id保存镜像
docker save -o /mnt/xiaoya.tar.gz 镜像ID
```
### 删除镜像
```bash
# 通过名称和版本号删除镜像
docker rmi xiaoyaliu/alist:latest
# 通过 ID删除镜像
docker rmi 94e814e2efa8
# 强制删除镜像
docker rmi -f 镜像ID
# 删除未被使用的镜像
docker image prune
docker image prune -a

```
### 读取tar.gz镜像包
```bash
# docker load -i 镜像包路径和名称
docker load -i /path/to/your-image.tar

# 导入镜像 并指定镜像名称和版本号
docker import /path/to/image.tar.gz mycover:1.0
```
### 设置名称和标签
```bash
# docker tag 源镜像名称:版本号 新镜像名称:版本号
docker tag xiaoyaliu/alist:latest xiaoyaliu/alist:v1.0
# 通过id设置镜像名称和版本号
docker tag 7d2e114f34a7 xiaoyaliu/alist:latest
```
### 运行镜像
```bash
# docker run -d --name 运行的容器名称 镜像名称:版本号
docker run -d --name xiaoya xiaoyaliu/alist:latest
# 通过id运行镜像
docker run -d --name your-container-name 镜像ID
# 运行镜像并指定端口映射
docker run -d --name xiaoya -p 5678:5678 xiaoyaliu/alist:latest
```
### 使用 Host 模式运行容器
```bash
docker run -d --name xiaoya --network host xiaoyaliu/alist:latest
# docker run -d --name 运行的容器名称 -p 80:8080 --network host 镜像名称:版本
docker run -d --name xiaoya -p 80:8080 --network host xiaoyaliu/alist:latest
```

### 配置 WebDAV 账号密码
```bash
docker run -d --name xiaoya -p 80:8080 --network host -e USER=user -e PASS=password xiaoyaliu/alist:latest
# 配置 WebDAV 账号密码
docker run -d --name xiaoya -p 5678:5678 -e WEBDAV_USER=guest -e WEBDAV_PASS=guest_Api789 xiaoyaliu/alist:latest
# host模式运行容器并配置WebDAV账号密码
docker run -d --name xiaoya --network host -e WEBDAV_USER=guest -e WEBDAV_PASS=guest_Api789 xiaoyaliu/alist:latest
```
### 停止容器
```bash
# docker stop 容器名称
docker stop xiaoya
```
### 启动容器
```bash
# docker start 容器名称
docker start xiaoya
```
### 删除容器
```bash
# docker rm 容器名称
docker rm xiaoya
```

## 配置代理
```bash
export HTTP_PROXY="http://your-proxy-host:proxy-port"
export HTTPS_PROXY="http://your-proxy-host:proxy-port"
```
## 重启docker
```bash
sudo systemctl restart docker
```
## 查看docker信息
```bash
docker info
```
## 查看镜像列表
```bash
docker images
```
## 查看容器列表
```bash
docker ps -a
```