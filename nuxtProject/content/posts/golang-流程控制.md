---
title: golang-流程控制
date: 2023-09-10 22:11:13
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## if
```go
var n1 int8 = 10
if n1 < 10 {
    fmt.Println("n1 < 10")
}else if n1 < 20 {
    fmt.Println("n1 < 20")
}else{
    fmt.Println("n1 >= 20")
}

```
## switch
不用加`break`防止穿透
```go
var n1 int8 = 30
switch n1 { //此处n1可以是表达式
    case 10:
        fmt.Println("n1=10")
        fallthrough //默认不会向下穿透 可以使用fallthrough进行向下穿透
    case 20,30,40:
        fmt.Println("n1=20,30,40")
    default:
        fmt.Println("错误")
}
```
switch可以当if用
```go
var a int = 1
switch{
    case a == 1:
        fmt.Println("a == 1")
    case a == 2:
        fmt.Println("a == 2")
}
```
可以行内声明变量
```go
switch b := 10;{
    case b == 10:
        fmt.Println("b == 10")
    case b == 20:
        fmt.Println("b == 20")
}
```

## for
循环只有for循环
```go
var n1 int = 0
for a := 0;a < 10;a++{
    n1 += a
}
fmt.Println(n1)
```
```go
a := 1
for a < 5 {
    fmt.Println("hello world")
    a++
}
```
给循环添加标签
```go
label1: //给for添加标签
for i := 0;i < 5;i++{
    // label2:
    for j := 0;j < 5;j++{
        fmt.Printf("%v | %v \n",i,j)
        if(i < 2){
            continue label1 //结束本次循环 继续下次循环 如果continue后不跟标签 则停止最近的for
        }
        if i > 3 {
            break label1 //如果break后不跟标签 则停止最近的for
        }
    }
}
```

### 死循环
```go
for {
   fmt.Println("hello world")
}
for ;; {
   fmt.Println("hello world")
}
```
## for range
遍历不带中文的字符串
```go
// 根据字节遍历
var s1 string = "hello world"
for n := 0;n < len(s1);n++{
    fmt.Printf("%c \n",s1[n])
}
```
遍历带中文的字符串
```go
// 根据字符来遍历 中文占3个字节 不会乱码
var s1 string = "hello world 你好"
for i,v := range s1{
    fmt.Printf("%d | %c \n",i,v)
}
```

## goto
跳转到标记行
```go
fmt.Println("hello world1")
if 1 == 1{
    goto label1 //跳转到标记
}
fmt.Println("hello world2")
fmt.Println("hello world3")
label1:
fmt.Println("hello world4")
fmt.Println("hello world5")
```
## return
结束当前函数