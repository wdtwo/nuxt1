---
title: golang查询ip地址的归属地信息
date: 2023-10-19 09:18:54
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## golang查询ip地址的归属地信息

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type LocationInfo struct {
	Status    string `json:"status"`
	Country   string `json:"country"`
	Region    string `json:"regionName"`
	City      string `json:"city"`
	ZipCode   string `json:"zip"`
	ISP       string `json:"isp"`
	IPAddress string `json:"query"`
}

func main() {
	// 替换为您要查询的IP地址
	ipAddress := "8.8.8.8"

	// 构建API URL
	apiURL := fmt.Sprintf("http://ip-api.com/json/%s", ipAddress)

	// 发送HTTP GET请求
	resp, err := http.Get(apiURL)
	if err != nil {
		fmt.Println("HTTP请求失败:", err)
		return
	}
	defer resp.Body.Close()

	// 解析JSON响应
	var location LocationInfo
	err = json.NewDecoder(resp.Body).Decode(&location)
	if err != nil {
		fmt.Println("JSON解析失败:", err)
		return
	}

	// 打印归属地信息
	if location.Status == "success" {
		fmt.Printf("IP地址: %s\n", location.IPAddress)
		fmt.Printf("国家: %s\n", location.Country)
		fmt.Printf("地区: %s\n", location.Region)
		fmt.Printf("城市: %s\n", location.City)
		fmt.Printf("邮政编码: %s\n", location.ZipCode)
		fmt.Printf("ISP: %s\n", location.ISP)
	} else {
		fmt.Println("无法获取IP地址信息")
	}
}
```