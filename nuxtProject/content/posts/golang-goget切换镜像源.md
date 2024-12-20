---
title: golang-goget切换镜像源
date: 2023-09-14 21:56:11
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## 切换国内镜像源
```bash
go env -w GOPROXY=https://goproxy.cn,direct
```

## 切换为默认镜像源
```bash
go env -w GOPROXY=https://proxy.golang.org,direct
```