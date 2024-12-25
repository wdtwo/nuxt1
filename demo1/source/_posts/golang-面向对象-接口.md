---
title: golang-面向对象-接口
date: 2023-09-15 14:33:00
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 接口的定义
接口是一种抽象类型，它定义了一组方法的集合，但不提供这些方法的具体实现。
接口用于描述对象的行为，而不关心对象的具体类型。

接口中可以定义一组方法,但是不需要实现,不需要方法体.
并且接口中不能包含任何变量.
到某个自定义类型需要使用的时候(实现接口的时候),再根据具体情况把这些方法具体实现出来.
实现接口要实现接口的所有方法才能实现.
golang中的接口,不需要显式的实现接口(golang中实现接口是基于方法的,不是基于接口的).
接口的目的是定义规范,具体由别人来实现即可.


```go
// 定义一个接口
type Demo interface{
    DemoFunc() string
}
```
demo
- 定义接口
- 定义结构体
- 定义结构体方法
- 定义一个调用结构体方法的函数

### 如果接口中定义了两个方法 则结构体必须实现两个方法 否则会报错
```go
// 定义一个接口
type demo interface {
	say() string
    run() int
}
// 定义一个结构体
type Chinese struct {
}
// 定义一个结构体的方法 此处的返回值要和接口中的返回值相同 否则会报错
func (c Chinese) say() string {
	return "say func play"
}
// 第二个 可以不使用但是不能不定义
func (c Chinese) run() int {
	return 123
}
// 定义一个函数 用来调用结构体的方法
func play(s demo) string {
	return s.say()
}
func main() {
	c := Chinese{}      // 实例化一个结构体
	str := play(c)      // 给调用结构体的函数传入一个具有demo接口中包含方法的结构体实例
	fmt.Println(c, str) // {} say func play
}
```

## 注意事项

### 接口本身是不能创建实例的,但是可以指向一个实现了接口的自定义类型的变量
```go
// 定义一个接口
type demo interface {
	say()
}
// 定义一个结构体
type Chinese struct {
}
// 定义一个结构体的方法
func (c Chinese) say() {
    fmt.Println("say func play")
}
func main() {
	c := Chinese{}      // 实例化一个结构体
	var b demo = c      //此处指向一个实现了接口的结构体实例 就不会报错
	b.say()             //调用接口里的方法 
}
```
### 只要是自定义数据类型,就可以实现接口,不仅仅是结构体类型
```go
type Person interface{
	func1()
}
type integer int // 给int起一个别名
//给integer添加一个方法
func (i integer) func1(){
	fmt.Println("print i = ",i)
}
func main(){
	var i integer = 10 // 实例化一个integer的变量
    var s Person = i   // 让一个接口的实例化变量指向一个integer类型的变量
	s.func1()  // 调用接口方法
	fmt.Println(s,"exit...")
}
```

### 一个自定义类型可以实现多个接口
```go

type Ainterface interface{a()}
type Binterface interface{b()}
type func1 struct{} //自定义类型的结构体 也可以是其他类型
//分别添加两个接口的方法
func (f func1) a(){fmt.Println("this is a.")}
func (f func1) b(){fmt.Println("this is b.")}
func main(){
	var f func1 = func1{} // 创建一个指向结构体的变量
	var a Ainterface = f  // 创建指向结构体实例化变量的接口类型
	var b Binterface = f  // 同上
	a.a() // 调用接口方法
	b.b()
	fmt.Println(a,b,"exit...")
}
```

### 一个接口可以继承多个接口,这是如果要实现A接口,则必须要实现继承来的方法也都实现.
```go
type parent1 interface{func1()}
type parent2 interface{func2()}
// 同时继承两个接口
type child interface{
	parent1
	parent2
	func3()
}
type play struct{}
//必须同时实现被继承接口内的方法
func (p play) func1(){
	fmt.Println("func1...")
}
func (p play) func2(){
	fmt.Println("func2...")
}
func (p play) func3(){
	fmt.Println("func3...")
}
func main(){
	var p play = play{}
	var f1 child = p
	f1.func1() // 执行被继承接口内的方法
	fmt.Println(f1,"exit...") // {}
}
```

### 接口默认是一个指针(引用类型),如果没有对接口初始化就使用,则会输出nil
字面意思

### 如果一个接口没有任何方法就是空接口,我们可以理解为所有类型都实现了空接口,也可以理解为我们可以把任何一个变量赋值给空接口.
```go
type E interface{}
func main(){
var i = 10
var a E = i
fmt.Println(a) // 10
var b interface{} = i
fmt.Println(b) // 10
var c interface{} = b
fmt.Println(c) // 10
fmt.Println("exit...")
}
```