---
title: 基本变量
date: 2023-05-11 14:41:23
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
categories:
- 后端
tags:
- go
---

- 常量变量
- 运算符
- 流程控制
- 函数和方法

<!--more-->

## 常量变量
```go
var 变量名称 数据类型 = 值;
const 变量名称 数据类型 = 值;
```
### 默认值
```go
int/int8/int16/int32/int64/uint/uint8/uint32/uint64/byte/rune/uintptr =0
float32/float64 = 0.0
bool = false
string = ""
pointer/function/interface/slice/channel/map/error = nil
其他复合类型array/struct默认值是内部数据类型的默认值
```
```go
var pointerv *int //指针变量
var funcv func(int,int)int //function变量
var interfacev interface{}//接口变量
var slicev []int //切片变量
var channelv chan int //channel变量
var mapv map[string]string //map变量
var errorv error 
var arrayv [3]int //数组 => [0,0,0]
type Person struct{
    name string
    age int
}
var structv Person //结构体变量 => {"",0}
```

## 运算符
#### 数学运算符
```go
+   -   *   /   %   ++   --
```
#### 关系运算符
```go
==   !=   >   <   >=   <=>
```
#### 逻辑运算符
```go
&&   ||   !
```
#### 位运算符
```go
&   |   ^   <<   >>   &^
```
#### 赋值运算符
```go
=   +=   -+   *=   /=   %=   <<=   >>= 
&=   ^=   |=   &^=
```
## 流程控制
```go
if switch for return break continue goto
//没有while dowhile循环统一用for
```
## 函数和方法
#### 函数
```go
func 函数名称(形参列表)(返回值列表){
    函数体相关语句;
    return 返回值;
}
```
#### 方法
```go
func (接收者 接收者类型)函数名称(形参列表)(返回值列表){
    函数体相关语句;
    return 返回值;
}

```
## 编码风格

1. go程序编写在.go后缀文件中
2. 包名一般使用文件所在文件夹的名称
3. 包名全小写
4. main函数只能写在main包中
5. 行最后不用编写分好
6. 函数左括号必须和函数名放在一行
7. 导入包没有使用会报错
8. 定义局部变量没有使用也会报错
9. 定义函数没有使用会报错
10. 方法变量添加说明尽量使用单行注释




