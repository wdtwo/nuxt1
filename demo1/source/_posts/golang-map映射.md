---
title: golang-map映射
date: 2023-09-13 08:50:16
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 定义
映射是一种内置类型
可以将键值对关联起来,可以通过key来获取value
类似于其他语言的集合
基本语法: var 变量名 map[key类型]value类型
```go
// 创建一个映射
var a map[int]string
// 如果创建以后不用make初始化,不会分配内存空间
// make(类型,长度)
a = make(map[int]string,10) // 可以存放10个键值对 10可以省略不写 会自动分配一个内存
// 为a的键值对赋值 
a[11111] = "小明"
fmt.Println(a) // map[11111:小明]
```
key value的类型可以是 bool 数字 string channel管道
还可以是接口 结构体 数组 但是用的比较少
key通常为int string类型 
value通常为 数字 string map 结构体
key不可以是slice map function

map的key-value是无序的
如果key重复了后赋值的会替换之前的value

### map的三种创建方式
方式一
```go
var a map[int]string
a = make(map[int]string,10)
```
方式二
```go
a := make(map[int]string)
a[11111] = "小明"
fmt.Println(a) // map[11111:小明]
```
方式三
```go
a := map[int]string{
    1111 : "小明", // 此处行尾必须加 ,
}
fmt.Println(a)
```

### 对map进行的操作

增删改查

增加和更新就是直接赋值
清空操作
没有一键清空方式 可以循环删除
或者重新make一个新的让原来的变成垃圾,go会自动回收
```go
a := make(map[int]string)
a[1] = "aaaaa" // 增
a[1] = "bbbbb" // 改
fmt.Println(a)
// 查询语法 value,bool = 映射名字[key] 如果找到了返回true 没找到返回false
value,flag := a[1] // 查
fmt.Println(value,flag) // bbbbb true

// 通过delete内置函数来删除
// 第一个参数是要被删除的映射,第二个参数是要删除的key
// 如果没有的话也不会报错
delete(a,1)
a = make(map[int]string) //重新定义 相当于清空
```
### 获取长度
```go
a := make(map[int]string)
a[111] = "张三"
fmt.Println(len(a)) // 1
```
### 遍历
只支持for range操作
```go
// 创建一个map
a := make(map[int]string)
// 赋值
a[1] = "aaaaa" 
a[2] = "bbbbb"
a[3] = "ccccc" 
// 循环
for k,v := range a{
    fmt.Println(k,v)
}
```
双层map的遍历
```go
// 创建一个双层映射
a := make(map[string]map[int]string)
// 给第一层映射赋值
a["一班"] = make(map[int]string,2)
a["一班"][101] = "小明"
a["一班"][102] = "小籍"
a["二班"] = make(map[int]string,2)
a["二班"][201] = "小新"
a["二班"][202] = "小张"

for k1,v1 := range a{
    fmt.Println(k1,v1)
    for k2,v2 := range v1{
        fmt.Println(k2,v2)
    }
}
// 二班 map[202:小张 201:小张]
// 202 小张
// 201 小张
// 一班 map[101:小明 102:小籍]
// 101 小明
// 102 小籍
```








