---
title: golang学习笔记
date: 2023-03-03 15:17:04
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
categories:
- 后端
tags:
- go
---

- 环境配置

<!--more-->

if else switch case default break return goto fallthrough for continue type struct var const map func interface range import package defer go select chan

## 环境配置

1. 下载SDK安装包 [下载地址](https://golang.google.cn/dl/)
2. 配置环境变量
    - 高级系统设置
    - 高级
    - 环境变量
    - 系统变量
        - 新建`GOROOT = 安装目录`
        - 配置GOPATH环境变量（如果编写的go程序需要更改位置的话则可以修改）
        - 用户变量
        - 修改`GOPATH = 修改的目录`
        - 配置GoBin环境变量
        - 用于告诉系统去哪里找Go语言提供的一些应用程序
        - 系统变量编辑`path`添加安装目录的`go\bin`文件夹
3. 检查是否安装成功
    - 打开cmd
    - 输入 `go env`
4. 下载编辑器
    - [goland](https://www.jetbrains.com.cn/go/)
    - [验证服务器](https://rushb.pro/article/JetBrains-license-server.html)
5. 汉化
    - 文件
    - 设置
    - 插件
    - 搜索 chinese
    - 安装
6. 新建demo
    - 项目文件夹右键新建go文件
    - 简单的应用程序
    - 输入`fmt.Printf("hello world\n")`
7. 完成

## 基本结构和基本数据类型

### 文件名、关键字与标识符

#### 文件名

- 源文件以`.go`为后缀，只有小写字母，例如`scanner.go`。
- 如果文件名由多个部分组成，则使用下划线`_`分隔，例如`scanner_test.go`。
- 不能包含空格或者其他特殊字符。

`错误示范`
- 1ab(以数字开头)
- case（关键字）
- a+b（运算符）

### 25个关键字或保留字

break
default
func
interface
select
case
defer
go
map
struct
chan
else
goto
package
switch
const
fallthrough
if
range
type
continue
for
import
return
var

### 36个预定义标识符

append
bool
byte
cap
close
complex
complex64
complex128
copy
false
float32
float64
imag
int
int8
int16
int32
int64
iota
len
make
new
nil
panic
print
println
real
recover
string
true
uint
uint8

**程序一般由关键字、敞亮、变量、运算符、类型和函数构成。**

##基本结构和要素

demo
```go
package main
import fmt

func main(){

    fmt.Printf("hello world")

}


```

## 包的概念、导入与可见性

- 一个go文件只能属于一个包
- 一个包可以有多个go文件
- 非注释的第一行必须指明这个文件属于哪个包 `package main`
- `package main`表示一个可独立执行的程序
- 每个**go应用程序**都包含一个名为main的包
- 如果编译包名不是main 那么编译后产生的对象文件会是`name.a` 而不是可执行程序
- 所有包名必须使用小写字母

#### 标准库

- 直接使用的包叫标准库。
- windows位置在go根目录的子目录`pkg/windows_386`
- linux在`pkg/linux_amd64` 如果32位则在`linux_386`
- 一般情况，标准包会放在`$GOROOT/pkg/$GOOS_$GOARCH/`目录下

- 如果想构建一个程序，则包和包内的文件都必须以正确的顺序金星编译。包的依赖关系决定了其构建顺序。
- 属于同一个包的源文件必须全部被一起编译，一个包即是一个编译单元，因此根据惯例，每个目录都只包含一个包。
- 如果对一个包金星更改或重新编译，所有引用了这个包的客户端程序都必须全部重新编译。

包模型采用显式依赖关系的机制来达到快速编译的目的，编译器会从后缀名为`.o`的对象文件（需要且只需要）中提取传递依赖类型的信息。

如果 `a.go`依赖 `b.go`，而 `b.go`依赖 `c.go`
则编译顺序为`c.go` `b.go` `a.go`

每个go文件通过import连接在一起

#### import写法

```go

import "fmt"
import "os"

```
```go

import "fmt";import "os"

```
```go

import (
    "fmt"
    "os"
)

```
```go

import ("fmt";"os")

```

导入多个包时，最好按照字母顺序排列 更易读
如果包名不是以`.``./`开头，则会全局查找

除了`_`以外，包中所有代码对象的标识符必须是惟一的，相同标识符可以在不同包中使用，所以可以用包名来区分。

#### 可见性

当标识符（包括敞亮、变量、类型、函数名、结构字段等等）以一个大写字母开头那么使用这种形式的标识符的对象可以被外部包的代码所使用（客户端需先导入这个包），这被称为到处（类似面向对象的public）。
标识符如果小写字母开头，则对外不可见，但是它们再整个包的内部是可见并且可用的（类似private）
大写字母可以使用任何Unicode编码的字符，比如希腊文，不仅仅是ASCII码中的大写字母。

可以通过包别名来避免包名冲突。

```go

package main
import fm "fmt"

func main (){
    fm.Printf("hello")
}

```

**如果你导入一个包没有使用它，则会在构建时候引发错误，**
如`imported and not used: os`遵循了GO的格言：没有不必要的代码！

#### 包的分级声明和初始化

可以在import导入包以后声明零个或者多个常量const、变量var、类型type。
这些在本包中都是全局的，可以被本包中函数调用。

## 函数

```go

func functionName()

```
main函数是每个执行程序必须的，一般来说都是在启动后第一个执行的函数（如果有init（）会先执行init（））
如果main包没有main函数，则会报错`undefined: main.main`.
main函数没有参数也没有返回类型。如果不小心添加了则会引发报错：
`func main must have no arguments and no return values results.`

在程序开始执行并初始化完成后，第一个调用的函数是main.main()，该函数一旦返回就表示程序执行完毕。

函数`{`必须和声明在一行，否则会报错``build-error: syntax error: unexpected semicolon or newline before {``

```go

func functionName(params1 type1,params2 type2)(return1 type1,return2 type2){

}

//demo 
func Sum(a,b int) int {return a+b}

```                                                                                     


### 类型

基本类型
int
float 
bool
string
结构化的（复合类型）
struct
array
slice
map
channel
只描述类型的行为
interface

结构化的类型没有真正的值，他们使用nil（null）作为默认值
**Go语言不存在类型集成。**
函数也可以是一个确定的类型，就是以函数作为返回类型。这种类型的声明要写在函数名和可选参数的参数列表之后
```go
func FunctionName (a type1,b type2) typeFunc
```
可以在函数体中的某处返回使用类型为typeFunc的变量var`return var`

一个函数可以有多个返回值
```go
func FunctionName (a type1,b type2 ) (t1 type1, t2 type2) {
    return var1,var2

}
```
这种多返回值一般用于判断某个函数是否执行成功或与其他返回值一同返回错误消息
使用 type 关键字可以定义自己的类型，可以定义一个结构体，也可以定义一个已经存在的类型别名：`type IZ int`
这里并不是真正意义上的别名，使用这种方法定义的类型可以有更多特性，且在类型转换时必须显式转换。

声明变量：
```go

var a IZ = 5

```
如果有多个类型需要定义，可以使用因式分解关键字的方式
```go

type (

    IZ int
    FZ float64
    STR string

)

```
**每个值都必须在经过编译后属于某个变量（编译器必须能够推断出所有值得类型），因为GO语言是一种静态类型语言。

## go程序的一般结构

1. 先完成import，开始对变量常量和类型的定义
2. 如果存在init函数，则对该函数定义（每个含有该函数的包都会首先执行此函数）
3. 如果当前包是main包，则定义main函数。
4. 定义其余的函数，首先是类型的方法，接着是按照main函数中先后调用的顺序来定义的相关函数，如果有很多函数，可以按照字母顺序来进行排序



```go

package main

import (

    "fmt"

)

const c = "C"

var v int = 5

type T struct{}

func init() {

}

func main(){
    var a int
    Func1()
    fmt.Print()
}
func (t T) Method1(){

}
func Func1(){

}


```
go程序的执行顺序
1. 按照顺序导入main引用的包，然后再没给包中执行如下流程
2. 如果该包引入了其他包,则从第一步开始递归执行,但是每个包只会被导入一次
3. 然后以相反的顺序在每个包中初始化常量和变量,如果该包含有init函数的话,则调用该函数
4. 在完成这一切后,main也执行同样的过程,最后调用main函数开始执行程序

```go

valueOfTypeB = typeB(valueOfTypeA)

//类型B的值 = 类型B(类型A的值)
a := 5.0
b := int(a)
fmt.Printf("%n",b)

```
数字型的常量是没有大小和符号的,并且可以使用任何精度而不会导致溢出

并行复制
```go

const beef,two,c = "eat",2,"veg"
const (
    Monday,Tuesday,Wednesday = 1,2,3
    Thurday,Friday,Sturday = 4,5,6
)

```
枚举赋值
```go

const (

    Unknown = 0
    Female = 1
    Male = 2

)

```


`iota`每次被使用都会自动加1,所以值为0,1,2
```go

const (

    a = iota
    b = iota
    c = iota

)

```
简写
```go

const (
    a = iota
    b
    c
)

```
`iota`每次碰到const都会重新重置为0
```go
type Color int

const (
    a Color = iota
    b
    c
    d
)

```

变量

```go
//ab相同类型
var a,b *int

```
```go

var a int
var b bool
var c string

//or
var (
    a int
    b bool
    c string
)
```
这种因式分解关键字一般用于全局变量
当一个变量被声明之后,系统自动赋予它该有的零值:
- int 0
- float 0.0
- bool false
- string ""
- 指针为nil
所有的内存在go中都经过初始化的
命名规则 小驼峰
如果全局变量希望外部包使用,则需要大驼峰

声明和赋值组合在一起

```go

var indentifier [type] = false
var a int = 15
var i = 5
var b bool = false
var str string = "Good Good Study"

```

```go

var a = 15
var b = false

//or
var (
    a = 15
    b = false
    city string
)
```
```go

//指定类型就不能自动判断
var n int64 = 2

```
变量的类型也可以在运行的时候自动判断
```go

var (
    HOME = os.Getenv("HOME")
    USER = os.Getenv("USER")
    GOROOT = os.Getenv("GOROOT")
)

```
在函数体内可以用简短语法
```go

a := 1

```



```go
package main
import (
    "fmt"
    "runtime"
    "os"
)
func main(){

    var goos string = runtime.GOOS
    fmt.Printf("goos",goos)
    path := os.Getenv("PATH")
    fmt.Printf("path:",path)

}

```

## 值类型和引用类型

程序中所有用到的内存在计算机中使用一堆箱子来表示,这些箱子被称为"字".
所有的字都使用相关的内存地址来进行表示(16进制)
所有像int,float,bool,string这些基本类型都属于值类型,直接只想存在内存中的值

可以通过`&i`来获取i的内存地址,例如0xf84000040
值类型的变量的值存储在栈中.
不同机器内存地址有所不同
更复杂的数据通常会需要使用多个字,这些数据一般使用引用类型保存.

## 简短形式,使用 := 赋值操作符
```go

a := 50

var a,b,c int
a,b,c = 1,2,'a'
//or
a,b,c := 1,2,'a'
```
交换变量
```go

a,b = b,a

```
空白标识符`_`,也被用于抛弃值,`_,b = 1,2` 1被抛弃了

用于函数返回的多个值
```go

val,err = Func1(var1)

```

## init()函数

初始化优先执行,在main之前,大多用于检验或者修复,以保证程序状态的正确性.


## 数据类型

- 整数:
    - int8（-128 -> 127）
    - int16（-32768 -> 32767）
    - int32（-2,147,483,648 -> 2,147,483,647）
    - int64（-9,223,372,036,854,775,808 -> 9,223,372,036,854,775,807）
- 无符号整数：
    - uint8（0 -> 255）
    - uint16（0 -> 65,535）
    - uint32（0 -> 4,294,967,295）
    - uint64（0 -> 18,446,744,073,709,551,615）
- 浮点型（IEEE-754 标准）：
    - float32（+- 1e-45 -> +- 3.4 * 1e38）
    - float64（+- 5 1e-324 -> 107 1e308）

**int是计算最快的一种类型**

**应该尽可能使用float64,因为`math`包中所有关于数学运算的函数都会要求接收这个类型.**

可以通过前面补`0`来表示八进制`077`;通过增加`0x`表示十六进制`0xFF`;使用`e`来表示10的连乘`1e3=1000,6.022e23=6.022x1e23`

可以通过`a := uint64(0)`来同事完成类型转换和赋值操作,a的类型就算uint64

go中不允许不同类型之间的混合使用,但是对于常量的类型限制非常少,因此允许常量之间的混合使用
```go

package main

func main() {
	
	var a int
	var b int64
	a = 15
	b = a + a //编译错误 cannot use a + a (value of type int) as int64 value in assignment
	b = b + 5

}

```
正确做法
```go

package main

import "fmt"

func main() {
	var n int16 = 34
	var m int32
	m = int32(n)
	fmt.Println(n)
	fmt.Println(m)
}

```
数字值转换
进行类似`a32BitInt = int32(a32Float)`的转换时,小数点后的数字将被丢弃.这种情况一般发生在从取值范围大到取值范围小的类型时,或者写一个判断保护一下:

```go
//int转uint8
func Uint8FromInt(n int) (uint8, error) {
	if 0 <= n && n <= math.MaxUint8 { //如果小于零或者不超过uint8的范围则转换
		return uint8(n), nil
	}
	return 0, fmt.Errorf("%d error", n)
}
//float64转int
func IntFromFloat64(x float64) int {
	if math.MinInt32 <= x && x <= math.MaxInt32 {
		whole, fraction := math.Modf(x) //把浮点数拆分成整数和小数两个部分
		println(whole)
		println(fraction)
		if fraction >= 0.5 { //四舍五入向上取整
			whole++
		}
		return int(whole)
	}
	panic(fmt.Sprintf("%g is out of the int32 range", x))//panic是内置函数,用于引发运行时的错误.类似于console.error()
}

```

## 复数

go拥有以下复数类型:
```go

complex64 (32 位实数和虚数)
complex128 (64 位实数和虚数)

```

复数使用`re+imI`来表示,其中`re`代表实数部分,`im`代表虚数部分,`I`代表根号负1
示例:
```go

var a complex64 = 5 + 10i
fmt.Println(a)

```
如果`re`和`im`都是float32,那么类型为complex64的复数c可以通过以下方式来获得
```go

c = complex(re,im)

```
函数`real(c)`和`imag(c)`可以分别获取相应的实数和虚数部分

`cmath`包中包含了一些操作复数的公共方法.如果你对内存的要求不高,最好使用complex128作为计算类型,因为相关函数都使用这个类型的参数.

## 位运算
位运算只能用于整数类型的变量,且需要当它们拥有等长位模式时.

```go

//按位与 &
1 & 1 //-> 1
1 & 0 //-> 0
//按位或 | 
1 | 1 //-> 1
1 | 0 //-> 1
//按位异或 ^
1 ^ 1 //-> 0
1 ^ 0 //-> 1
0 ^ 0 //-> 0
//位清除%^
//将指定位置上的值设置为0.

```

## 其他运算符

&获取变量的内存地址
*获取内存地址的变量

```go

    var a int = 10
	fmt.Printf("a对应的内存地址", &a)

	var b = &a
	fmt.Printf("b对应的值", *b)

```











