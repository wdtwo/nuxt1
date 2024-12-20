---
title: golang-协程goroutine
date: 2023-09-16 21:07:04
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## 协程(goroutine)的作用
在执行A函数的时候,可以随时中断,去执行B函数,然后中断继续执行A函数(可以自动切换),
注意这一切换过程并不是函数调用(没有调用函数),过程很像多线程,然而协程中只有一个线程在执行(协程的本质是单个线程)

### 开启一个协程
```go
func test() {
    // 此处协程比主线程需要的时间更长 主线程一旦结束协程也会结束
	for i := 0; i < 10; i++ {
		fmt.Println("test func:", strconv.Itoa(i))
		time.Sleep(time.Second * 1)
	}
}
func main() {
	go test() // 开启一个协程

    //开启一个匿名函数的协程
    go func(){
        fmt.Println(111)
    }()

	for i := 0; i < 5; i++ {
		fmt.Println("main func:", strconv.Itoa(i))
		time.Sleep(time.Second * 1)
	}
	fmt.Println("exit...")
}
```

### 启动多个协程
```go
for i := 0; i < 5; i++ {
    go func(i int) {
        // 几个协程启动的顺序是随机的 所以i的顺序也是随机的
        fmt.Println("test func:", strconv.Itoa(i))
    }(i)
}
time.Sleep(time.Second * 1)
```

### 使用WaitGoroutine退出协程

Waitgroutine用于等待一组协程的结束.父线程调用Add方法来设定应等待的写成的数量.
每个被等待的协程在结束时应调用Done方法.同时,主线程里可以调用Wait方法阻塞至所有线程结束.
解决主线程在协程还没有结束的时候先结束.

在`sync`包下有`WaitGroup`结构体,
这个结构体下有三个方法:
1. `func(*WaitGroup)Add(delta int)`
2. `func(*WaitGroup)Done()`
3. `func(*WaitGroup)Wait()`

如果开始就知道协程次数的情况下可以先操作Add()
Add()中加入的数字和协程的次数一定要保持一致
```go
// 实例化一个结构体 不需要赋值
var wg sync.WaitGroup
func main() {
    //创建五个协程
	for i := 0; i < 5; i++ {
		wg.Add(1) // 协程开始的时候加1操作
		go func(n int) {
            defer wg.Done() // 执行完成以后减1操作
			fmt.Println(n)
		}(i)
	}
    // 主线程等待协程,什么时候wg减少到0什么时候停止阻塞
	wg.Wait()
	fmt.Println("exit...")
}
```

### 多个协程操作同一个数据
此处出错的可能性 因为 每个协程的循环进行了三步操作 先取值 再加一或减一 再赋值
可能一个协程在取完值没赋值之前另外一个协程也开始取值后赋值 就覆盖了前面协程的值 所以会出错
```go
// 加入互斥锁
var lock sync.Mutex

var wg sync.WaitGroup
var totalNum int

func add() {
	defer wg.Done()
	for i := 0; i < 100000; i++ {
        lock.Lock() // 锁上互斥锁
		totalNum = totalNum + 1
        lock.Unlock() // 打开互斥锁
	}
}
func sub() {
	defer wg.Done()
	for i := 0; i < 100000; i++ {
		lock.Lock()
		totalNum = totalNum - 1
        lock.Unlock()
	}
}
func main() {
	wg.Add(2) // 两个协程
	go add()  // 启动协程
	go sub()
	wg.Wait() // 阻塞
	fmt.Println(totalNum) // 不加互斥锁不等于0 加上互斥锁以后结果为0
	fmt.Println("exit...")
}
```
#### 解决以上问题
使用*互斥锁*,确保一个协程在执行逻辑的时候另一个协程等待
使用`sync`包的`Mutex`结构体
互斥锁要加锁解锁,性能和效率相对较低
两个方法:
1. func(m *Mutex) Lock()
2. func(m *Mutex) Unlock()

### 如果读多写少需要用读写锁
在读的时候不产生影响,在写和读之前才会产生影响
```go

var wg sync.WaitGroup

// 加入读写锁
var lock sync.RWMutex

func read() {
	defer wg.Done()
	lock.RLock() // 添加读锁
	fmt.Println("开始读数据")
	time.Sleep(time.Second)
	fmt.Println("读取完成")
	lock.RUnlock() // 解除读锁
}
func write() {
	defer wg.Done()
	lock.Lock() // 添加写锁
	fmt.Println("开始写操作")
	time.Sleep(time.Second * 3)
	lock.Unlock() // 解除写锁
}
func main() {
	wg.Add(6)
    //多新建几个读进程
	for i := 0; i < 5; i++ {
		go read()
	}
	go write()
	wg.Wait()
	fmt.Println("exit...")
}
```

## 用defer + recover 来解决多个协程中某一个出错影响所有进程的问题
```go
var wg sync.WaitGroup
func printNum() {
	defer wg.Done()
	for i := 1; i <= 10; i++ {
		fmt.Println("printnum :", strconv.Itoa(i))
	}
}
func chufa() {
	defer wg.Done()
	// 引用 defer + recover 错误处理机制
	defer func() {
		err := recover()
		if err != nil {
			fmt.Println("程序出错了:", err)
			return
		}
	}()
	num1 := 10
	num2 := 0 // 被除数不能为0
	fmt.Println("chufa :", strconv.Itoa(num1/num2))
}
func main() {
	wg.Add(2)
	go printNum()
	go chufa()
	wg.Wait()
	fmt.Println("exit...")
}
```









