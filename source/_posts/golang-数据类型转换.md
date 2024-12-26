---
title: golang-数据类型转换
date: 2023-09-09 15:44:57
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 类型转换

golang不同类型之间的转换只能进行显式转换(强制转换)
表达式：
`T(v)`
- T：就是要转换的数据类型
- v：就是需要转换的变量

转换以后不会改变原来变量的值 只是对原来变量的值新建了一个新的变量
```go
var s1 string = "hello"
var s2 int = int(s1[0])
fmt.Println(s2)
```
将大类型转换为小类型时会数据溢出
```go
var n1 int64 = 888888
var n2 int8 = int8(n1)
fmt.Println(n2) // => 56
```
如果转换后增加的值在当前赋值的范围内，则会数据溢出
如果转换前增加的值在当前赋值的范围外，则直接报内存溢出错误 不会编译
```go
var n1 int64 = 888888
var n2 int8 = int8(n1) + 127 // 数据溢出
fmt.Println(n2) // => -73
var n3 int8 = int8(n1) + 128 // 直接报内存溢出 不会编译
```

### 基本数据类型和string类型之间的转换
方式一 使用`fmt.Sprintf(format string,a ...interface{}) string`进行格式化，第一个参数差对照表
```go
var n1 int = 10
var str1 string = fmt.Sprintf("%d",n1)
fmt.Printf("str1的类型为：%T，str1 = %q\n",str1,str1)

var n2 float64 = 3.14
var str2 string = fmt.Sprintf("%f",n2)
fmt.Printf("str2的类型为：%T，str2 = %q\n",str2,str2)

var b3 byte = 'a'
var str3 string = fmt.Sprintf("%c",b3)
fmt.Printf("str3的类型为：%T，str3 = %q\n",str3,str3)

var b4 bool = true
var str4 string = fmt.Sprintf("%t",b4)
fmt.Printf("str4的类型为：%T，str4 = %q\n",str4,str4)
```
方式二 使用`strconv`包的函数
比第一种方式更复杂一些
```go
var n1 int = 10
var s1 string = strconv.FormatInt(int64(n1),10) //第一个参数必须转为int64 第二个参数是指定面值的进制形式
fmt.Printf("s1的类型是:%T,s1 = %q\n",s1,s1)

var n2 float64 = 3.1415926
var s2 string = strconv.FormatFloat(n2,'f',6,64)//第二个参数（-ddd.dddd） 第三个参数是保留几位小数 第四个参数是小数的类型是float64
fmt.Printf("s2的类型是:%T,s2 = %q\n",s2,s2)

var n3 bool = true
var s3 string = strconv.FormatBool(n3)
fmt.Printf("s3的类型是否:%T,s3 = %q\n",s3,s3)
```

### string类型转换为基本数据类型

```go
// 字符串转bool
var s2 string = "true"
var n2 bool
n2 , _  = strconv.ParseBool(s2)
fmt.Printf("n2的类型时:%T,n2的値:%v \n",n2,n2)

// 字符串转int
var s1 string = "123"
var n1 int64
n1 , _ = strconv.ParseInt(s1,10,64)
fmt.Printf("n1的类型时:%T,n1的値:%v \n",n1,n1)

// 字符串转浮点型
var s3 string = "3.14"
var n3 float64
n3,_ = strconv.ParseFloat(s3,64)
fmt.Printf("n3的类型时:%T,n3的値:%v \n",n3,n3)

// 错误的类型转换 则为转换后类型的默认值 
var s4 string = "hello"
var n4 int64
n4,_ = strconv.ParseInt(s4,10,64)
fmt.Printf("n4的类型时:%T,n4的値:%v \n",n4,n4)
```



