---
title: golang-结构体
date: 2023-09-13 08:50:16
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 结构体

golang中没有class类 结构体类似于其他语言的class类

```go
// 定义一个结构体
type Person struct {
	Name string // 大写才能被外部调用
	Age  int
	Sex  string
}
func main() {
	// 实例化这个结构体
    var p0 Person
    fmt.Println(p0) // { 0 }   分别为 字符串 数字 字符串 的默认值
	var p1 Person
	p1.Name = "小明"
	p1.Age = 11
	p1.Sex = "男"
	fmt.Println(p1) // {小明 11 男}
}
```

## struct结构体实例的创建
实例化没有赋值
```go
var p1 Person = Person{}
fmt.Println(p1)
```
实例化并赋值
```go
var p2 Person = Person{"Garywang", 33, "nan"}
fmt.Println(p2)
```
返回结构体指针
此处p3指向的是结构体的指针 p3指向的是一个内存地址 需要给内存地址指向的对象进行赋值
```go
var p3 *Person = new(Person)
var p4 *Person = &Person{}
(*p3).Name = "小明"
p4.Name = "小明" // 为了方便简化的写法 底层会自动转化为(*p4)
fmt.Println(*p3)
fmt.Println(*p4)
```

## 结构体之间相互转换
结构体是用户单独定义的类型,和其他类型进行转换时需要有完全相同的字段(例如:名字 个数和类型)
```go
var p Person = Person{Age:10}
var s Student = Student{Age:20}
p = Person(s) // 强制转换
fmt.Println(p) // 20
```
结构体进行type重新定义(相当于起别名) golang认为是新的数据类型,但是可以强制转换
```go
type Person struct{
	Age int
}
type Per Person // 相当于起别名

func main(){
	var p1 Person = Person{Age:10}
	var p2 Per = Per{Age:20}
	p1 = Person(p2) // 强制转换
	fmt.Println(p1) // {20}
}
```