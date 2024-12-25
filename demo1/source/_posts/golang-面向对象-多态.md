---
title: golang-面向对象-多态
date: 2023-09-15 20:06:00
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 多态的定义
变量(实例)具有多种形态,面向对象的第三大特征,在go中,多台特征是通过接口实现的.
可以按照统一的接口来调用不同的实现,这时接口变量就呈现不同的形态.

chatgpt:
通常是指一个接口类型可以引用不同的具体类型，并且在运行时根据具体类型的实现来调用不同的方法。这是面向对象编程中的一个关键概念，允许你编写通用的代码，以处理不同类型的对象，而不必关心这些对象的具体类型。
```go
// Animal 接口定义了一个方法 Speak，不同的动物类型将实现这个方法。
type Animal interface {
	Speak() string
}
// Dog 结构体实现了 Animal 接口的 Speak 方法。
type Dog struct{}
func (d Dog) Speak() string {
	return "汪汪汪！"
}
// Cat 结构体也实现了 Animal 接口的 Speak 方法。
type Cat struct{}
func (c Cat) Speak() string {
	return "喵喵喵！"
}
func main() {
    // 此处体现了多态 用一个接口类型指向不同的实际类型
	// 使用接口类型 Animal 来引用不同的具体类型（Dog 和 Cat）的对象。
	var myDog Animal = Dog{}
	var myCat Animal = Cat{}
    // 相同的接口的不同变量 调用同一方法实现不同的功能.
	// 调用 Speak 方法时，具体的实现将根据对象的类型而不同。
	fmt.Println("我的狗:", myDog.Speak())
	fmt.Println("我的猫:", myCat.Speak())
}
```

### 多态参数
多态参数通常指的是在函数或方法中接受接口类型作为参数的情况。这意味着你可以将不同的具体类型的对象传递给这个函数或方法，而不必关心对象的实际类型，因为它们都实现了相同的接口，从而可以在函数内部调用接口定义的方法。
```go
type Inter interface{say()}
type cat struct{}
func (c cat) say(){
	fmt.Println("cat")
}
type dog struct{}
func (d dog) say(){
	fmt.Println("dog")
}
// 此处函数的参数不用知道参数的具体类型 只需要知道参数实现了Inter的方法即可
func play(i Inter){
	fmt.Println(i)
}
func main(){
	var c cat = cat{}
	var d dog = dog{}
	play(c)
	play(d)
	fmt.Println("exit...")
}
```

### 多态数组
借助接口可以创建一个多态的数组
```go
type Inter interface{say()}
type cat struct{
	Name string
}
func (c cat) say(){
	fmt.Println("cat")
}
type dog struct{
	Name string
}
func (d dog) say(){
	fmt.Println("dog")
}
func main(){
	// 创建一个数组 类型是接口
	var arr [2]Inter = [2]Inter{}
	// 数组是接口类型 只要实现了say()接口的方式都可以存进去
	arr[0] = cat{"花花"}
	arr[1] = dog{"富贵"}
	fmt.Println(arr,"exit...") // [{花花} {富贵}]
}
```