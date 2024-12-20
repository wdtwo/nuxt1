---
title: golang-fyne环境配置
date: 2023-09-20 14:33:00
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## fyne环境配置

[官方配置文档](https://developer.fyne.io/started/)

1. 下载安装golang环境包
   - [下载地址](https://go.dev/dl/)
2. 安装windows C编译器
   - [MSYS2 与 MingW-w64](https://www.msys2.org/)
   - [TDM-GCC](https://jmeubank.github.io/tdm-gcc/download/)
   - [天鹅座](https://www.cygwin.com/)


msys2安装以后不要运行,从开始菜单打开`MSYS2 MinGW 64-bit`
执行以下命令
```bash
pacman -Syu
pacman -S git mingw-w64-x86_64-toolchain
```

## 安装fyne进项目
```bash
cd myapp
go mode init myapp

go get fyne.io/fyne/v2@latest
go install fyne.io/fyne/v2/cmd/fyne@latest

go mod tidy # 更新包文件
```

## 旧版本go安装fyne
```bash
go get fyne.io/fyne/v2
go get fyne.io/fyne/v2/cmd/fyne
```

## 安装完成后运行官方demo
```bash
go run fyne.io/fyne/v2/cmd/fyne_demo@latest
```

## 旧版本go的demo
```bash
go run fyne.io/fyne/v2/cmd/fyne_demo
```

## 安装demo演示项目
```bash
$ go install fyne.io/fyne/v2/cmd/fyne_demo@latest
```

## 对于早期版本的
```bash
$ go get fyne.io/fyne/v2/cmd/fyne_demo
```

## 隐藏程序运行时候的cmd窗口
```bash
go build -ldflags "-H=windowsgui" -o yourapp.exe
```
