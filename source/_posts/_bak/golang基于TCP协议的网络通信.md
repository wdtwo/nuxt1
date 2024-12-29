---
title: golang基于TCP协议的网络通信
date: 2023-03-29 10:06:34
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
categories:
- 后端
tags:
- go
---

- 创建客户端
- 创建服务端

<!--more-->

## 创建客户端

```go
import (
	"encoding/json"
	"fmt"
	"net"
)

// tcp/client/main.go

// 客户端
func tcpClient() {
	conn, err := net.Dial("tcp", "127.0.0.1:2023")
	if err != nil {
		fmt.Println("拨号失败 :", err)
		return
	}
	defer conn.Close() // 关闭连接
	//阻塞 防止断开
	for {
		mes := struct {
			UserName string
			Mes      string
		}{
			UserName: "用户1",
		}
		fmt.Println("请输入要发送的内容:")
		//接收到的字符串存储到mes中
		fmt.Scanf("%s\n", &mes.Mes)
		if mes.Mes == "" {
			fmt.Println("字符串为空")
			continue
		}
		if mes.Mes == "exit" {
			fmt.Println("退出程序")
			return
		}
		//开始发消息
		//需要发送的是byte切片
		//1.效率比较低
		// data, _ := json.Marshal(&mes) //为了性能好传地址 &
		// n, err := conn.Write(data)    //write发送消息 read接收消息
		// if err != nil {
		// 	fmt.Println("发送失败")
		// 	return
		// }
		// fmt.Printf("成功发送了%v个字节\n", n)
		//2.高效一些
		err = json.NewEncoder(conn).Encode(&mes)
		if err != nil {
			fmt.Println("发送失败")
			return
		}
	}
}

```
## 创建服务端
```go
import (
	"encoding/json"
	"fmt"
	"io"
	"net"
)

func tcpServer() {
	listen, err := net.Listen("tcp", ":2023")
	if err != nil {
		fmt.Println("监听失败:", err)
		return
	}
	defer listen.Close()
	for {
		fmt.Println("主进程等待客户端连接...")
		conn, err := listen.Accept()
		if err != nil {
			fmt.Println("接听失败", err)
			continue
		}
		//协程
		go func(conn net.Conn) {
			fmt.Println("一个客户端协程已开启")
			defer conn.Close()
			for {

				// //1.笨办法 byte切片接收
				// buf := make([]byte, 4096) //缓冲区
				// n, err := conn.Read(buf)  //n是读到多少个切片
				// if err == io.EOF {
				// 	fmt.Println("客户端退出")
				// 	return
				// }
				// if err != nil {
				// 	fmt.Println("读取失败", err)
				// 	return
				// }
				// mes := struct {
				// 	UserName string
				// 	Mes      string
				// }{}
				// json.Unmarshal(buf[:n], &mes)

				//2.更好的写法
				mes := struct {
					UserName string
					Mes      string
				}{}
				err := json.NewDecoder(conn).Decode(&mes)
				if err == io.EOF {
					fmt.Println("客户端退出")
					return
				}
				if err != nil {
					fmt.Println("读取失败", err)
					return
				}
				fmt.Printf("%v说:%v\n", mes.UserName, mes.Mes)
			}
		}(conn)
	}
}
```















