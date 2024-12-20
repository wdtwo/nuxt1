---
title: golang-内置函数
date: 2023-09-10 20:17:03
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## 内置函数

在手册builtin中
可以不用导入包直接使用


## len()
数组 数组指针 切片 映射 字符串 通道 通道缓存中列队(未读取)

## new()
基本数据类型用new()来分配
语法 new(Type) *Type
分配内存 第一个参数为类型,而非值.返回值为指向该类型的新分配的0值指针.
```go
var a *int = new(int)	// 返回一个int类型的指针
*a = 10 // 指针指向的内存地址的值赋值为10
fmt.Println(*a) // 指针指向的内存地址的值为10 a为内存地址
```
实例分析
a是一个指针类型 a的值是一个指针 这个指针指向了一个内存地址
被指向的内存地址的类型为int *a 是把a指向的内存地址的值改成10
所以 a是一个指针地址 &a是指针地址指向的内存地址 *a是指针地址指向的内存地址的值
```go
// 解析demo
var a int = 10
var b *int = &a
fmt.Println(&a,&b,*b,a) // 0xc000016088 0xc00000a028 10 10
```

## make()
引用类型用make()来分配
指针 slice切片 map 管道chan interface接口 等


