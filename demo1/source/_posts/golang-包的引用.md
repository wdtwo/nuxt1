---
title: golang-包的引用
date: 2023-09-10 20:17:03
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 起名规则

1. 包名:尽量保证package的名字和目录保持一致,尽量采取有意义的包名,不要和标准库冲突
2. main包是一个入口程序,如果没有main包则不能执行和生成可执行文件
3. 采用驼峰命名法
4. 如果首字母小写则本包内使用 (私有)
5. 如果首字母大写则可以被其他包访问 (公有)
6. 利用首字母大小写来完成权限控制

**import通常放在package下面**
**导入的包名需要用双引号**
**包名是从$GOPATH/src/后开始计算的,使用/进行路径分割,需要配置环境变量**
**此处可以使用go modules进行包管理,不再使用$GOPATH**

## 包的引用
main.go文件
```go
package main
import (
	"fmt"
	"demo1/util"  // 项目名 + 包所在的文件夹名
)
func main(){
	fmt.Println(util.ShowFunc()) //调用 包名.函数名 需要首字母大写
}
```
util文件夹下的go文件
```go
package util // 包名需要和文件夹名相同
func ShowFunc() string{
	return "show func."
}
```
## 包名和文件夹名可以不一致
可以放在util文件夹下 引用需要引用util文件 调用test包
```go
import (
	"fmt"
	"demo1/util"  // 项目名 + 包所在的文件夹名
)
func main(){
	fmt.Println(test.ShowFunc()) //调用 包名.函数名 需要首字母大写
}
```
相同一个文件夹下的两个go文件的包名必须一致 否则报错
```go
package test
func ShowFunc() string{
	return "show func."
}
```

## 可以给包起别名 
一旦给包起了别名以后原来的包名就不能再使用了 只能使用别名
```go
import (
	"fmt"
	aaa "demo1/util" // 给包起别名
)
func main(){
	fmt.Println(aaa.ShowFunc())
}
```
