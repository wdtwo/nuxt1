---
title: golang-函数和方法的区别
published: 2023-09-14 22:51:28
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags: [go]
draft: false
---

## 函数和方法的区别

- 函数不需要绑定指定类型
- 方法会绑定执行类型

调用方式不同:

- 函数直接用`函数名(参数)`进行调用
- 方法需要用 `变量.方法名(参数)`进行调用

```go
// 定义一个结构体
type Student struct{
	Name string
}
// 定义一个结构体的方法
func (s Student) test() {
	fmt.Println(s)
}
// 定义一个函数
func methods(s Student){
	fmt.Println(s)
}
func main(){
	var s Student = Student{"Gary Wang"}
	// 调用函数
	methods(s) // 此处如果传入指针类型会报错
	// 调用方法
	s.test() //此处传入指针类型不会报错 底层会自动转化
}
```

- 对于函数来说,参数类型对应的是什么就要传入什么
- 对于方法来说接受者为值类型,可以传入指针类型,接受者为指针类型,可以传入值类型 其实是系统自动转换了
  