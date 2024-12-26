---
title: golang-defer关键字
date: 2023-09-10 20:17:03
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## defer关键字
为了在函数执行完毕后及时释放资源
```go
func test(a int,b int) int{
	// defer 先把行后面的代码存放到一个栈中 
	// 栈的特点是先进后出 所有后进的先执行
	defer fmt.Println("a=",a) // 3
	defer fmt.Println("b=",b) // 2
    a += 30 // 此处 defer把代码存入栈中以后 下面对变量进行操作不会改变栈中的数据
	b += 40
	var sum int = a + b
	fmt.Println("sum=",sum) // 1
	return sum
}

func main(){
	fmt.Println(test(10,20)) // 4
}
// 执行顺序
// sum= 100
// b= 20
// a= 10
// 100
```
使用场景
调用某个资源以后,直接写defer关键字,不用考虑什么时候释放资源,程序运行结束后会自动执行defer释放资源


