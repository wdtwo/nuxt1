---
title: golang参数设置Print
date: 2023-03-08 10:53:29
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
categories:
- 后端
tags:
- go
---

- 通用占位符
- 布尔型
- 整型
- 浮点数与复数
- 字符串和[]byte
- 指针 
- 宽度标识符

<!--more-->

## 通用占位符

| 占位符 | 说明 |
|   --   |  -- |
| %v	 | 值的默认格式表示 |
| %+v | 	类似%v，但输出结构体时会添加字段名 |
| %#v | 	值的Go语法表示 |
| %T	 | 打印值的类型 |
| %%	 | 百分号 |

```go

//demo
package main
import "fmt"
func main() {
	var pi float64 = 3.1415926
	fmt.Printf("%v \n",pi) // %v 会自动推导出当前的变量 是什么格式 类型输出
	var o = struct {
		name string
	}{"春生"}
	fmt.Printf("%v \n",o)   //  输出值
	fmt.Printf("%+v \n",o)  // 结构体输出 建 和 值
	fmt.Printf("%#v \n",o)  // 以Go的语法输出
	fmt.Printf("%T \n",o)  //  %T 打印值的类型
	fmt.Printf("%T \n",pi)  // %T 打印值的类型
	fmt.Printf("%% %v",100) // 如果打印的是 带有 %的特殊 形式 需要加上 %%去注视特殊字符

}

```

## 布尔型

| 占位符 | 说明 |
|   --  |  -- |
| %t | true或false |

```go

fmt.Printf("%t \n",true)
fmt.Printf("%t \n",false)

```

## 整型

| 占位符 | 说明 |
|   --  |  -- |
| %b | 表示为二进制 |
| %c | 该值对应的unicode码值 |
| %d | 表示为十进制 |
| %o | 表示为八进制 |
| %x | 表示为十六进制，使用a-f |
| %X | 表示为十六进制，使用A-F |
| %U | 表示为Unicode格式：U+1234，等价于”U+%04X” |
| %q | 该值对应的单引号括起来的go语法字符字面值，必要时会采用安全的转义表示 |

```go

n := 65
fmt.Printf("%b\n", n) //1000001
fmt.Printf("%c\n", n) //A
fmt.Printf("%d\n", n) //65
fmt.Printf("%o\n", n) //101
fmt.Printf("%x\n", n) //41
fmt.Printf("%X\n", n) //41

```

## 浮点数与复数

| 占位符 | 说明 |
|   --  |  -- |
| %b | 无小数部分、二进制指数的科学计数法，如-123456p-78 |
| %e | 科学计数法，如-1234.456e+78 |
| %E | 科学计数法，如-1234.456E+78 |
| %f | 有小数部分但无指数部分，如123.456 |
| %F | 等价于%f |
| %g | 根据实际情况采用%e或%f格式（以获得更简洁、准确的输出） |
| %G | 根据实际情况采用%E或%F格式（以获得更简洁、准确的输出） |

```go

f := 12.34
fmt.Printf("%b\n", f) //6946802425218990p-49
fmt.Printf("%e\n", f) //1.234000e+01
fmt.Printf("%E\n", f) //1.234000E+01
fmt.Printf("%f\n", f) //12.340000
fmt.Printf("%g\n", f) //12.34
fmt.Printf("%G\n", f) //12.34

```

## 字符串和[]byte

| 占位符 | 说明 |
|   --  |  -- |
| %s | 直接输出字符串或者[]byte |
| %q | 该值对应的双引号括起来的go语法字符串字面值，必要时会采用安全的转义表示 |
| %x | 每个字节用两字符十六进制数表示（使用a-f） |
| %X | 每个字节用两字符十六进制数表示（使用A-F） |

```go

s := "春生"
fmt.Printf("%s \n",s) //春生 
fmt.Printf("%q \n",s) //"春生" 
fmt.Printf("%x \n",s) //e698a5e7949f                        
fmt.Printf("%X \n",s) //E698A5E7949F 

```

## 指针

| 占位符 | 说明 |
|   --  |  -- |
| %p | 表示为十六进制，并加上前导的0x |

```go

s := "春生"
fmt.Printf("%p\n",&s) //0xc000010200

```

## 宽度标识符

| 占位符 | 说明 |
|   --  |  -- |
| %f	| 默认宽度，默认精度 |
| %9f	| 宽度9，默认精度 |
| %.2f	| 默认宽度，精度2 |
| %9.2f	| 宽度9，精度2 |
| %9.f	| 宽度9，精度0 |

```go

n := 12.34
fmt.Printf("%f \n",n) //12.340000 
fmt.Printf("%9f \n",n) //12.340000 
fmt.Printf("%.2f \n",n) //12.34 
fmt.Printf("%9.2f \n",n) //12.34
fmt.Printf("%9.f \n",n) //12

```






