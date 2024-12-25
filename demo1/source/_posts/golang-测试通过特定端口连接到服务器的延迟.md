---
title: golang-测试通过特定端口连接到服务器的延迟
date: 2023-11-10 10:05:17
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 测试通过特定端口连接到服务器的延迟

```go
package main

import (
	"fmt"
	"net/http"
	"net/url"
	"time"

	"golang.org/x/net/proxy"
)

func main() {
	// 代理服务器地址和端口
	proxyStr := "socks5://127.0.0.1:1080"

	// 创建一个代理 Dialer
	proxyURL, err := url.Parse(proxyStr)
	if err != nil {
		fmt.Println("Error parsing proxy URL:", err)
		return
	}

	dialer, err := proxy.FromURL(proxyURL, proxy.Direct)
	if err != nil {
		fmt.Println("Error creating dialer:", err)
		return
	}

	// 创建一个带代理的 Transport
	transport := &http.Transport{
		Dial: dialer.Dial,
	}

	// 创建一个带自定义 Transport 的客户端
	client := &http.Client{
		Transport: transport,
		Timeout:   5 * time.Second, // 设置超时时间
	}

	// 创建一个 HTTP GET 请求
	url := "https://www.baidu.com"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("创建连接错误:", err)
		return
	}

	startTime := time.Now()
	// 发送请求
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("发送请求错误:", err)
		return
	}
	defer resp.Body.Close()
	elapsedTime := time.Since(startTime)
	// 读取响应
	// 这里可以根据实际需求处理响应
	fmt.Println("连接地址:", url, "延迟时间:", elapsedTime)
}

```