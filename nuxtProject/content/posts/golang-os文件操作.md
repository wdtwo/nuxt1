---
title: golang-os文件操作
date: 2023-09-15 22:07:04
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## 文件操作
使用`os`包
```go
import (
    "fmt"
    "os"
)
```

## 打开和关闭文件
```go
// 打开文件:
file,err := os.Open("go.mod") // 返回一个指针类型和一个是否打开成功的状态
if err != nil {
    fmt.Println(err)
}
fmt.Println(*file) //一个指针地址
//关闭文件
err2 := file.Close()
if err2 != nil {
    fmt.Println("关闭失败: ",err)
}
```

## io的引入
io是流 程序和数据源之间沟通的桥梁这个桥梁就是io流
方向的定义:
- 从数据源向程序传入就是输入流 读取
- 从程序向外面传输就是输出流   输出

如果单靠os的file结构体只能读取到文件,不能对文件的内容进行操作

### 读取并输出到控制台(适合小文件)
此处不需要执行打开和关闭操作 因为都封装到了ReadFile包中
```go
import (
    "fmt"
    "os"
    _"io/ioutil" // 1.15之前用这个包 后面被弃用了 统一用os包
)
content,_ := os.ReadFile("go.mod") // file 是一个byte字符型的切片
fmt.Printf("%v",string(content)) // 通过fmt.Sprintf("%c",v)将编码转换成字符
```
### 带缓冲的读取文件 适合大文件
缓冲区的方式-4096字节,
使用:`os.Open()` `file.Close()` `bufio` `NewReader()` `reader.ReadString`函数和方法

```go
//先打开文件
file, err := os.Open("a.txt")
if err != nil {
    fmt.Println("文件打开失败:",err)
    return //此处不返回会死循环
}
// 执行结束关闭文件
defer file.Close()
//用bufio创建一个流
reader := bufio.NewReader(file)
for {
    // 读取到一个换行就结束
    str,err := reader.ReadString('\n')
    //碰到文件结尾就跳出循环
    if err == io.EOF{
        break
    }
    // 输出每一行的数据
    fmt.Printf("%v",str)
}
fmt.Println("exit...")
```

### 输出文件
Openfile的打开模式
- O_RDONLY  // 只读模式打开文件
- O_WRONLY  // 只写模式打开文件
- O_RDWR    // 读写模式打开文件
- O_APPEND  // 写操作时将数据附加到文件尾部
- O_CREATE  // 如果不存在将创建一个新文件
- O_EXCL    // 和O_CREATE配合使用，文件必须不存在
- O_SYNC    // 打开文件用于同步I/O
- O_TRUNC   // 如果可能，打开时清空文件

```go
import (
	"fmt"
	"os"
	"bufio"
)
func main(){
	// 写入操作
	// 先打开文件
    //                     文件路径  文件的操作方式 使用 | 设置多个       操作权限
	file,_ := os.OpenFile("b.txt",os.O_RDWR | os.O_APPEND | os.O_CREATE,0666)
	// 关闭文件
	defer file.Close()
	// 写入操作 IO流 缓冲输出流
	writer := bufio.NewWriter(file)
	writer.WriteString("66dfohjdoihdl\njhlkfdjghlkdfjghl") // 如果写入的文件比较多可以使用for循环调用WriteString
	// 现在 数据还在缓冲区 需要刷新数据
	writer.Flush() //刷新后写入完成
	fmt.Println("exit...") 
}
```

### 复制文件
使用ioutil
```go
import (
	"fmt"
	"io/ioutil"
)
func main(){
	// 文件复制
    //读取一个文件的内容
	reader,err := ioutil.ReadFile("a.txt")
	if err != nil {
		fmt.Println("打开文件失败:",err)
		return
	}
    //写入一个文件的内容      路径   内容[]byte  权限 
	err2 := ioutil.WriteFile("d.txt",reader,0777)
	if err2 != nil {
		fmt.Println("写入失败:",err2)
	}

	fmt.Println("exit...") 
}
```
使用缓冲区复制 一遍读一边写
```go
import (
	"fmt"
	"os"
	"bufio"
	"io"
)
func main(){
	// 先打开文件
	file,err := os.Open("a.txt")
	if err != nil {
		fmt.Println("打开文件失败:",err)
		return
	}
	defer file.Close()
	//读取file里的文件
	reader := bufio.NewReader(file)
	//打开写入文件
	save,err := os.OpenFile("e.txt",os.O_CREATE | os.O_APPEND | os.O_RDWR,0777)
	writer := bufio.NewWriter(save)
    // 全都完成后刷新输出流
    defer writer.Flush()
	//循环读取->写入
	for {
        // 读取数据
		str,err := reader.ReadString('\n')
        // 写入数据
		writer.WriteString(str)
		fmt.Println(str)
		if err == io.EOF {
			break
		}
	}
	fmt.Println("exit...") 
}
```
