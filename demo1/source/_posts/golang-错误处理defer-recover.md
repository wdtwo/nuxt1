---
title: golang-错误处理refer+recover
published: 2023-09-10 20:17:03
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags: [go]
draft: false
---

## recover
内建函数recover允许程序管理恐慌panic. 在defer函数中,执行recover调用 会取回传至panic调用的错误,恢复执行,停止panic.
若recover在defer的函数外,则不会停止panic程序列.如果panic实参为nil,recover则不为nil,否则反之.
```go
func main(){
	var (
		a = 10
		b = 0
	)
	chu(a,b)
    fmt.Println("程序执行结束!")
}
func chu(a int,b int){
	defer func(){
		err := recover()
		if err != nil{
			fmt.Println("此处有报错: ",err)
		}
	}()
	var sum int = 0
	sum = a / b // 此处被除数为0 应当报错
	fmt.Println(sum)
}
// 此处有报错:  runtime error: integer divide by zero
// 程序执行结束!
```

## 自定义错误
引用errors包
语法 errors.New(string) error
```go
func main(){
	var (
		a = 10
		b = 0
	)
	err := chu(a,b)
	if err != nil{
		fmt.Println(err)
        panic(err) // 如果不想向下继续执行可以调用panic 会停止程序执行
	}
	fmt.Println("程序执行结束!")
}
func chu(a int,b int) error{
	if b == 0{
		//如果除数为0则返回error
		return errors.New("除数不能数为0")
	}else{
		//如果除数不为0 则返回nil
		var sum int = 0
		sum = a / b
		fmt.Println(sum)
		return nil
	}
}
```