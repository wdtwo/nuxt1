---
title: golang-创建结构体实例
date: 2023-09-13 08:50:16
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 结构体实例化的方法

```go
// 定义一个结构体
type Person struct {
	Name string
	Age  int
	Sex  string
}

func main() {
	// 第一种 一般方式
	var p1 Person = Person{}
	fmt.Println(p1) // { 0 }
	// 第二种实例化并赋值
	var p2 Person = Person{Name: "Gary Wang", Age: 33, Sex: "nan"}
	fmt.Println(p2) // {Gary Wang 33 nan}
	// 简化写法 参数顺序需要和定义的顺序相同
	p3 := Person{"Gary Wang", 33, "nan"}
	fmt.Println(p3) // {Gary Wang 33 nan}
	// 返回指针类型
	var p4 *Person = &Person{
		Name: "Gary Wang",
		Age:  33,
		Sex:  "nan",
	}
	fmt.Println(p4) // &{Gary Wang 33 nan}
}
```

## 跨包请求结构体创建实例

```go
// util.go
package util
type Person struct {
	Name string
	Age  int
}
```
```go
// main.go
import (
	"demo4/util" // 此处引入包
	"fmt"
)
func main() {
	// 跨包创建结构体实例
	p1 := util.Person{ //
		Name: "Gary Wang",
		Age:  33,
	}
	var p2 util.Person = util.Person{ // 类型也要加包名
		Name: "Gary Wang",
		Age:  33,
	}
	fmt.Println(p1) // {Gary Wang 33}
	fmt.Println(p2) // {Gary Wang 33}
}
```

## 如何引用其他包的内置结构体

```go
// util.go
package util
type person struct { // 此处person为小写开头 私用
	Name string
	Age  int
}
// 通过工厂模式创建内置结构体
func NewPerson(name string, age int) *person {
	return &person{Name: name, Age: age} // 返回一个结构体的指针
}
```

## 引用其他包的内置结构体

```go
// util.go
type person struct {
	Name string
	Age  int
}
// 通过工厂模式创建内置结构体
func NewPerson(name string, age int) *person {
	return &person{Name: name, Age: age}
}
```
```go
// main.go
import (
	"demo4/util"
	"fmt"
)
func main() {
	// 跨包创建私域结构体实例
	p1 := util.NewPerson("Gary", 33)
	fmt.Println(p1)      // {Gary Wang 33}
	fmt.Printf("%T", p1) // *util.person
}
```