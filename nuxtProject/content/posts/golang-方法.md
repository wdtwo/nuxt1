---
title: golang-方法
date: 2023-09-14 21:56:11
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## 方法

方法是作用在指定的数据类型上 和指定的数据类型绑定 因此自定义类型,都可以有方法,而不仅仅是struct

1. func (a A) test() 相当于A结构体有一个方法test
2. (a A)体现方法test和结构体A绑定的关系
3. 结构体对象传入test方法中,是值传递,和函数的参数传递是一致的

### 基本实例
```go
// 定义一个结构体
type Person struct{
	Age int
}
// 此处于函数的区别是在函数名之前有一个括号 包括结构体的类型和实例化 后面跟方法名
// 说明这个方法是和结构体绑定的 并传入p作为结构体的引用参数
func (p Person) test(){
	fmt.Println(p.Age) // => 10
}
func main(){
	var p Person = Person{}
	p.Age = 10
	p.test() // 调用 => 10
}
```

### 通过引用传递可以让方法内改变方法外的变量值
```go
func (p *Person) test(){ // 此处用指针传递
	p.Age = 100 // 此处使用了简化写法 实际应当是(*p)
}

func main(){
	var p Person = Person{}
	p.Age = 10
	p.test() // 此处使用了简化写法 实际应当是(&p)
	fmt.Println(p.Age) // => 100
}
```

### 基本数据类型绑定方法
以int为例
```go
// 基本数据类型不能直接添加方法 需要使用别名才行
type integer int
func (i integer) double() integer{
	return i * 2 //可以使用return把得到的结果传回去
}
func main(){
	var a integer = 100
	fmt.Println(a.double()) // 200
}
```

### 方法的范围控制
和函数相同 首字母大写可以跨包访问 首字母小写本包访问

### 如果一个类型拥有了String()方法
那么执行fmt.Println的时候,默认会调用这个变量的String()进行输出
fmt.Println(str) // 会自动调用 str.String()
```go
// 定义一个结构体
type Student struct {
	Name string
	Age int
}
// 定义一个方法
func (s Student) String() string{
	str := fmt.Sprintf("Name的值为:%v,Age的值为:%v",s.Name,s.Age)
	return str
}
func main(){
	var str Student // 实例化一个结构体
	str.Name = "Gary Wang"
	str.Age = 55
	// 此处自动使用了简化写法 实际是 &str
	fmt.Println(str) // Name的值为:Gary Wang,Age的值为:55
	fmt.Println(&str) // Name的值为:Gary Wang,Age的值为:55
}
```






