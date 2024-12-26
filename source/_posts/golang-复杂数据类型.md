---
title: golang-复杂数据类型
date: 2023-09-10 15:44:57
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 复杂数据类型

- 指针
- 数组
- 切片
- 管道
- 函数
- 结构体
- 接口
- map

### 指针

指针是一种特殊的数据类型, 用于存储变量的内存地址. 指针允许你直接访问变量在内存中的位置, 而不是变量的值本身. 指针类型以`*`符号开头,后跟指向的数据类型. 例如 `*int` 表示一个指向整数的指针.

- &获取变量的内存地址
- *获取内存地址的值

```go
// 获取变量的内存地址
var n1 int = 10
fmt.Println(&n1) // 0xc000016088  一段内存地址

// 通过*号获取内存地址的值
fmt.Println(*&n1) //先用&获取n1的内存地址 再用*获取内存地址的值 最后结果就是n1的值

// 指针变量 n2实际存储的值是n1的内存地址 
// 通过*n2访问n2的实际值
var n2 *int = &n1
fmt.Println(n2) // 0xc000016088
fmt.Println(*n2) // 10
```

### 指针的四个注意事项
#### 1. 通过指针改变指向值
```go
var n1 int = 10
var n2 *int = &n1
*n2 = 20 //通过*变量 直接改变原变量的值
fmt.Println(n1) // 20
```
```go
var n1 int = 10
var n2 int = 20

var n3 *int = &n2
fmt.Println(*n3) 
n3 = &n1 //改变n3的值为新的内存地址
fmt.Println(*n3) 
```

#### 2. 指针变量指向的一定是地址值
会报错 cannot use 10 (untyped int constant) as *int value in variable declaration
```go
var n1 *int = 10 // 此处会报错
fmt.Println(n1)
```
#### 3. 指针变量的地址类型不可以不匹配
会报错 cannot use &n1 (value of type *int) as *float32 value in variable declaration
```go
var n1 int = 10
var n2 *float32 = &n1 // 此处会报错
```

#### 4. 每个基本数据类型都有对应的指针类型,形式就是 *数据类型
```go
var n1 int = 10
var n2 float32 = 3.14
var n3 bool = true
var n4 string = "hello"

var z1 *int = &n1
var z2 *float32 = &n2
var z3 *bool = &n3
var z4 *string = &n4
fmt.Println(z1)
fmt.Println(z2)
fmt.Println(z3)
fmt.Println(z4)
```