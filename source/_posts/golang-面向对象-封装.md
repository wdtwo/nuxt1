---
title: golang-面向对象-封装
date: 2023-09-15 09:52:00
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 封装的定义

封装就是把抽象出的字段和字段的操作封装在一起,
数据被保护在内部,程序的其他包只有通过被授权的方法才能进行操作.

封装的好处:
- 隐藏处理的细节直接调用
- 可以对操作的数据进行验证,提高安全性

如何实现封装:

建议将结构体 字段(属性)的首字母小写,其他包不能使用,实际开发不小写也行,规定的不是很严格
给结构体所在的包提供一个工厂函数,首字母大写

提供Set方法提供设置参数
func Set函数名(参数) {
	此处可以处理数据
}
提供Get方法用来获取参数
func Get函数名(参数) 返回值类型{
	此处可以处理数据
	return 返回值
}

## 实例

```go
// person.go
// 创建一个结构体
type person struct {
	Name string
	age  int
}
// 给结构体添加工厂函数 相当于构造器
func NewPerson(str string) person { //此处的返回值可以是指针类型 *person
	return person{Name: str} // &person{Name:str}
}
//给结构体添加set方法 用来操作age字段
func (p *person) SetAge(a int) {
	if a > 0 && a < 128 {
		p.age = a
	} else {
		fmt.Println("age 错误")
	}
}
// 添加get方法 用来获取age字段
func (p *person) GetAge() int {
	return p.age
}
```
```go
// main.go
import (
	"demo4/person"
	"fmt"
)
func main() {
	p1 := person.NewPerson("Gary Wang") // 创建一个结构体的实例
	p1.SetAge(33)            // 给结构体赋值的方法
	fmt.Println(p1.GetAge()) // 输出结构体的get方法的返回值 => 33
	fmt.Println(p1)          // 输出结构体 => {Gary Wang 33}
}
```
