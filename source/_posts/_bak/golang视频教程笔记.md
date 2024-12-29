---
title: golang视频教程笔记
date: 2023-03-14 15:17:04
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
categories:
- 后端
tags:
- go
---

学习笔记
[视频地址](https://www.bilibili.com/video/BV1Pg41187AS)
<!--more-->


## 执行编译

#### 执行
```go

go run main.go

```
#### 编译
```go

//直接编译
go build 
//编译指定文件
go build test.go
//指定文件编译并命名
go build -o hello.exe test.go

```
## 通过命令行格式化代码
```bash

# 效果展示
gofmt test.go
# 写入源文件
gofmt -w test.go

```

## API

[官方文档](https://go.dev/)
[中文文档](https://studygolang.com/pkgdoc)

源码可以在sdk安装目录下的src文件夹下查看

## 数据类型

![数据类型](/src/golang/数据类型.png)

#### 字符串
```go
var s1 string = "学习Golang"
```
字符串是不可改变的
```go
var s1 string = "abc"
s1[0] = "t"//->会报错
```
没有特殊符号用`""`
如果有特殊符号用``代码块

## 类型转换

```go

var a int8 = 10
println(a)
//小转大没问题
var b int64 = 12138
println(b)
//大转小会导致精度丢失
c := int8(b)
println(c)

```
#### 基本数据类型转换为string类型

1. `fmt.Sprintf("%参数",表达式)`
2. 使用`strconv`包的函数
**推荐使用第一种**

```go

var n1 int = 10
var s1 string = fmt.Sprintf("%d", n1)
fmt.Printf("s1对应的类型是: %T , s1 = %v", s1, s1) // 10

var n2 float32 = 3.21
var s2 string = fmt.Sprintf("%f", n2)
fmt.Printf("s2对应的类型是: %T , s2 = %q \n", s2, s2) //"3.210000"

var n3 bool = false
var s3 string = fmt.Sprintf("%t", n3)
fmt.Printf("s3对应的类型是: %T , s3 = %q \n", s3, s3) //"false"

var n4 byte = 'a' //Unicode类型需要用单引号
var s4 string = fmt.Sprintf("%c", n4)
fmt.Printf("s4对应的类型是: %T , s4 = %q \n", s4, s4) //"a"


```
```go

var n1 int = 10
var s1 string = strconv.FormatInt(int64(n1), 10) //int64类型 , 进制数
fmt.Printf("s1对应的类型是: %T , s1 = %v \n", s1, s1)  // 10

var n2 float64 = 3.21
var s2 string = strconv.FormatFloat(n2, 'f', 9, 64) //小数参数,十进制,小数点后保留9位,小数是float64类型
fmt.Printf("s2对应的类型是: %T , s2 = %v \n", s2, s2)     // 10

var n3 bool = false
var s3 string = strconv.FormatBool(n3)
fmt.Printf("s3对应的类型是: %T , s3 = %q \n", s3, s3) //"false"

```

#### string类型转换成基本数据类型

```go

var s1 string = "true"
var b bool
b, _ = strconv.ParseBool(s1)
fmt.Printf("b的类型是: %T , b = %v \n", b, b)

var s2 string = "19"
var num1 int64
num1, _ = strconv.ParseInt(s2, 10, 64) //数值,十进制,int64
fmt.Printf("num1的类型是: %T , b = %v \n", num1, num1)
var s3 string = "3.21"
var f1 float64
f1, _ = strconv.ParseFloat(s3, 64) //数值,float64
fmt.Printf("f1的类型是: %T , b = %v \n", f1, f1)

```

## 指針

```go

var age int = 18

// &age 獲取到的是內存指向的地址
// b是指針變量的名稱
// *int是指針類型 可以理解為指向int類型的指針
// 想要獲取指針指向地址的值使用*b
var b *int = &age
println(age, b, *b)

```
**指針就是內存地址**
1. &獲取內存地址
2. *根據內存地址取值

#### 指针注意事项
```go

var num int = 10
fmt.Println(num) //10
// *int要和num的类型相同 如果是其他类型会报错 例如*float32
var b *int = &num //指针变量一定是地址值,不加&会报错
*b = 20 //通过指针改变内存里的值
fmt.Println(num) //20

//每个基本类型都有对应的指针类型
```

## 标识符
标识符就是变量名
```go
var age int = 10//age就算标识符

```








## 流程控制

```go

    var count int = 20
	if count < 30 {
		fmt.Printf("数量小于三十")
	}else{
        fmt.Printf("数量大于三十")
    }

    if count := 20; count < 30 {
		fmt.Printf("小于三十")
	}else if count == 30 {
        fmt.Printf("数量等于三十")
    }else{
        fmt.Printf("数量大于三十")
    }

```


case里不用break
default不是必须的

```go

    var score int = 87
	switch score / 10 {
	case 10:
		fmt.Println("等级为A级")
	case 9:
		fmt.Println("等级为B级")
	case 8:
		fmt.Println("等级为C级")
	case 7,6,5,4,3,2,1://可并列使用多个值
		fmt.Println("等级为D级")
	default:
		fmt.Println("不合格")
	}

```
switch可以不带表达式当if使用
```go

switch{
    case a == 1:
        fmt.Println("A")
    case a == 2:
        fmt.Println("B")
}

```

不推荐

```go

switch a := 1; {
    case a == 1:
        fmt.Println("A")
}

```

switch穿透,利用`fallthrough`关键字,如果在case语句后增加`fallthrough`,则会继续执行下一个case,也叫switch穿透
只穿透一层
```go

var score int = 99
	switch score / 10 {
	case 10:
		fmt.Println("等级为A级")
	case 9:
		fmt.Println("等级为B级")
		fallthrough
	case 8:
		fmt.Println("等级为C级")
	default:
		fmt.Println("不合格")
	}

```

for循环

```go

    var sum int = 0
	for i := 1; i <= 5; i++ {
		sum += i
	}
	fmt.Println("sum的值:", sum)

	//不可切片汉字 因为汉字占三个字节
	var str string = "hello world"
	for i := 0; i < len(str); i++ {
		fmt.Printf("%c \n", str[i])
	}
	//可以切片汉字
	var str2 string = "hello world 你好"
	for i, value := range str2 {
		fmt.Printf("索引:%d,值:%c \n", i, value)
	}
```

## 关键字

- break
- continue
- goto
- defer

#### break
```go

for i := 0; i < 10; i++ {
	if i == 5 {
		break
	}
	println(i)
}

```

#### continue
```go

for i := 0; i < 5; i++ {
	for j := 2; j < 5; j++ {
		if i == 2 && j == 2 {
			continue
		}
		println(i, j)
	}
}

//可以跳过两层循环
lable:
for i := 0; i < 5; i++ {
	for j := 2; j < 5; j++ {
		if i == 2 && j == 2 {
			continue lable
		}
		println(i, j)
	}
}

```
#### goto
可以无条件的跳转到程序的指定行
一般与条件判断配合
一般不建议使用,以免造成流程混乱
```go

println("1111111")
goto table
println("2222222") //跳过2
table:
println("3333333")

```

#### defer

- 为了在函数执行完以后及时释放资源
- 在go中,程序遇到defer关键字,不会立即执行defer后的代码,而是将defer后的语句压入一个栈中,然后继续执行函数后的语句
- 相关的值同时拷贝入栈中,不会随函数后面的变化而变化
- 等函数执行完毕后执行defer后的代码

```go

func main() {
	println(add(1, 2))//4
}
func add(a int, b int) int {
	defer println(a) //3
	defer println(b)//2
	sum := a + b
	println(sum) //1
	return sum
}

```




## 函数

**函数和函数是并列关系  所以不能写在main中**

```go
func 函数名 参数 返回值类型
func add(num1 int, num2 int) int {
	return num1 + num2
}

```

#### 传入可变数量的参数
```go
func main(){
    test()
    test(1)
    test(1,2,3,4,5)
}
func test (args...int){
    //函数内部使用可以当做数组来使用
    for i := 0;i < len(args);i++{
        fmt.Println(args[i])
    }
}

```

- 在函数内改变函数外的值
- 需要传入指针

```go

func main() {
	var num int = 10
	test(&num) //传入num的内存地址
	fmt.Println(num) //->30
}
func test(num *int) {
    //对地址对应的变量进行改变数值:
	*num = 30
}

```

#### 函数是一个变量 可以被赋值
```go

a := test

a(10)//等同于test(10)

```

#### 可以作为形参传给另一个函数
```go

func test02 (num1 int, testFunc func(int)){
    testFunc(123)
}
func main(){
    test02(10,test)
}
```

#### 自定义数据类型: 相当于起别名
```go

type myInt int

var a myInt = 1
var b int = 1

b = a //会报错
b = int(a)//可以用

```

#### 函数别名
```go
//函数传形参可以直接当类型用
type myFunc func(int)

```

#### 返回值命名
```go
func test(num1 int,numb int)(int,int){
    sum := num1 + num2
    sub := num1 - num2
    return sum,sub
}
//定义返回值 返回值命名 顺序不用对应
func test(num1 int,numb int)(sum int,sub int){
    sum := num1 + num2
    sub := num1 - num2
    return 
}

```
#### init函数

- 优于main函数执行
- 执行顺序:全局变量 -> init函数 -> main函数
- 多用于全局变量的初始化

```go

var num int = test()
func test() int {
	fmt.Println("test")
	return 10
}
func init() {
	fmt.Println("init函数")
}
func main() {
	fmt.Println("main函数")
}

```

#### 匿名函数

定义的同时再调用

```go
result := func(a int, b int) int {
	return a + b
}(10, 20)
println(result)
```
匿名函数指定变量
**设置全局变量接受就会变成全局函数**
```go

func1 := func(a int, b int) int {
		return a - b
	}
	var a int = func1(1, 2)
	fmt.Println(a)

```
#### 闭包
闭包就是一个函数和其相关的引用环境组合的一个整体
返回的是一个匿名函数,会一直存在变量中等待调用
匿名函数+引用的变量/参数 = 闭包
```go

func getSum() func(int) int {
	var sum int = 0
	return func(n int) int {
		sum = sum + n
		return sum
	}
}
func main() {
	a := getSum()
	println(a(1)) //1
	println(a(2)) //2
	println(a(3)) //6
	println(a(4)) //10
}

```

## 系统函数

所有的内置函数都放在文档的builtin中

#### 内置函数
```go

//字符串长度
len("golang") //6
//new分配内存,new函数的实参是一个类型而不是具体数值,new函数返回值是对应类型的指针 num: *int
num := new(int)
fmt.Printf("类型: %T 值:%v 地址:%v 指针指向的值:%v", num, num, &num, *num)
//make函数来分配内存,主要用来分配引用类型(指针,slice切片,map,管道chan,interface等)

```

#### 字符串相关的函数
```go
// 字符串占的字节长度 一个中文三个字节
var str string = "golang你好"
println(len(str)) //12
//对字符串遍历
//1.
for i, value := range str {
	fmt.Printf("索引为:%d,值为%c \n", i, value)
}
//2.利用切片进行遍历
r := []rune(str)
for i := 0; i < len(r); i++ {
	fmt.Printf("%c \n", r[i])
}
//字符串转整数
num1, _ := strconv.Atoi("123123")
println(num1)
//整数转字符串
str1 := strconv.Itoa(123)
println(str1)

//查找一个字符串是否在另一个字符串中
var str string = "golang你好"
println(len(str))
bigStr := "agsg golang你好 edghldhj"
println(bigStr)
println(strings.Contains(bigStr, str)) //找到返回true 没找到返回false
//统计字符串中找到几个相同字符串
println(strings.Count(bigStr, str)) //没找到返回0
//不区分大小写字符串比较
println(strings.EqualFold("go", "GO"))
//返回查找的字符串第一次出现的位置
println(strings.Index(bigStr, str))//如果没有返回-1
//字符串替换 被替换的字符串 替换的部分 替换的字符 替换几次 如果全部替换为-1
println(strings.Replace(bigStr, str, "999", 1))
//字符串分割成数组
arr := strings.Split("go-python-java", "-")
for i := 0; i < len(arr); i++ {
	println(arr[i])
}
//首字母大小写转换
println(strings.ToUpper("go"))
println(strings.ToLower("GO"))
//首尾去空格
println(strings.TrimSpace("  dfghdh  dhdfh  "))
//去掉首尾指定字符
println(strings.Trim("__dfghfgh__", "_"))
//判断字符串是否以指定字符开头
println(strings.HasPrefix("http://www.baidu.com", "http"))
//是否以某个字符串结尾
println(strings.HasSuffix("abc.png", "png"))

```

#### 日期和时间

```go

now := time.Now()
//now是一个结构体 struct
fmt.Printf("%v ,对应的类型为%T", now, now)
//2023-03-22 15:11:05.7441991 +0800 CST m=+0.004834101 ,对应的类型为time.Time

fmt.Printf("年 : %v \n", now.Year())
fmt.Printf("月 : %v \n", int(now.Month()))
fmt.Printf("日 : %v \n", now.Day())
fmt.Printf("时 : %v \n", now.Hour())
fmt.Printf("分 : %v \n", now.Minute())
fmt.Printf("秒 : %v \n", now.Second())
fmt.Printf("时间戳: %v \n", now.Unix())//秒

//格式化时间
str := fmt.Sprintf("当前年月日: %d-%d-%d 时分秒: %d:%d:%d", now.Year(), now.Month(), now.Day(), now.Hour(), now.Minute(), now.Second())
println(str)

//指定格式     固定写法 golang的诞生时间
str2 := now.Format("2006/01/02 15:04:05")
println(str2)

//时间戳转字符串
timeUnix := now.Unix() //当前时间戳
formatTimeStr := time.Unix(timeUnix, 0).Format("2006-01-02 15:04:05")
println(formatTimeStr)
//字符串转时间戳
formatTimeStr := "2023-03-22 15:47:55"
formatTime, _ := time.Parse("2006-01-02 15:04:05", formatTimeStr)
fmt.Println(formatTime)
//判断一个时间是否在另外一个时间之前
timeA.Before(timeB)//A在B之前
timeA.After(timeB) //A在B之后
```


## 包的引用

1. package进行包的声明,建议:包的声明这个包和坐在的文件夹同名
2. main包是程序的入口包,一般main函数会放在这个包下
3. 打包语法:
    - package 包名
4. 引入包的语法:import "包的路径" 包名是从$GOPATH/src/后开始计算的,使用/进行路径分隔
5. 如果有多个包,建议一次性导入,格式如下:
```go
import (
    "fmt"
    "gocode/demo"
)
```
6. 在函数调用的时候前面要定位到所在的包
7. 首字母大写
8. 一个目录下不能有重复的函数
9. 包名和文件夹的名字,可以不一样
10. 一个目录下的同级文件归属一个包
11. 包在程序层面是代码块 源文件层面是一个文件夹
引用路径是文件夹路径
调用方法前面是包名后面是函数


#### 1.11版本后使用go.mod
先新建文件夹test 
然后配置 进入文件夹执行命令
```go

go mod init test

```


## 错误处理机制

发现错误以后程序会停止运行
利用错误处理以后不影响后续执行

#### defer + recover机制

```go
package main
func main() {
	test()
	println("执行结束!!!")
}
func test() {
	defer func() {
		err := recover()
		if err != nil {
			println("错误已经捕获")
			println("err是:", err)
		}
	}()
	num1 := 10
	num2 := 0
	result := num1 / num2
	println(result)
}

```

#### 自定义错误
```go

func main() {
	err := test()
	if err != nil {
		fmt.Printf("自定义错误,%v \n", err)
	}
	println("程序执行结束")
}

func test() (err error) {
	num1 := 1
	num2 := 2
	println("test")
	if num1 < num2 {
		return nil
	} else {
		return errors.New("这里是一个错误!")
	}
}

```
#### 出现错误就停止程序
```go

func main() {
	err := test()
	if err != nil {
		fmt.Printf("自定义错误,%v \n", err)
		panic(err) //到此处就会停止程序
	}
	println("程序执行结束")
}

```


## 获取用户终端输入

```go

var age int
println("请输入年龄")
fmt.Scanln(&age)
var name string
println("请输入姓名")
fmt.Scanln(&name)
var score float32
println("请输入成绩")
fmt.Scanln(&score)
var isVIP bool
println("请输入是否为VIP")
fmt.Scanln(&isVIP)
fmt.Printf("年龄:%v,姓名:%v,成绩:%v,是否VIP:%v", age, name, score, isVIP)

```

```go

var (
	age   int
	name  string
	score float32
	isVIP bool
)
println("请录入学生年龄 姓名 成绩 是否VIP")
fmt.Scanf("%d %s %f %t", &age, &name, &score, &isVIP)

```

## 数组

#### 定义一个数组并赋值

```go

var arr [5]int
arr[0] = 11
arr[1] = 22
arr[2] = 33
arr[3] = 44
arr[4] = 55
sum := 0
for i := 0; i < len(arr); i++ {
	sum += arr[i]
}
fmt.Printf("总数为:%v,平均数为:%v \n", sum, sum/len(arr))

```

#### 数组循环
```go

sum := 0
for i := 0; i < len(arr); i++ {
	sum += arr[i]
}
fmt.Printf("总数为:%v,平均数为:%v \n", sum, sum/len(arr))
for i := 0; i < len(arr); i++ {
	println("请输入学生成绩")
	fmt.Scanln(&arr[i])
}
for key, val := range arr {
	println(key, val)
}

```

#### 数组的四种初始化方式
```go

// 1
var arr1 [3]int = [3]int{3, 6, 9}
fmt.Println(arr1)
// 2
var arr2 = [3]int{1, 4, 7}
fmt.Println(arr2)
// 3
var arr3 = [...]int{1, 2, 3, 4, 5}
fmt.Println(arr3)
// 4
var arr4 = [...]int{2: 22, 1: 11, 0: 10, 3: 33}
fmt.Println(arr4)

```

#### 数组的注意事项

数组的长度是类型的一部分
```go

fmt.Printf("数组的类型是 %T", arr1)
//[3]int

```

数组属值类型,在默认情况下是值传递,因此会进行值拷贝

```go

func main() {
	var arr = [3]int{3, 6, 9}
	test(arr)
	fmt.Println(arr)
	println("程序执行结束")
}
func test(arr [3]int) {
	arr[0] = 7
}

```

如果想在其他函数中,修改原来的数组,需要使用引用传递(指针方式)
```go

func main() {
	var arr = [3]int{3, 6, 9}
	test(&arr)
	fmt.Println(arr)
	println("程序执行结束")
}
func test(arr *[3]int) {
	(*arr)[0] = 7
}

```

#### 二维数组

二维数组其实也是一维数组

```go

var arr = [2][3]int16{}
//var arr = [2][3]int16{{},{}}
//var arr = [2][3]int16{{1,2,3},{4,5,6}}
fmt.Println(arr)
//赋值
arr[0][1] = 47
arr[0][0] = 82
arr[1][1] = 25
fmt.Println(arr)

```

#### 二维数组的遍历
不常用 常用切片
```go

var arr = [2][3]int16{{1, 2, 3}, {4, 5, 6}}
for i := 0; i < len(arr); i++ {
	for j := 0; j < len(arr[i]); j++ {
		fmt.Println(arr[i][j])
	}
}
for i, v := range arr {
	for j, w := range arr[i] {
		fmt.Println(i, v, j, w)
	}
}

```

## 切片

- 切片(slice)是golang中一种特有的数据类型
- 数组有特定的用处,但是却又一些呆板(数组长度固定不可变),所以在go中并不常见.切片是一种建立在数组类型上的抽象,它构建在数组之上并且提供更强大的能力和便捷.
- 切片是对数组一个连续片段的引用,所以切片是一个引用类型.这个片段可以是整个数组,或者是由起始和终止索引标识的一些项的子集.需要注意的是,终止索引标识的项不包括在切片内.切片提供里一个相关数组的动态窗口.

#### 两种写法

```go

var arr = [3]int{}
//1
var slice []int = arr[1:2]
println(slice)
//2
slice2 := arr[1:2]
println(slice2)

//获取切片元素的长度
fmt.Println(len(slice2))
//获取切片元素的容量
fmt.Println(cap(slice2))
```

#### 切片的内存分析

三个一段的数组结构:

- 指向底层数组的指针
- 切片的长度
- 切片的容量

改变切片内的值会改变数组的值,他们指向的是同一个内存地址

```go

slice[0] = 10
fmt.Println(slice)//[10]
fmt.Println(arr)//[0,10,0]

```

#### 切片的定义

```go
//1
var slice []int = arr[1:2]
println(slice)
//2
slice2 := arr[1:2]
println(slice2)
```
通过make内置函数来创建的切片
make底层创建一个数组,对外不可见,所以不可以直接操作这个数组,要通过slice去间接的访问各个元素,不可以直接对数组进行维护.
```go
//make定义切片
slice3 := make([]int, 4, 20)
fmt.Println(slice3)
```
定义一个切片,直接就指向具体数组,使用原理类似make的方式.
```go

slice4 := []int{1, 2, 3}
fmt.Println(len(slice4))
fmt.Println(cap(slice4))

```

#### 切片的遍历

```go
slice := []int{1, 2, 3, 4, 5, 6}

fmt.Println(slice)
for i := 0; i < len(slice); i++ {
	fmt.Println(slice[i])
}
for i, v := range slice {
	fmt.Println(i, v)
}

```
#### 切片的追加 动态增长
```go
intarr := [6]int{1, 2, 3, 4, 5, 6}
slice := intarr[1:4]
fmt.Println(slice)
slice2 := append(slice, 12, 34)
fmt.Println(slice2)
```
#### 两个切片合并 动态增长
```go
slice3 := []int{1, 2, 3}
slice4 := append(slice2, slice3...)
fmt.Println(slice4)
```
#### 切片的复制
```go
var a []int = []int{1, 2, 3, 4, 5}
fmt.Println(a)
var b []int = make([]int, 10)
copy(b, a)
fmt.Println(b)
```

#### 数组和切片初始化方式的总结

```go
//数组的初始化方式
var arr1 [3]int = [3]int{1, 2, 3}
arr5 := [3]int{1, 2, 3}
var arr2 = [3]int{1, 2, 3}
var arr3 = [...]int{1, 2, 3}
var arr4 = [...]int{2: 1, 1: 2, 3: 3}
fmt.Println(arr1, arr2, arr3, arr4, arr5)
fmt.Println("---------------------")

//切片的初始化方式
var slice1 []int = arr1[1:2]
slice2 := arr1[1:2]
slice3 := make([]int, 10)
slice4 := []int{1, 2, 3}
fmt.Println(slice1, slice2, slice3, slice4)
```


## 映射(map) 
go语言中内置的一种类型,它将键值对相关联,类似于其他语言的集合.

基本语法:var 变量名 map[keytype]valuetype

- key,value的类型可以是bool数字string指针channel还可以只包含前面几个类型的接口结构体数组
- key通常为int和string类型,value通常为数字(整数,浮点数)string map结构体
- key:slice map function 不可以

map的特点:
- map集合在使用前一定要make
- map的key-value是无序的
- key是不可以重复的,重复后面的会替换前面

#### 三种创建方式
```go
//方式1
//定义map变量
var a map[int]string
//初始化的map不占用内存空间,必须用make开辟内存空间
a = make(map[int]string, 10)
a[11] = "张三"
a[22] = "李四"
a[33] = "王五"
//a[11] = "朱刘" //键重复后面的值会替换掉前面的值
fmt.Println(a)

//方式2
b := make(map(int)string)//,10长度不放也可以
//方式3
c := map[int]string{
	11: "张三",
	22: "李四",
}
```
#### map的操作
增删改查
```go
//增
a := make(map[int]string)
c := map[int]string{
	11: "张三",
	22: "李四",
}
c[33] = "王五"//增
delete(c, 11)//删
c[22] = "张三"//改

value,flag := b[22] //查 
fmt.Println(value,flag) //找到了flag返回true,没找到返回false
//获取长度
len(c)
//遍历 只支持for range
for i, v := range c {
	println(i, v)
}
//二维
d := make(map[string]map[int]string)
d["c1"] = make(map[int]string, 3)
d["c1"][11] = "张三"
d["c1"][22] = "张李四"
d["c1"][33] = "王五"
d["c2"] = make(map[int]string, 3)
d["c2"][44] = "张1"
d["c2"][55] = "张李2"
d["c2"][66] = "王3"
for i1, v1 := range d {
	for i2, v2 := range v1 {
		println(i1, v1, i2, v2)
	}
	println("---------")
}
```
清空操作
- 可以遍历key逐个删除
- 或者map = make() make一个新的,让原来的变成垃圾,被gc回收


## 面向对象

#### 面向对象的创建

通过结构体来实现面向对象(OOP)
在golang中没有class
struct


方式一:直接创建
```go
func main() {
	var t1 Teacher
	fmt.Println(t1)
}
// 定义一个老师的结构体 属性放在其中进行管理
type Teacher struct {
	//变量名大写外部才能访问
	Name string
	Age  int
	Sex  string
}
```
方式二:
```go
func main() {
	var t Teacher = Teacher{}
	t.Name = "张三"
	fmt.Println(t)
	println("程序执行结束")
}
//或者
func main() {
	var t Teacher = Teacher{"张三", 31, "男"}
	fmt.Println(t)
	println("程序执行结束")
}
```
方式三:返回的是结构体指针:
```go
func main() {
	//创建结构体实例
	var t *Teacher = new(Teacher)
	//t是指针,t其实指向的就是内存地址
	(*t).Name = "张三"
	//程序底层自动转换为(*t).Age = 30
	t.Age = 33
	fmt.Println(*t)
}
```
方式四
```go
//创建结构体实例
var t *Teacher = &Teacher{}
//t是指针,t其实指向的就是内存地址
(*t).Name = "张三"
//程序底层自动转换为(*t).Age = 30
t.Age = 33
fmt.Println(*t)
//或者
var t *Teacher = &Teacher{"张三",33,"abc"}
fmt.Println(*t)
```

#### 结构体的转换

结构体的转换必须有相同的部分
```go
type Teacher struct {
	Name string
}
type Person struct {
	Name string
}
//1
func main() {
	var s Teacher
	var p Person
	s = Teacher(p)
	fmt.Println(s, p)
}
//2
func main() {
	var tea = Teacher{"张三"}
	var per = Person{"李四"}
	fmt.Println(tea, per)
	tea = Teacher(per) //转换
	fmt.Println(tea)
}
```
即是同一个结构体引出的别名也需要转换类型才能使用否则会报错
```go
type Teacher struct {
	Name string
}
type Tea Teacher
func main() {
	var s Teacher
	var p Tea
	s = Teacher(p)
	fmt.Println(s, p)
}
```
#### 面向对象 结构体方法的使用
方法是作用在指定的数据类型上,和指定的数据类型绑定,因此自定义方法也可以有方法,而不仅仅是struct.例如:`type integer int`.

```go
// 创建一个结构体
type A struct {
	Name int
}
// 声明这个方法是 A结构体的方法 此处在方法名前面加一个括号绑定到结构体
func (a A) test() {
	fmt.Println("A结构体的方法")
}
func main() {
	//需要先实例化结构体
	var t A
	//需要调用实例化后的方法
	t.test()
	fmt.Println("程序执行结束")
}
//设置参数 方法内外隔离 不会产生影响
type A struct {
	Age int
}
func (a A) test() {
	a.Age = 30
	fmt.Println(a.Age) //30
}
func main() {
	var a A
	a.Age = 100
	a.test()
	fmt.Println(a.Age) //100
}
```
外部改变方法内的数值
```go
//1
type A struct {
	Age int
}
func (a *A) test() {
	(*a).Age = 30 //也可以a.Age = 30
	fmt.Println(*a)
}
func main() {
	var a A
	a.Age = 100
	(&a).test() //也可以a.test()
	fmt.Println(a)
}

//2
type A int
func (a *A) test() {
	*a = 30
	fmt.Println(*a) //30
}
func main() {
	var a A = 30
	a = 100
	a.test()
	fmt.Println(a) //30
}
```
如果一个类型实现了String()方法,那么fmt.Println默认会调用这个变量的String()进行输出
以后定义结构体的话,常定义String()作为输出结构体信息的方法,在fmt.Println会自动调用
```go
import "fmt"
type Student struct {
	Name string
	Age  int
}
func (s *Student) String() string {
	str := fmt.Sprintf("Name = %v , Age = %v", s.Name, s.Age)
	return str
}
func main() {
	stu := Student{
		Name: "丽丽",
		Age:  12,
	}
	fmt.Println(&stu)
}
```

#### 方法和函数的区别
1. 绑定指定类型:
	- 方法:需要绑定指定数据类型
	- 函数:不需要绑定数据类型
2. 调用方式不一样:
	- 函数:函数名(实参列表)
	- 方法:变量.方法名(实参列表)
3. 对于函数来说,参数类型对应是什么就要传入什么
4. 对于方法来说,接收者为值类型,可以传入指针类型,接受者为指针类型,可以传入值类型.

定义函数
```go
type Student struct {
	Name string
}
func test1(s Student) {
	fmt.Println(s.Name)
}
func test2(s *Student) {
	fmt.Println((*s).Name)
}
func main() {
	var s Student = Student{"小张"}
	test1(s)
	test2(&s)
}
```
定义方法
```go
type Student struct {
	Name string
}
func (s Student) test1() {
	fmt.Println(s.Name)
}
func (s *Student) test2() {
	fmt.Println((*s).Name)
}
func main() {
	var s Student = Student{"小张"}
	s.test1()
	(&s).test1() //虽然用指针类型传递,但是传递还是按照值类型传递
	(&s).test2()
}
```
## 封装

```go



```




























