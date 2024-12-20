---
title: golang-面向对象-继承
date: 2023-09-15 10:43:00
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## 继承的定义
提高复用性
- 把共同的属性和方法放到一个父结构体中,可以多次继承,不用每次都创建,只需要嵌套一个匿名结构体即可.
- 也就是说在golang中,如果一个结构体嵌套了一个匿名结构体 则这个结构体可以直接访问这个匿名结构体的属性和方法.

## 代码的引入
```go
// person.go
// 创建一个结构体
type Person struct {
	Name string
	Age  int
}
// 创建一个结构体的方法
func (p Person) SayHello() {
	fmt.Println("Hello, I'm Person", p.Name)
}
// 创建一个新的结构体
type Student struct {
	Person         // 此处引用Person结构体
	Height float32 // 定义一个新的属性
}
func (s Student) SayHello() {
	fmt.Println("Hello, I'm Student:", s.Name)
}
```
```go
// main.go
p1 := person.Person{Name: "李雷"}     // 此处实例化person结构体
p1.SayHello()                        // 调用结构体的方法
fmt.Println(p1)                      // {abc 0} Name Age
s1 := person.Student{person.Person{Name:"韩梅梅"},Height: 170.5}  // 实例化Student结构体
s1.SayHello()                        // 调用结构体的方法  此处子结构体的方法可以覆盖父结构体的方法
fmt.Println(s1)                      // {{def 0} 176.5} 这里先显示的继承来的属性值 然后是自定义的属性值
fmt.Println(s1.Person.Name)          // def 可以直接调用继承的属性
fmt.Println(s1.Name)                 // 可以省略被嵌套结构体
```

## 注意事项

- 嵌套的结构体可以使用被嵌套结构体的所有属性和方法,不论大写还是小写
- 匿名结构体字段的访问可以简化`s1.Person.Name => s1.Name`
- 当结构体和匿名结构体有相同的属性或者方法时候,会使用结构体的属性或者方法
- 如果想访问匿名结构体的属性或者方法可以用过匿名结构体名来访问`s1.person.Name`
- golang中支持多继承,一个结构体可以继承多个结构体,为了提高代码的简洁性,建议不要如此使用
- 如果嵌入结构体的匿名结构体之前属性和方法有冲突,则需要通过匿名结构体名来访问
- 如果多个结构体的属性有冲突就不能使用简化的方式引用,因为程序没有默认选择是哪个属性
- 结构体的匿名字段可以是基本数据类型

```go
// main.go
// 创建一个结构体
type Person struct {
	Name string
	Age  int
}
// 创建一个新的结构体
type Student struct {
	Integer int  // 基本数据类型 此处基本数据类型int首字母为小写 所以只能本包内使用 如果想要其他包使用需要给int取别名 例如 Integer int
}
func main() {
	p1 := Person{} // 此处实例化person结构体
	s1 := Student{Person{Name: "小明"}, 176} //Person{} Integer
	s1.Name = "韩梅梅" // 此处继承来的结构体属性不能写在 上面实例化的{}中 否则会报错
	fmt.Println(s1.int) // 这里先显示的继承来的属性值 然后是自定义的属性值
}
```

### 传入匿名函数的指针
```go
// main.go
type person struct {
	Name string
}
type student struct {
	*person // 匿名函数的指针类型
	integer int
}
func main() {
	s1 := student{
		&person{Name: "Gary Wang"}, // 传入值的指针
		66, // integer
	}
	// 第一个是指针类型所以用 * 第二个取了别名 所以int不能使用
	fmt.Println(*s1.person, s1.integer) // {Gary Wang} 66
	fmt.Println("exit...")
}
```
### 结构体字段可以是结构体类型

```go
type person struct {
	Name string
}
type student struct {
	integer person // 组合模式 比喻成别名更好理解
}
func main() {
	s1 := student{person{Name: "abc"}} // 此处的person{} 不能使用integer  因为实际写的是 integer:Person{}
	s1.integer.Name = "def"
	fmt.Println(s1) // {Gary Wang} 66
	fmt.Println("exit...")
}
```

