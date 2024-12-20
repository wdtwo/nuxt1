---
title: golang-变量和基本数据类型
date: 2023-09-08 15:44:57
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags:  [go]
draft: false
---

## 变量声明

```go
// 变量声明方式
// 1. 
var a int
a = 1
// 2.
var b int = 2
// 3.
var c = 3
// 4.
d := 4
fmt.Println(a, b, c, d)

//多变量声明
var e,f,g int
e,f,g = 5,6,7
fmt.Println(e,f,g)

h,i,j := 8,9,10
fmt.Println(h,i,j)

// 一次性声明
var (
    k = 11
    l = 12
)
fmt.Println(k,l)
```
-- 定义在{}中的是局部变量 --
-- 定义在{}外的是全局变量 --

## 数据类型

底层存储空间和操作系统无关

### 基本数据类型

- 数值型
    - 整型
      - int 
        - int8 (-2的7次方~2的7次方-1 | -128~127)
        - int16 (-32768~32767)
        - int32 (-2147483648~2147483647)
        - int64 (-2的63次方~2的63次方-1)
      - uint
        - uint8 (0~2^8-1 | 0~255)无符号整型最小为0 首位不表示符号
        - uint16 同上
        - uint32 同上
        - uint64 同上
      - byte
    - 浮点型
      - float32
      - float64
- 字符型
    - byte
- 布尔型
- 字符串

### 其他整数类型

- int 
  - 32位系统默认为4字节 -2^31~2^31-1
  - 64位系统默认为8字节 -2^63~2^63-1
- uint
  - 32位同上 0~2^32-1
  - 64位同上 0~2^64-1
- rune
  - 等价于int32
- byte
  - 等价于uint8

### 浮点型
浮点类型底层存储：
符号位 + 指数位 + 尾数位，尾数位只是存了个大概，很可能发生精度损失
```go
//小数
var num1 float32 = 3.14
//负小数
var num2 float32 = -3.14
//负科学计数法 314的-10^2
var num3 float32 = 314E-2
//正的
var num4 float32 = 314E2
//小写e
var num5 float32 = 314e2
//float64
var num6 float64 = 314e2
fmt.Println(num1, num2, num3, num4, num5, num6)

//num7 =>618 || num8 =>618.0000000618
//浮点型可能会有精度损失 所以建议使用float64
var num7 float32 = 618.0000000618
var num8 float64 = 618.0000000618
fmt.Println(num7, num8)

//默认浮点型位float64
var num9 = 3.14

```

### 字符型

```go
//字符型
// golang中没有字符型,所以用整数来表示
// 字符型映射的Unicode编码
// golang底层用的utf-8编码集
// 单引号表示
var c1 byte = 'a'
fmt.Println(c1) // =>97

// byte 范围0~255
// int 可以用来存储超过255的值
var c2 int = '北'
fmt.Println(c2) // =>21271
//可以输出原始值
fmt.Printf("c2的值为: %c",c2)
```

### 转义字符
```go
// \n换行
fmt.Println("aaaa\nbbbb")
// \b退格 向前退一格
fmt.Println("aaaaa\bb")
// \r回到行首
fmt.Println("aaaaa\rbbb")
// \t制表符 8位一格制表格
fmt.Println("aaaaa\tbbb")
// \" ' \\   单引号不需要转义  因为'是字符型'
fmt.Println("aaa\"bbb'ccc\\ddd")
```

### 布尔类型
占用一个字节
```go
var flag1 bool = true
var flag2 bool = 5 > 10
```

## 字符串类型

```go
// 定义一个字符串
var s1 string = "Hello World"
fmt.Println(s1)

// 字符串不可被改变 说的是字符串中的单个字符不可被改变

var s2 string = "Hello world"
fmt.Println(s2[0]) // 输出字符编号 72
//s2[0] = 'H' // cannot assign to s2[0] (value of type byte)
fmt.Println(s2)

// 块级字符串 和es6一样用反引号 ``

var s3 string = `Hello World`
fmt.Println(s3)
// 字符串的拼接
var s4 string = "Hello " + "World"
fmt.Println(s4)
s4 += s4
fmt.Println(s4)
// 字符串过长的处理方式 把加号留在上一行的结尾
var s5 string = "Hello" + "World" + "Hello" + "World" + "Hello" + "World" + 
"Hello" + "World" + "Hello" + "World" + "Hello" + "World" + 
"Hello" + "World" + "Hello" + "World" + "Hello"
```

### 基本数据类型的默认值

- 整型 = 0
- 浮点型 = 0
- 布尔型 = false
- 字符串 = ""

#### 数据类型检测

`格式化输出 fmt.Printf()`
`格式化变量的类型 %T`
```go
var num1 byte = 10
fmt.Printf("num1对应的类型是:%T",num1)
```

