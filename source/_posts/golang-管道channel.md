---
title: golang-管道channel
date: 2023-09-16 22:07:04
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 管道channel

- 管道的本质是列队 先进先出
- 自身线程安全,多个协程操作同一个管道时,不会发生资源竞争问题
- 管道有类型,一个string类型的管道只能存放string类型的数据

### 管道的定义
语法: `var 变量名 chan 数据类型`
chan是管道的关键字
数据类型是指管道的类型,里面存放数据的类型
管道是引用类型,必须初始化才能写入数据,即用make后才能使用

### 管道的声明 写入和读取
```go
// 声明一个管道
var stringChan chan string
stringChan = make(chan string, 3) // 必须声明了才能使用 否则为nil 可以存放3个string类型数据
fmt.Println(stringChan)           // 0xc0000220c0 引用类型
//向管道中存入数据
stringChan <- "hello"
str := "world"
stringChan <- str
// 不能存放大于容量的数据 否则会报错

// 从管道中取数据
str1 := <-stringChan
fmt.Println(str1)
//在不使用协程的情况下,如果当前管道中已经没有数据了 再继续取数据就会报错
fmt.Printf("len=%d,cap=%d\n", len(stringChan), cap(stringChan)) // len=2,cap=3
fmt.Println("exit...")
```

### 管道的关闭
管道关闭以后读数据可以 写数据会报错
```go
// 声明一个管道
var intChan chan int
intChan = make(chan int, 3)
intChan <- 10
intChan <- 20
close(intChan) // 关闭管道
num := <- intChan
fmt.Println(num) // 10
fmt.Println("exit...")
```

### 管道的遍历
支持for range循环:
- 如果管道没有关闭,则会出现deadlock的错误
- 如果管道已经关闭,则会正常遍历数据,遍历完后,就会退出遍历

```go
var intChan chan int = make(chan int, 3)
intChan <- 10
intChan <- 20
intChan <- 30
close(intChan)
// 管道没有索引 所以没有index只接收一个v
for v := range intChan {
    fmt.Println(v)
}
```

### 管道可以声明只读或者只写
```go
// 只写管道
var intChan chan<- int = make(chan<- int, 3)
intChan <- 10
fmt.Println(intChan) // 0xc000020180

// 只读管道
var intChan2 <-chan int
if intChan2 != nil {
    num1 := <-intChan2
    fmt.Println(num1)
}
```

### 管道的阻塞
只写不读会出现阻塞 阻塞的数据会在后面排队 如果有读取操作即使很慢也不会阻塞
此demo中线写入10个参数 然后每秒读取一个参数 当读取出一个参数后会立即写入一个参数
```go
import (
	"fmt"
	"strconv"
	"sync"
	"time"
)
// 引用一个协程阻塞结构体
var wg sync.WaitGroup

func write(intChan chan int) {
	defer wg.Done()
	for i := 0; i < 20; i++ {
		intChan <- i
		fmt.Println("写入了一个数据:", strconv.Itoa(i))
	}
    close(intChan) // 写入完成关闭管道
}
func read(intChan chan int) {
	defer wg.Done()
	for i := 0; i < 20; i++ {
		num := <-intChan
		fmt.Println("读取了一个数据:", strconv.Itoa(num))
		time.Sleep(time.Second)
	}
}
func main() {
    // 新建一个管道
	var intChan chan int = make(chan int, 10)
	wg.Add(2) // 2个协程
	go write(intChan)
	go read(intChan)
	wg.Wait()
	fmt.Println("exit...")
}
```

### select功能
解决多个管道的选择问题,也可以叫多路复用,可以从多个管道中随机公平的选择一个来执行
case后面必须进行io操作,不能是等值,随机去选择一个io操作
default方式select被阻塞
语法:
```go
select{
    case v := <-intChan :
        time.Sleep(time.Second*3)
        fmt.Println(v)
    case v := <-stringChan :
        time.Sleep(time.Second*1)
        fmt.Println(v)
    default:
        fmt.Println("防止被阻塞")
}

```
```go
var intChan chan int = make(chan int, 1)
var stringChan chan string = make(chan string, 1)

go func() {
    time.Sleep(time.Second * 2)
    intChan <- 10
}()
go func() {
    time.Sleep(time.Second * 3)
    stringChan <- "abc"
}()
// 自动选择较快的执行 如果不想阻塞就写default
select {
case v := <-intChan:
    fmt.Println(v)
case v := <-stringChan:
    fmt.Println(v)
    // default:
    // 	fmt.Println("拒绝阻塞")
}
fmt.Println("exit...")
```




### 管道和协程同时工作的案例
```go
// 协程阻塞
var wg sync.WaitGroup
// 定义一个管道
var intChan chan int
// 创建一个协程 向管道中写50个整数
func write(Chan chan int) {
	defer wg.Done()
	for i := 0; i < 5; i++ {
		Chan <- i
		fmt.Println("写入数据:", strconv.Itoa(i))
		time.Sleep(time.Second)
	}
	fmt.Println("写入完成")
	close(Chan)
}
// 定义一个协程 向管道中读50个整数
func read(Chan chan int) {
	defer wg.Done()
	for i := 0; i < 5; i++ {
		a := <-Chan
		fmt.Println("读取数据:", strconv.Itoa(a))
		time.Sleep(time.Second)
	}
	fmt.Println("读取完成")
}
func main() {
	intChan = make(chan int, 5)
	wg.Add(2)
	go write(intChan)
	go read(intChan)

	wg.Wait()
	fmt.Println("exit...")
}
```

