---
title: golang-面向对象-断言
published: 2023-09-15 20:56:00
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags: [go]
draft: false
---

## 断言的定义

go中有一个语法,可以直接判断一个变量是否是该类型:
`value,ok = element.(T)`,这里value就是变量的值,ok是一个bool类型,element是interface变量,T是断言的类型.
```go
type Inter interface{say()}
type Chinese struct{}
// 创建一个结构体的接口方法
func (c Chinese) say(){
	fmt.Println("chinese say")
}
// 创建一个结构体的特有方法
func (c Chinese) run(){
	fmt.Println("跳大神")
}
type Amrican struct{}
func (c Amrican) say(){
	fmt.Println("Amrican say")
}
// 以接口为变量类型的函数
func play(i Inter){
	i.say()
    // 二选一
    if ch,flag := i.(Chinese);flag{ // 断言i是不是Chinese类型 如果是的话把i赋值给ch flag是否转成功
        fmt.Println("成功了")
        ch.run() //调用ch.run() 因为前面断言了ch的类型
    }else{
        fmt.Println("失败了")
    }
    // 多选一
	// 如果存在多个判断可以使用switch来判断
    switch i.(type){ // 这里type属于go中的关键字,固定写法
        case Chinese:
            ch := i.(Chinese)
            ch.run()
        case Amrican:
            us := i.(Amrican)
            us.disco()
    }
}
func main(){
	var c Chinese = Chinese{}
	var a Amrican = Amrican{}
	play(c)
	play(a)
	fmt.Println("exit...") 
    // 输出
	// chinese say
	// 成功了
	// 跳大神
	// Amrican say
	// 失败了
}
```







