---
title: 数据类型
date: 2023-05-11 15:41:32
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
categories:
- 后端
tags:
- go
---
数据类型
<!--more-->

## 内存空间

| 类型 | 32位编译器 | 64位编译器 | 原理 |
| -- | -- | -- | -- |
| int8/uint8 | 1 | 1 |  |
| int16/uint16 | 2 | 2 |  |
| int32/uint32 | 4 | 4 |  |
| int64/uint64 | 8 | 8 |  |
| byte | 1 | 1 |  |
| rune | 4 | 4 |  |
| int | 4 | 8 | 根据机器位数决定长度 |
| uintptr | 4 | 8 | 根据机器位数决定长度 uint32/uint64 |
| float32 | 4 | 4 | float |
| float64 | 8 | 8 | double |
| true | 1 | 1 | char类型的整型 |
| false | 1 | 1 | char类型的整型 |

#### sizeof计算变量的内存空间
1. 导入`import "unsafe"`包
2. 通过`unsafe.Sizeof()`计算变量的内存空间

```go
package main
import (
    "fmt"
    "unsafe"
)
func main(){
    fmt.Println("size=",unsafe.Sizeof(int(0)))
}
```
**企业开发中一般使用int,因为int会根据当前系统自动转换int32和int64**

## 定义变量的三种格式
```go
//标准格式
var 变量名称 数据类型 = 值
//自动推导
var 变量名称 = 值
//简短格式(官方推荐) 只能在函数内使用
变量名称 := 值
```
```go
var num1 int //先定义
num1 = 10//赋值
//----------
var num2 int = 20 //定义同时赋值
//----------
var num3 = 30 //定义的同时赋值,并省略数据类型
//----------
num4 := 40 //定义的同时赋值,省略关键字和数据类型
```
#### 一次定义多个变量
```go
var num1,num2 int
num1 = 10
num2 = 20
//----------
var num3,num4 int = 30,40
//----------
var num5,num6 = 50,60
//----------
num7,num8 := 70,80
```
#### 变量组
```go
var(
    num1 int
    num2 float32
)
num1 = 10
num2 = 3.14
//----------
var(
    num3 int = 30
    num4 float32 = 6.66
)
//----------
var(
    num5 = 50
    num6 = 7.77
)
//----------
var(
    num7,num8 = 70,80
    num9,num10 = 9.99,10.11
)
```

- 简短模式是定义的同时初始化
- 不要把`:=`当做赋值运算符来用
- `:=`只能用于定义局部变量,不能定义全局变量
- 使用`:=`定义变量时,不能指定var关键字和数据类型
- 变量组中不能使用`:=`
- 通过`:=`同时定义多个变量,必须给所有变量初始化
- 通过`:=`同时定义多个变量,只要任意一个变量没有定义过,都会做退化赋值操作
- 局部变量或者导入的包没有被使用编译器会报错,但全局变量没有被使用不会报错

## 数据类型转换

只能显式转换
```go
var num1 int = 1
num2 := int64(num1)
var num5 byte = 11
var num6 uint8
num6 = num5 //这里不是隐式转换,byte的本质就是uint8
var num7 rune = 11
var num8 int32
num8 = num7 //rune的本质是int32

//string按照ascii码来转换
var num1 int32 = 65
var str string = string(num1) // "A"

//数值转字符串
var num1 int32 = 10
str1 := strconv.FormatInt(int64(num1),10)//必须int64,必须2,32之间的进制
var num5 float64 = 3.1415926
str3 := strconv.FormatFloat(num5,'f',-1,64)//必须float64,f小数,e指数,保留几位小数,-1按照指定类型有效位保留,被转换数据实际位数,float32就传32

var num6 bool = false
str7 := strconv.FormatBool(num6)

//字符串转数值
var str1 string = "123" 
//十进制的int8类型
num1,err := strconv.ParseInt(str1,10,8)//数据 进制 转换为多少位整数

var str3 string = "3.1415926794654167"
num3,err := strconv.ParseFloat(str3,32)

var str4 strig = "true"
num4,err := strconv.ParseBool(str4)
```
- 不能转换会返回error和对应的默认值

字符串和整型快速转换
```go
//整型转字符串
var num1 int32 = 11
var str1 string = strconv.Itoa(int(num1))//Itoa只接收int类型
//字符串转整型
var str1 string = "666"
num2,err := strconv.Atoi(str1)
```
数值类型转字符串的其他方式
```go
var num1 int32 = 111
var str1 string = fmt.Sprintf("%d",num1)
var num2 float32 = 3.14
var str2 string = fmt.Sprintf("%f",num2)
var num3 bool = true
var str3 string = fmt.Sprintf("%v",num3)
```
枚举
```go
const(
    num1 = iota  // 0
    num2 = iota  // 1
    num3 = iota  // 2
)
```
- iota从0开始递增
- iota只要上一行出现iota,那么后续行会自动递增
