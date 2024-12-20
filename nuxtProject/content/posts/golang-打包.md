---
title: golang打包
date: 2023-04-25 10:19:51
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

linux打包
```bash
$env:GOOS="linux"
$env:GOARCH="amd64"
go build -o server main.go
```

windows打包
```bash
go build main.go
go build -o start.exe main.go
```


## 报错处理

### cannot install, GOBIN must be an absolute path
因为 GOBIN 必须是绝对路径，而不是相对路径。为了解决这个问题，您可以采取以下步骤：

项目根目录
```bash
go env #  命令查看当前的 GOBIN 设置。运行以下命令：
```
```bash
go env GOBIN # 创建一个sum文件
```
设置绝对路径
例如项目目录为H:/www/goproject
这会将 GOBIN 设置为指定的绝对路径。
```bash
go env -w GOBIN=H:/www/goproject
```
然后，您可以重新运行 go get 命令来安装
