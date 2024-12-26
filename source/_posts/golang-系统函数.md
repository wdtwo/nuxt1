---
title: golang-系统函数
date: 2023-09-10 20:17:03
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 字符串相关的系统函数

### len(str)
统计字符串长度 按字节计算
是一个内置函数,不需要导入包,可以直接使用
所有的内置函数都放在手册的builtin目录下
```go
fmt.Println(len("golang你好")) //12 中文占3个字节
```

### r:= rune(str)
将字符串转换成切片
也可以使用for range循环
```go
var str string = "golang你好"
r := []rune(str)
for i := 0; i < len(r); i++ {
    fmt.Printf("%c ", r[i])
}
```

### strconv.Atoi()
字符串转整型
返回值 int,err
```go
// 字符串转整数
a,_ := strconv.Atoi("123")
fmt.Printf("a的类型是:%T , a的值是:%v \n",a,a) // a的类型是:int , a的值是:123 

```

### strconv,Atoi()
整型转字符串
返回值 string
```go
// 整数转字符串
b := strconv.Itoa(321)
fmt.Printf("b的类型是:%T , b的値是:%v \n",b,b) // b的类型是:string , b的値是:321
```

### 字符串查询
在一个字符串中查询是否包含另外一个字符串
```go
import (
	"fmt"
	"strings"
)
func main(){
	var str string = "golang 你好"
	var s1 string = "你好"
	fmt.Println(strings.Contains(str,s1)) //true 在str中查找是否包含s1
	fmt.Println(strings.Contains(str,"123")) //false
}
```

### 统计一个字符串中有几个指定的字符串
```go
var str string = "gogolang"
fmt.Println(strings.Count(str,"go"))  // 2
fmt.Println(strings.Count(str,"hello")) // 0
```

### 不区分大小写进行两个字符串比较
```go
fmt.Println(strings.EqualFold("GO","go")) // true
```
区分大小写的比较
```go
fmt.Println("hello" == "hello")
```

### 查询字符串第一次出现的位置
如果没有返回 -1
```go
fmt.Println(strings.Index("golang 你好","n")) // 4
```

### 字符串替换
语法 `strings.Replace(被替换函数,被替换的字符,替换上的字符,替换的次数)`
如果替换次数为-1则是全部替换
```go
fmt.Println(strings.Replace("hello world","world","go",-1)) 
```

### 以指定字符将字符串切割成数组
```go
var s string = "a,b,cc,ddd,e,f,g"
var a1 []string = strings.Split(s,",")
fmt.Printf("a1的类型是:%T, %v\n",a1,a1)
// a1的类型是:[]string, [a b cc ddd e f g]
```

### 大小写转换
```go
var s string = "a,B,Cc,ddd,e,f,g"
fmt.Println(strings.ToLower(s)) // a,b,cc,ddd,e,f,g
fmt.Println(strings.ToUpper(s)) // A,B,CC,DDD,E,F,G
```
### 字符串两边去空格
```go
var s string = "   a,B,Cc,ddd,e,f,g"
fmt.Println(strings.TrimSpace(s)) // a,B,Cc,ddd,e,f,g
```
### 字符串两边去掉指定字符
```go
var s string = "111a,B,Cc,ddd,e,f,g111"
fmt.Println(strings.Trim(s,"1")) // a,B,Cc,ddd,e,f,g
```
### 字符串去掉左边和右边的字符
```go
var s string = "111a,B,Cc,ddd,e,f,g111"
fmt.Println(strings.TrimLeft(s,"1")) // a,B,Cc,ddd,e,f,g111
fmt.Println(strings.TrimRight(s,"1")) // 111a,B,Cc,ddd,e,f,g
```
### 判断字符串是否以指定字符开始
```go
var s string = "http://www.baidu.com"
	fmt.Println(strings.HasPrefix(s,"http")) // true
```
### 判断字符串是否以指定字符结束
```go
var s string = "http://www.baidu.com"
	fmt.Println(strings.HasSuffix(s,"com")) // true
```

## 时间和日期
需要导入time包
```go
import (
    "fmt"
    "time"
)
```

### 获取当前时间
返回值为一个结构体
```go
n := time.Now()
fmt.Printf("n的类型是:%T, 值为:%v \n",n,n)
// n的类型是:time.Time, 值为:2023-09-12 22:46:42.6925887 +0800 CST m=+0.004296001 
```

### 获取详细年月日
返回值类型为 int 月份为单词 可直接强制转换为int
```go
n := time.Now()
fmt.Println(n.Year(),int(n.Month()),n.Day(),n.Hour(),n.Minute(),n.Second()) 
```

### 格式化输出
获取当前的格式化时间
```go
n := time.Now()
var dateStr string = fmt.Sprintf("年月日: %d-%d-%d , 时分秒: %d-%d-%d",n.Year(),n.Month(),n.Day(),n.Hour(),n.Minute(),n.Second())
fmt.Println(dateStr)
```
格式化输出第二种写法
```go
// 获取当前时间
n := time.Now()
fmt.Println(n.Format("2006-01-02 15:04:05")) // 此处为固定写法 这个时间是go诞生的时间
```



