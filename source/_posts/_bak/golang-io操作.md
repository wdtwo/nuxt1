---
title: go-io操作
date: 2023-04-14 17:31:41
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
categories:
- 后端
tags:
- go

---

- 输入输出底层原理
- 文件操作相关API
- 打开和关闭文件
- 读文件
- 拷贝复制文件
- bufio
- 一个例子 实现linux的cat命令功能

<!--more-->

## 输入输出底层原理
终端其实是一个文件
- `os.Stdin`:标准输入的文件实例,类型为`*File`
- `os.Stdout`:标注输出的文件实例,类型为`*File`
- `os.Stderr`:标准错误输出的文件实例,类型为`*File`

## 文件操作相关API

1. `func Create(name string) (file *File,err Error)`
    - 根据提供的文件名创建一个新的文件,返回一个文件对象,默认权限是0666
2. `func NewFile(fd uintptr,name string) *File`
    - 根据文件描述符创建响应的文件,返回一个文件对象
3. `func Open(name string)(file *File,err Error)`
    - 只读方式打开一个名称为name的文件
4. `func OpenFile(name string,flag int,perm uint32)(file *File,err Error)`
    - 打开一个文件,flay是打开方式,只读,读写等,perm是权限
5. `func(file *File) Write(b []byte)(n int,err Error)`
    - 写入byte类型的信息到文件
6. `func(file *File) WriteAt(b []byte,off int64)(n int,err Error)`
    - 在指定位置开始写入byte类型的信息
7. `func (file *File) writeString(s string) (ret int,err Error)`
    - 写入string信息到文件
8. `func (file *File) Read(b []byte)(n int,err Error)`
    - 读取数据到b中
9. `func(file *File) ReadAt(b []byte,off int64) (n int,err Error)`
    - 从off开始读取数据到b中
10. `func Remove(name string) Error`
    - 删除文件名为name的文件

对得到的文件实例调用`close()`方法可以关闭文件.

## 打开和关闭文件
打开文件
```go
package main
import (
	"fmt"
	"os"
)
func main() {
	//以只读方式打开一个文件
	file, err := os.Open("./main.go")
	if err != nil {
		fmt.Println("打开文件错误:" + err.Error())
		return
	}
	fmt.Println(file) //返回 一个&内存地址
	file.Close()      //关闭文件
}
```
创建并写入文件
```go
package main
import (
	"fmt"
	"os"
)
func main() {
	//新建一个文件
	file, err := os.Create("./test.txt")
	if err != nil {
		fmt.Println("文件创建错误:" + err.Error())
		return
	}
	defer file.Close() //程序运行结束以后关闭文件
	//循环写文件
	for i := 0; i < 5; i++ {
		file.WriteString("ab\n")
		file.Write([]byte("cd\n"))
	}
}
```
## 读文件
读文件可以用`file.Read()` `file.ReadAt()`,读取到文件末尾会返回io.EOF的错误
```go
package main
import (
	"fmt"
	"io"
	"os"
)
func main() {
	//打开文件
	file, err := os.Open("./test.txt")
	if err != nil {
		fmt.Println("打开文件报错:" + err.Error())
	}
	defer file.Close()
	//定义接收文件读取的字节数组
	var buf [128]byte
	var context []byte
	for {
		n, err := file.Read(buf[:])
		if err == io.EOF {
			//读取结束
			break
		}
		if err != nil {
			fmt.Println("读取文件报错:" + err.Error())
			return
		}
		context = append(context, buf[:n]...)
	}
	fmt.Println("输出读取到的文件:" + string(context))
}
```
## 拷贝复制文件
```go
package main
import (
	"fmt"
	"io"
	"os"
)
func main() {
	//打开文件
	srcFile, err := os.Open("./test.txt")
	if err != nil {
		fmt.Println("打开文件报错:" + err.Error())
		return
	}
	defer srcFile.Close()
	//创建新文件
	dsFile, err := os.Create("./test2.txt")
	if err != nil {
		fmt.Println("创建新文件报错:" + err.Error())
		return
	}
	defer dsFile.Close()
	//缓冲读取
	buf := make([]byte, 1024)
	for {
		//从源文件读取数据
		n, err := srcFile.Read(buf)
		if err == io.EOF {
			fmt.Println("读取源文件结束")
			return
		}
		if err != nil {
			fmt.Println("读取源文件报错:" + err.Error())
			return
		}
		//直接写入新文件
		dsFile.Write(buf[:n])
	}
}
```

## bufio

- bufio包实现了带缓冲区的读写,是对文件读写的封装
- bufio缓冲写数据

| 模式 | 含义 |
| :---:| :---:|
| os.O_WRONLY | 只写 |
| os.O_CREATE | 创建文件 |
| os.O_RDONLY | 只读 |
| os.O_RDWR   | 读写 |
| os.O_TRUNC  | 清空 |
| os.O_APPEND | 追加 |

读数据
```go
package main
import (
	"bufio"
	"fmt"
	"io"
	"os"
)
func main() {
	re()
}
func re() {
	file, err := os.Open("./test.txt")
	if err != nil {
		fmt.Println("打开文件错误:" + err.Error())
	}
	defer file.Close()
	reader := bufio.NewReader(file)
	for {
		line, _, err := reader.ReadLine()
		if err == io.EOF {
			fmt.Println("读取结束")
			break
		}
		if err != nil {
			fmt.Println("读取报错:" + err.Error())
            return
		}
		fmt.Println(string(line))
	}
}
```
```go
package main
import (
	"bufio"
	"fmt"
	"os"
)
func main() {
	wr()
}
func wr() {
	//没有就创建 有了就打开
	//参数二:打开模式,所有模式d都在上面
	//参数三:权限控制
	//w写 r读 x执行 w 2   r 4  x 1
	file, err := os.OpenFile("./test.txt", os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		fmt.Println("读取文件报错:" + err.Error())
		return
	}
	defer file.Close()
	write := bufio.NewWriter(file)
	for i := 0; i < 10; i++ {
		write.WriteString("hello\n")
	}
	//刷新缓冲区,强制写出
	write.Flush()
}
```
## ioutil工具包
写文件
```go
package main
import (
	"fmt"
	"io/ioutil"
)
func main() {
	err := ioutil.WriteFile("./test.txt", []byte("www.baidu.com"), 0666)
	if err != nil {
		fmt.Println("写入错误:" + err.Error())
		return
	}
}
```
读取文件
```go
package main
import (
	"fmt"
	"io/ioutil"
)
func main() {
	content, err := ioutil.ReadFile("./test.txt")
	if err != nil {
		fmt.Println("打开文件出错:" + err.Error())
		return
	}
	fmt.Println(string(content))
}
```

## 一个例子 实现linux的cat命令功能
```go
package main
import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"os"
)
func main() {
	//解析命令行参数
	flag.Parse()
	if flag.NArg() == 0 {
		//如果没有参数默认从标准输入读取内容(输入什么显示什么)
		cat(bufio.NewReader(os.Stdin))
	}
	//一次读取每个指定文件的内容并打印到终端
	for i := 0; i < flag.NArg(); i++ {
		f, err := os.Open(flag.Arg(i))
		if err != nil {
			fmt.Fprintf(os.Stdout, "读取文件出错 : %s,%v", flag.Arg(i), err)
			continue
		}
		cat(bufio.NewReader(f))
	}
}
func cat(r *bufio.Reader) {
	for {
		//注意是字符
		buf, err := r.ReadBytes('\n')
		if err == io.EOF {
			break
		}
		fmt.Fprintf(os.Stdout, "输出 : %s", buf)
	}
}
```

[](https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500)
