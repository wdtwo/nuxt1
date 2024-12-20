---
title: golang-反射reflect
date: 2023-09-17 13:32:34
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## 反射

### 反射可以干什么
1. 反射可以再运行时动态获取变量的各种信息,比如变量的类型,类别等信息
2. 如果是结构体变量,还可以获取到结构体的信息(包括结构体的字段和方法)
3. 通过反射,可以修改变量的值,可以调用变量的方法
4. 使用放射需要引用 `import "reflect"`

### 反射的相关函数

1. `reflect.TypeOf(变量名)`,获取变量的类型,返回reflect.Type类型
2. `reflect.ValueOf(变量名)`,获取变量的值,返回reflect.Value类型(reflect.Value是一个结构体类型),通过reflect.Value,可以获取到关于该
变量的很多信息.
3. 上面的变量名的类型为空接口

### 将一个int类型转换为反射的reflect.Value类型 再将reflect.Value转换为基本数据类型
```go
import (
	"fmt"
	"reflect"
)
// 利用一个函数,函数的参数是一个空接口
func testRelfert(n interface{}) {
	// 1.调用reflect.TypeOf函数,返回reflect.Type类型数据:
	reType := reflect.TypeOf(n)
	fmt.Println("reType:", reType)         // int
	fmt.Printf("reType的类型是:%T \n", reType) // *reflect.rtype
	// 2.调用reflect.ValueOf函数,返回reflect.Value类型数据:
	reValue := reflect.ValueOf(n)
	fmt.Println("vaType:", reValue)       // 10
	fmt.Printf("这个函数中的类型:%T \n", reValue) // reflect.Value
	var num1 int64 = 10
	num2 := reValue.Int() //如果想使用的话需要用Int()来获取
	fmt.Println("int求和:", num1+num2)
	// 通过Interface()方法将reValue转换成空接口:
	i2 := reValue.Interface()
	integer := i2.(int) // 通过断言把i2转换成int
	fmt.Printf("n的类型为:%T,n的值为:%v \n", integer, integer) // int 10
}
func main() {
	// 对基本数据类型进行反射:
	var num int = 10 // 基本数据类型
	fmt.Println(num)
	testRelfert(num) // 反射函数
	fmt.Println("exit...")
}
```

### 对结构体进行反射
```go
import (
	"fmt"
	"reflect"
)
func testRelfert(s interface{}) {
	reType := reflect.TypeOf(s)
	fmt.Println("reType:", reType) // main.Jiegouti
	reValue := reflect.ValueOf(s)
	fmt.Println("reValue:", reValue) // {"Gary Wang"}
	//输出结构体 string <main.Jiegouti Value>
	fmt.Printf("reValue结构体反射的类型:%T,值为:%v \n", reValue.String(), reValue.String())
	//转换为结构体类型
	val := reValue.Interface()
	v, flag := val.(Jiegouti) //通过断言来转换为结构体
	if flag {                 // 此处如果失败了则不走
		fmt.Println("结构体的值:", v.Name)
	}
}
// 声明一个结构体
type Jiegouti struct {
	Name string
}
func main() {
	j := Jiegouti{}
	j.Name = "Gary Wang"
	// 对基本数据类型进行反射:
	var num int = 10 // 基本数据类型
	fmt.Println(num)
	testRelfert(j) // 反射函数
	fmt.Println("exit...")
}
```

### 获取变量的类别

两种方式:
1. reflect.TypeOf.Kind()
2. reflect.ValueOf.Kind()

Kind的值是常量值:`type Kind uint`
```go
func testRelfert(s interface{}) {
	reType := reflect.TypeOf(s)
	reValue := reflect.ValueOf(s)
	// 获取变量的类别:
	k1 := reType.Kind()
	k2 := reValue.Kind()
	fmt.Println(k1, k2) // struct struct 结构体类型
	// 获取变量的类型:
	// 需要先转换回去
	// 然后用fmt.Printf("%T",v)获取类型 main.Jiegouti
}
```

### 反射修改变量的值
基本数据类型:
```go
func testRelfert(s interface{}) {
	reValue := reflect.ValueOf(s)
    // Elem()获取到的是指针指向的具体的值
	reValue.Elem().SetInt(100) // 此处如果不加Elem()会报错 因为reValue是一个指针 不能直接执行SetInt()
}
func main() {
	var num int = 10  //
	testRelfert(&num) // 传入指针类型才能在外面生效
	fmt.Println(num)
	fmt.Println("exit...")
}
```
通过反射操作结构体的属性和方法
1.调用结构体的方法
```go
// 创建一个结构体
type Student struct {
	Name string
	Age  int
}
func (s Student) Play(a int, b int) int {
	fmt.Println("play func :", a+b)
	return a + b
}
func testRelfert(s interface{}) {
	reValue := reflect.ValueOf(s)
	fmt.Println(reValue) // {Gary wang 18}
	// 通过reflect.Value类型来操作结构体的字段
	n1 := reValue.NumField() // 返回结构体中有几个字段
	fmt.Println(n1)          // 2
	// 通过循环来获取字段
	for i := 0; i < n1; i++ {
		fmt.Printf("第%d个字段的值是:%v \n", i, reValue.Field(i)) // 通过Field(索引)来获取字段的值
	}
	// 通过reflect.Value类型来操作结构体的方法
	n2 := reValue.NumMethod() // 获取总共有多少个方法 此处如果方法首字母是小写则获取不到
	fmt.Println(n2)
	for i := 0; i < n2; i++ {
		fmt.Printf("第%d的方法是:%v \n", i, reValue.Method(i)) // 通过Method(索引)来获取方法的值
		// 调用找到的方法 此处如果方法首字母是小写则获取不到
		// 方法的顺序按照首字母排序
		reValue.Method(i).Call(nil) // 如果没有参数则传nil
		// 如果需要传参的话需要把参数写入Call的()内 类型为切片
		var params []reflect.Value // 定义一个切片
		params = append(params, reflect.ValueOf(10)) //传入两个参数
		params = append(params, reflect.ValueOf(20))
		res := reValue.Method(i).Call(params) // 调用传值 并接收返回值
		fmt.Println(res[0].Int())
	}
}
func main() {
	s := Student{
		Name: "Gary Wang",
		Age:  18,
	}
	testRelfert(s) // 传入一个结构体
	fmt.Println("exit...")
}
```
2.修改结构体的字段值
```go
// 创建一个结构体
type Student struct {
	Name string
	Age  int
}
func testRelfert(s interface{}) {
	reValue := reflect.ValueOf(s)
	n1 := reValue.Elem().NumField()
	fmt.Println("获取到字段的个数:", n1) // 2
	// 修改Name的值
	reValue.Elem().Field(0).SetString("张三")
}
func main() {
	s := Student{
		Name: "Gary Wang",
		Age:  18,
	}
	testRelfert(&s) // 传入指针类型才能在外面生效
	fmt.Println(s)
	fmt.Println("exit...") // {张三 18}
}
```









