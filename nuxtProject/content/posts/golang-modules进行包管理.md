---
title: golang-modules进行包管理
date: 2023-09-10 20:33:10
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## 用go modules初始化一个项目
这里 myproject 是你的项目名称，可以根据实际项目名称进行替换。运行该命令后，Go 会创建一个名为 go.mod 的文件，用于管理项目的依赖。
```bash
go mod init myproject
```

## 添加依赖包
这将下载并安装 github.com/example/package 包，并将其添加到 go.mod 文件中的依赖列表中。
```bash
go get github.com/example/package
```

## 打包和运行

### 打包项目
```bash
go build
```
### 运行项目
```bash
./myproject
```

## 管理依赖

Go Modules 会自动管理项目的依赖，并在 go.mod 文件中记录它们。如果需要升级依赖包或添加新的依赖，你可以使用 go get 或 go mod tidy 等命令来管理依赖。


## 包引用
### 目录
- /
- /main.go
- /go.mod
- /test/util.go

### util.go
```go
package test // 此处和文件夹名相同
import "fmt"
var UtilsData string = "utils data" // 此处变量名大写才能在外部访问
func ShowStr() string{
	return "hello test/util"
}
// init引用即调用
func init(){
    fmt.Println("util init.")
}
```
### main.go
```go
package main
import (
	"fmt"
	"project/test" //项目名+包目录 相当于绝对路径
)
func main(){
	fmt.Println("hello world")
	fmt.Println(test.UtilsData) // 包名+变量名   包文件夹里的go文件名字不重要
	result := test.ShowStr()
	fmt.Println(result)
}
```
### go.mod
一个项目中可以有多个go.mod在不同的文件夹中,代表不同的模块,可以相互引用
```bash
module demo1 # 此处为模块名 一个项目中可以有多个模块 引用的时候直接用模块开始的路径地址
go 1.20
```