---
title: golang-数组和切片
published: 2023-09-13 08:50:16
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags: [go]
draft: false
---

## 数组的内存分析
新建一个数组 变量名指向的是数组的第一个值的指针
数组元素按照数组占用字节的长度向下排列

## 新建一个数组并循环输出
```go
// 新建一个数组
var arr [3]int
arr[0] = 1
arr[1] = 2
arr[2] = 3
// for循环
for i := 0; i < len(arr); i++ {
    fmt.Println(arr[i])
}
fmt.Println("-----------")
// for range循环
for i, v := range arr {
    fmt.Println(i, v)
}
```

### 新建和初始化数组的方式
四种初始化方式
```go
var arr1 [3]int = [3]int{1, 2, 3}
fmt.Println(arr1)
var arr2 = [3]int{1, 2, 3} // 自动推断类型
fmt.Println(arr2)
var arr3 = [...]int{1, 2, 3} // 不定义长度
fmt.Println(arr3)
var arr4 = [...]int{1: 10, 0: 20, 2: 30} // 不按顺序的下标
fmt.Println(arr4)

arr5 := [3]int{1, 2, 3} //简写
fmt.Println(arr5)
```

## 长度属于数组类型的一部分
```go
func test(arr [3]int) {
	fmt.Println(arr)
}
func main() {
	fmt.Println("main")
	// 长度属于数组类型的一部分
	var arr [3]int = [3]int{1, 2, 3} //如果此处数组长度不为3则报错
	test(arr)
}
```
## 函数传递数组是值传递 需要改变外面的变量值则需要引用传递
```go
func test(arr *[3]int) {
	(*arr)[0] = 100
	fmt.Println(*arr)
}
func main() {
	fmt.Println("main")
	// 长度属于数组类型的一部分
	var arr [3]int = [3]int{1, 2, 3}
	test(&arr)
	fmt.Println(arr)
}
```

## 二维数组
实际上是一维数组的嵌套
arr arr[0] arr[0][0] 指向的是同一个内存地址

### 创建一个二维数组
```go
// 二维数组
var arr [2][3]int = [2][3]int{{1, 2, 3}, {4, 5, 6}}
fmt.Println(arr)
```

### 二维数组的循环
```go
for i := 0; i < len(arr); i++ {
    for j := 0; j < len(arr[i]); j++ {
        fmt.Println(arr[i][j])
    }
}
fmt.Println("-----------")
for i, v := range arr {
    for j, w := range v {
        fmt.Println(i, j, w)
    }
}
```

## 切片 slice()
语法: var 切片名 []类型 = 数组名[开始,结束]
切片是一种建立在数组类型之上的抽象,提供比数组更强大的能力
切片是对数组的一个连续片段的引用,所以切片是一个引用类型.
这个片段可以是整个数组,或者是起始和终止索引标识的一些项的子集.
终止索引标识的项不包含在切片内,切片提供了一个相关数组的动态窗口.

### 定义一个切片
```go
// 声明一个数组
var arr [5]int = [5]int{1,2,3,4,5}
// 定义一个切片 []是动态长度 ,int是类型 
// [1:3]是切出来的片段 左包含右不包含
// 第一种写法
var slice []int = arr[1:3]
// 简化写法
slice := arr[1:3]

fmt.Println(slice) // [2,3]
fmt.Println("切片的容量:",cap(slice)) // 4 大概是两倍左右
```
### 切片的内存分析

切片在内存中包括三个部分 实际上是结构体
- 指向数组的指针
- 切片的长度
- 切片的容量
  
根据以上例子 切片的第一个元素的指针应当等于数组第二个元素的指针
```go
(&arr)[1] == (&slice)[0]
```
改变切片元素的值会改变数组元素的值
```go
var arr [5]int = [5]int{1,2,3,4,5}
slice := arr[1:3]
fmt.Println(slice) // [2,3]
slice[1] = 20
fmt.Println(arr,slice) // [1 2 20 4 5] [2 20]
```

### 切片的定义
第一种 一般定义
```go
var arr [3]int = [3]int{1,2,3}
slice := arr[1,3]
```
第二种方式 使用make内置函数
语法 var 切片名 []类型 = make([]类型,长度,容量)
make在底层会自动创建一个数组 这个数组不能被访问 只能被切片使用
```go
var slice []int = make([]int,3,10)
slice := make([]int,3,10)
```
第三种方式 定义一个切片,直接指定一个数组,使用原理同make方式相似
```go
var slice []int = []int{1,2,3}
slice := []int{1,2,4}
```
### 切片的遍历
与数组的遍历相同

### 切片的注意事项
如果只定义一个切片不给指向数组,则切片的长度为0 没有实际意义
需要让其指向一个数组或者使用make创建一个空间供切片使用
```go
var slice []int
fmt.Println(slice) // []
```
切片的使用不能越界
```go
slice := []int{1,2,3}
fmt.Print(slice[3]) //此处超过长度会报错
```
简写方式
```go
// 开始 0可以省略
slice := arr[0:3] 
slice := arr[:3]
// 结束 0
slice := arr[1:len(arr)] 
slice := arr[1:]
// 同时省略
slice := arr[0:len(arr)]
slice := arr[:]
```
切片可以继续被切片
```go
arr := [6]int{1,2,3,4,5,6}
slice := arr[1:5] // [2,3,4,5]
slice2 := slice[1:3] // [3,4]
```
切片可以动态增长
底层原理:
因为数组长度不可变 所以是用一个新数组拼接老的数组和要添加的数据
所以需要一个新的变量来接收新的数组
```go
slice := []int{1,2,3}
slice = append(slice,7,8,9)
fmt.Println(slice)
```
切片的合并
切片追加切片
后面的...是必写的
```go
slice := []int{1,2,3}
slice = append(slice,[]int{4,5,6}...)
```
切片的拷贝
切片的复制
```go
slice := []int{1,2,3,4,5}
var b []int = make([]int,10)
copy(b,slice) // 将slice中对应的数组元素赋值到b对应的数组中去
fmt.Println(b) // [1 2 3 4 5 0 0 0 0 0]
```