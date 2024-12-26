---
title: golang基于TCP协议的网络通信
date: 2023-09-17 13:32:34
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## net包

所需的网络编程都在`net`包下
大部分使用者只需要`Dial` `Listen` `Accpet`函数提供的基本接口;以及相关的`Conn` `Listener`
`crypto/tls`包提供了相同的接口和类似的`Dial` 和 `Listen`函数.

## 创建客户端
语法:
`func Dial(network ,address string) (Conn,err)`
地址格式:
```go
Dial("tcp", "12.34.56.78:80")
Dial("tcp", "google.com:http")
Dial("tcp", "[2001:db8::1]:http")
Dial("tcp", "[fe80::1%lo0]:80")
```
对IP网络，network必须是"ip"、"ip4"、"ip6"后跟冒号和协议号或者协议名，地址必须是IP地址字面值。
```go
Dial("ip4:1", "127.0.0.1")
Dial("ip6:ospf", "::1")
```
demo
```go
// 创建一个客户端
// 调用Dial函数  协议  地址
conn, err := net.Dial("tcp", "127.0.0.1:10808")
if err != nil {
	fmt.Println("客户端连接失败", err)
	return
}
fmt.Println("连接成功:", conn)
fmt.Println("exit...")
```
通过客户端终端向服务器发送数据
```go
// 通过终端输入信息
reader := bufio.NewReader(os.Stdin) // os.Stdin 代表终端输入
//从终端读取一行用户输入的数据
str, err := reader.ReadString('\n')
if err != nil {
	fmt.Println("读取用户输入的信息失败:", err)
	return
}
// 向服务端发送数据 n是发送了多少个字节
n, err := conn.Write([]byte(str))
if err != nil {
	fmt.Println("向服务端发送数据失败:", err)
}
fmt.Printf("向服务端发送了%d个字节的数据\n", n)
```


### 创建服务器端
Listener是一个用于面向流的网络协议的公用的网络监听器接口.多个线程可能会同时调用一个listener的方法.
Listener接口例子:
```go
type Listener interface{
	Addr() Addr
	Accept() (c Conn, err error)
	Close() error
}
```
demo
```go
fmt.Println("启动服务器端tcp")
listen, err := net.Listen("tcp", ":8888")
if err != nil {
	fmt.Println("监听失败:", err)
	return
}
fmt.Println("监听成功:", listen)
// 持续监听 
for {
	// 等待客户端连接
	conn, err := listen.Accept()
	if err != nil {
		fmt.Println("监听失败:",err)
		continue
	}
	// go poress()
	fmt.Println("conn:", conn)
}
```

### 接收来自客户端发送的数据
需要再上面代码的for中添加一个go协程
`go poress()`
```go
// 把连接传进来
func poress(conn net.Conn) {
	// 用完就关闭这个连接
	defer conn.Close()
	// 持续监听客户端发来的数据
	for {
		// 创建一个切片 用来存储输入来的数据
		buf := make([]byte, 1024)

		// 从conn连接中读取数据: n是多少个字节
		n, err := conn.Read(buf) // 把conn中的数据存入 buf中
		if err != nil {
			return
		}
		// 把[]byte类型强制转换成string类型,转换之前可能buf长度没有很长 所以进行截取操作 n是传输了多少个字节
		fmt.Println("读取到来自客户端的数据:", string(buf[0:n]))
	}
}
```










