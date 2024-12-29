---
title: golang版本管理gvm安装
date: 2023-09-08 09:38:33
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
categories:
- 后端
tags:
- go
---

## 下载地址

[原文连接](https://www.xjx100.cn/news/428454.html?action=onClick)

[下载地址](https://github.com/voidint/g/releases)

## 环境变量配置

新建系统变量
```bash
# 使用国内镜像地址
G_MIRROR = https://golang.google.cn/dl/
# 设置工作目录
G_HOME = E:\gvm
# 配置GOROOT
这个指向g工作目录下的go，g安装go版本后，会在这个路径下建立一个软链到versions目录下的指定版本，靠这个方法来控制当前的go版本，如果安装g之前已经安装过go了，需要修改GOROOT这个环境变量。
GOROOT = %G_HOME%\go

# 配置全局环境变量
环境变量path中添加gvm.exe的路径

# 命令使用
gvm ls 查询已安装的go版本
gvm ls-remote  查询可供安装的所有go版本
gvm ls-remote stable 查询当前可供安装的stable状态的go版本
gvm install 1.14.6 安装目标go版本1.14.6
gvm use 1.14.6 切换至1.14.6版本
gvm uninstall 1.14.6 卸载一个已安装的go版本
```


