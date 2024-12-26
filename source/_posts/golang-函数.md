---
title: golang-函数
date: 2023-05-11 15:17:01
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---
函数

<!--more-->

## 定义一个函数
跨包的函数需要首字母大写
```go
// 返回值类型int 如果只有一个返回值则可以不写()
func add(a int, b int) (int) {
	return a + b
}
func main() {
	fmt.Println(add(1, 2))
}

// 两个返回值 多个参数不想接收的可以用 _ 来忽略
func add(a int, b int) (int, int) {
	return a + b, a - b
}
func main() {
	a, b := add(1, 2)
	fmt.Println(a, b)
}
```

## 不支持重载
相同函数重新声明会报错
```go
func demo1(a int, b int) {
	fmt.Println(a + b)
}
func demo1(a int) {
	fmt.Println(a)
}
```
## 可变长度参数
```go
func main() {
	fmt.Println("main")
	test()
	test(1)
	test(1, 2, 3)
}
// 可变长度参数
func test(args ...int) {
	// 用切片的方式来接收
	for i := 0; i < len(args); i++ {
		fmt.Printf("args[%d]=%d \n", i, args[i])
	}
}
```

## 基本数据类型和数组进行值传递
值传递是只传递值 函数内部改变值不会导致函数外数据的改变
引用传递是改变函数内部的值会改变函数外部的变量
```go
// 值传递
func main() {
	fmt.Println("main")
	var a int = 10
	test(a)
	fmt.Println("test a = ", a)
}
func test(a int) {
	a = 20
	fmt.Println(a)
}
// 引用传递 通过 * 来进行引用传递 把外部变量的指针直接传递到函数里 再进行操作即可
func main() {
	fmt.Println("main")
	var a int = 10
	test(&a)
	fmt.Println("test a = ", a)
}
func test(a *int) {
	*a = 20
	fmt.Println(*a)
}
```

## 函数可以作为值被变量引用
基本实例
```go
func main() {
	fmt.Println("main")
	fun := test
	fun(10)
}
func test(a int) {
	fmt.Println(a)
}
```
函数作为参数传递进另一个函数
```go
func main() {
	fmt.Println("main")
	fun := test
	getFunc(10, test)
	getFunc(10, fun)
}
func test(a int) {
	fmt.Println("test")
	fmt.Println(a)
}
func getFunc(a int, testFunc func(int)) {
	fmt.Println("getFunc")
	testFunc(a)
}
```

## 为了简化数据类型定义 go支持自定义数据类型
其实相当于给数据类型起别名
虽然是相当于起别名 但是go还是认为自定义的是一种新的数据类型
如果想要相互转换需要强转
基本语法 type 自定义类型别名 数据类型
```go
func main() {
	fmt.Println("main")
	type myInt int
	var num1 myInt = 10
	var num2 int = 20
	num2 = int(num1) //此处如果不强转会报错提示不是相同类型
	fmt.Println(num2)
}
```

## 可以给函数起别名 方便数据传递时候参数类型的书写
```go
type myFunc func(int)

func main() {
	fmt.Println("main")
	test(10, t)
}
func t(a int) {
	fmt.Println("test:", a)
}
func test(a int, testFunc myFunc) {
	testFunc(a)
}
```
## 支持给返回值命名
这样返回值的顺序不会影响最终返回值的位置
```go
func main() {
	fmt.Println("main")
	a, b := test(10, 20)
	fmt.Println(a, b)
}

func test(a int, b int) (res1 int, res2 int) {
	res1 = a + b  // 此处需要注意是 = 不是 :=
	res2 = a - b  // 此处需要注意是 = 不是 :=
	return
}
```

## init函数
初始化函数,可以用来进行一些初始化的操作
init函数在main函数之前被执行
全局变量在init函数之前执行
```go
var n1 int = test()
func test() int{
	fmt.Println("test func")
	return 10
}
func init(){
	fmt.Println("init func")
}
func main(){
	fmt.Println("mian func")
}
// 执行顺序
// test func
// init func
// mian func
```
如果包中含有init函数 则先执行包中的init函数再执行main中的全局变量

## 匿名函数
如果有个函数只需要被调用该一次可以使用匿名函数

### 在定义匿名函数的时候直接调用
使用最多的方式
```go
func main(){
	var n1 int = func(a int,b int) int{
		return a + b
	}(10,20)
	fmt.Println(n1) // 30
}
```

### 将匿名函数赋值给一个变量
```go
func main(){
	f1 := func(a int,b int) int{
		return a+b
	}
	fmt.Println(f1(10,20)) // 30
}
```

### 全局可调用的匿名函数
```go
var Func1 = func(a int,b int) int{
	return a * b
}
func main(){
	fmt.Println(Func1(10,20))
}
```

## 闭包
闭包就是一个函数与其相关的引用环境组合的一个整体
闭包是返回的匿名函数+匿名函数意外的变量
```go
// 全局函数
//第一次被调用的函数 返回一个函数 这个函数的返回值是int类型
func getSum() func(int) int{
	//定义个变量存储闭包的数据变化
	var sum int = 0 // sum不会被释放
	//返回的函数
	return func(num int) int{
		sum += num
		//返回最后的int
		return sum
	}
}
func main(){
	f := getSum()// 第一次调用闭包
	fmt.Println(f(1)) //第一次改变闭包内变量的值
	fmt.Println(f(2)) // 第二次改变闭包内变量的值 getSum()只调用了一次 所以getSum内的sum不会被重置
	fmt.Println(f(3)) // 同上
}
```
不使用闭包实现以上代码
```go
func getSum(a *int,b int) int {
	*a += b
	return *a
}
func main(){
	var (
		sum = 0
		a = 10
		b = 20
		c = 30
	)
	fmt.Println(getSum(&sum,a)) //第一次改变闭包内变量的值
	fmt.Println(getSum(&sum,b)) // 第二次改变闭包内变量的值 getSum()只调用了一次 所以getSum内的sum不会被重置
	fmt.Println(getSum(&sum,c)) // 同上
}
```