---
title: golang-批量pingip地址操作
date: 2023-10-10 09:07:30
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

## 单线程操作

使用第三方ping包

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-ping/ping"
)

func PING(ipAddr string) bool {
	pinger, err := ping.NewPinger(ipAddr)
	if err != nil {
		fmt.Printf("NewPinger error:%s\n", err.Error())
	}
	// 设置ping包数量
	pinger.Count = 5
	// 设置超时时间
	pinger.Timeout = time.Second * 10
	// 设置成特权模式
	pinger.SetPrivileged(true)
	// 运行pinger
	err = pinger.Run()
	if err != nil {
		fmt.Printf("ping异常：%s\n", err.Error())
	}
	stats := pinger.Statistics()
	// 如果回包大于等于1则判为ping通
	if stats.PacketsRecv >= 1 {
		fmt.Printf("IP can reach:%s\n", ipAddr)
		return true
	} else {
		fmt.Printf("IP can not reach:%s\n", ipAddr)
		return false
	}
}

func main() {
	result1 := PING("223.5.5.5")
	fmt.Println(result1)
	result2 := PING("200.200.200.200")
	fmt.Println(result2)
}

```

## 多协程操作

使用第三方ping包

```go
package main

import (
	"fmt"
	"net"
	"os"
	"sync"
	"time"

	"github.com/go-ping/ping"
)

var (
	core     int           = 1000              // 协程数量
	interval time.Duration = 10                // 间隔时间
	subnet   string        = "190.93.240.0/20" // ip地址网
)

// 处理ip地址网 转换成ip地址列表
func generateIPs(subnet string) []string {
	ips := []string{}
	ip, ipNet, err := net.ParseCIDR(subnet)
	if err != nil {
		fmt.Println("无效的子网掩码:", err)
		return ips
	}

	for ip := ip.Mask(ipNet.Mask); ipNet.Contains(ip); incIP(ip) {
		ips = append(ips, ip.String())
	}

	// Remove network address and broadcast address
	return ips[1 : len(ips)-1]
}

func incIP(ip net.IP) {
	for j := len(ip) - 1; j >= 0; j-- {
		ip[j]++
		if ip[j] > 0 {
			break
		}
	}
}

func main() {

	//处理ip地址网转换成ip地址列表
	ips := generateIPs(subnet)

	// 创建一个任务通道 用来存放ip地址列表
	ipsChannl := make(chan string, len(ips))

	// 把ip地址列表存储到任务通道中
	// 设置待处理数据的原始值
	for i := 0; i < len(ips); i++ {
		ipsChannl <- ips[i]
	}
	// 当前进度
	count := 0

	// 关闭通道
	close(ipsChannl)

	// 创建一个结果排队通道
	results := make(chan string, len(ips))

	var wg sync.WaitGroup

	// 同时启动多个线程来处理
	for i := 0; i < core; i++ {
		wg.Add(1)
		// 10毫秒启动一个协程
		time.Sleep(time.Millisecond * interval)
		go func(id int) {
			defer wg.Done()
			PING(id, ipsChannl, results, &count, len(ips))
		}(i)
	}
	stop := false
	// 循环读取结果排队通道中的数据
	for ip := range results {
		// 把数据保存到文件中
		saveToText(ip)
		// 如果所有协程都执行完成则停止读取排队通道
		if stop {
			break
		}
	}
	// 等待所有协程执行完毕
	go func() {
		wg.Wait()
		close(results)
		stop = true
	}()
}

// ping ip地址并返回是否成功
func PING(id int, ips <-chan string, results chan string, count *int, total int) {

	// 处理ip地址列表
	// fmt.Printf("当前协程id:%d , 当前处理ip:%s .\n", id, ip)
	// 此处好像取多了 需要改变for
	for ip := range ips {
		fmt.Printf("协程编号: %d ,开始处理任务: %s ,当前进度:%d / %d \n", id, ip, *count, total)

		pinger, err := ping.NewPinger(ip)
		if err != nil {
			fmt.Printf("NewPinger error:%s\n", err.Error())
		}
		// 设置ping包数量
		pinger.Count = 4
		// 设置超时时间
		pinger.Timeout = time.Second * 2
		// 设置成特权模式
		pinger.SetPrivileged(true)
		// 运行pinger
		err = pinger.Run()
		if err != nil {
			fmt.Printf("ping异常：%s\n", err.Error())
		}
		stats := pinger.Statistics()
		// 如果回包大于等于1则判为ping通
		if stats.PacketsRecv >= 1 {
			fmt.Printf("IP ping成功:%s\n", ip)
			// 把数据保存到管道中
			results <- ip
		} else {
			fmt.Printf("IP ping不通:%s\n", ip)
		}
		// 不论成功还是失败都要累加
		*count += 1
		time.Sleep(time.Microsecond * 100) // 休眠0.1秒
	}

}

// 此处保存文件同时操作的太多会导致文件重复 需要添加一个管道进行保存排队 -------------
func saveToText(ip string) {
	file, err := os.OpenFile("reachable_ips.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0777)
	if err != nil {
		fmt.Println("打开文档出错:", err)
		return
	}
	defer file.Close()

	_, err = fmt.Fprintln(file, ip)
	if err != nil {
		fmt.Println("写入数据出错:", err)
	}
}

```

## 多协程 根据配置文件来ping地址
同级目录创建ips.txt文件
```txt
108.156.0.0/14
13.224.0.0/14
```
打包成exe文件
```bash
go build
```
运行bat脚本文件
```bash
@ECHO OFF
ping.exe
```
成功的ip地址保存在`reachable_ips.txt`中,每次运行会累加 不会清空原本的内容
### 执行代码
```go
package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"regexp"
	"sync"
	"time"

	"github.com/go-ping/ping"
)

var (
	core     int           = 200        // 协程数量
	interval time.Duration = 10         // 间隔时间
	ipsArr                 = []string{} // 创建一个切片 用来保存IP地址列表
)

// 处理ip地址网 转换成ip地址列表
func generateIPs(subnet string) []string {
	ips := []string{}
	ip, ipNet, err := net.ParseCIDR(subnet)
	if err != nil {
		fmt.Println("无效的子网掩码:", err)
		return ips
	}

	for ip := ip.Mask(ipNet.Mask); ipNet.Contains(ip); incIP(ip) {
		ips = append(ips, ip.String())
	}

	// Remove network address and broadcast address
	return ips[1 : len(ips)-1]
}

func incIP(ip net.IP) {
	for j := len(ip) - 1; j >= 0; j-- {
		ip[j]++
		if ip[j] > 0 {
			break
		}
	}
}

func main() {

	// 打开文件
	file, err := os.Open("ips.txt")
	if err != nil {
		fmt.Println("打开文件失败:", err)
		return
	}
	defer file.Close()
	// 创建正则表达式以匹配IP地址
	ipPattern := `(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2})`
	re := regexp.MustCompile(ipPattern)

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		// 在每行中查找IP地址
		ips := re.FindAllString(line, -1)
		for _, ip := range ips {
			fmt.Println("找到ip地址:", ip)
			//处理ip地址网转换成ip地址列表
			ipList := generateIPs(ip)
			ipsArr = append(ipsArr, ipList...)
		}

	}

	// 创建一个任务通道 用来存放ip地址列表
	ipsChannl := make(chan string, len(ipsArr))
	// 把ip地址列表存储到任务通道中
	// 设置待处理数据的原始值
	for i := 0; i < len(ipsArr); i++ {
		ipsChannl <- ipsArr[i]
	}

	// 当前进度
	count := 0

	// 关闭通道
	close(ipsChannl)

	// 创建一个结果排队通道
	results := make(chan string, len(ipsArr))

	var wg sync.WaitGroup

	// 同时启动多个线程来处理
	for i := 0; i < core; i++ {
		wg.Add(1)
		// 10毫秒启动一个协程
		time.Sleep(time.Millisecond * interval)
		go func(id int) {
			defer wg.Done()
			PING(id, ipsChannl, results, &count, len(ipsArr))
		}(i)
	}
	stop := false
	// 循环读取结果排队通道中的数据
	for ip := range results {
		// 把数据保存到文件中
		saveToText(ip)
		// 如果所有协程都执行完成则停止读取排队通道
		if stop {
			break
		}
	}
	// 等待所有协程执行完毕
	go func() {
		wg.Wait()
		close(results)
		stop = true
	}()

	if err := scanner.Err(); err != nil {
		fmt.Println("解析文件失败:", err)
	}

}

// ping ip地址并返回是否成功
func PING(id int, ips <-chan string, results chan string, count *int, total int) {

	// 处理ip地址列表
	// fmt.Printf("当前协程id:%d , 当前处理ip:%s .\n", id, ip)
	// 此处好像取多了 需要改变for
	for ip := range ips {
		fmt.Printf("协程编号: %d ,开始处理任务: %s ,当前进度:%d / %d \n", id, ip, *count, total)

		pinger, err := ping.NewPinger(ip)
		if err != nil {
			fmt.Printf("NewPinger error:%s\n", err.Error())
		}
		// 设置ping包数量
		pinger.Count = 4
		// 设置超时时间
		pinger.Timeout = time.Second * 2
		// 设置成特权模式
		pinger.SetPrivileged(true)
		// 运行pinger
		err = pinger.Run()
		if err != nil {
			fmt.Printf("ping异常：%s\n", err.Error())
		}
		stats := pinger.Statistics()
		// 如果回包大于等于1则判为ping通
		if stats.PacketsRecv >= 1 {
			fmt.Printf("IP ping成功:%s\n", ip)
			// 把数据保存到管道中
			results <- ip
		} else {
			fmt.Printf("IP ping不通:%s\n", ip)
		}
		// 不论成功还是失败都要累加
		*count += 1
		time.Sleep(time.Microsecond * 100) // 休眠0.1秒
	}

}

// 此处保存文件同时操作的太多会导致文件重复 需要添加一个管道进行保存排队 -------------
func saveToText(ip string) {
	file, err := os.OpenFile("reachable_ips.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0777)
	if err != nil {
		fmt.Println("打开文档出错:", err)
		return
	}
	defer file.Close()

	_, err = fmt.Fprintln(file, ip)
	if err != nil {
		fmt.Println("写入数据出错:", err)
	}
}

```







## bat脚本批量pingip成功保存

```bash
@echo off
setlocal enabledelayedexpansion

set INPUT_FILE=ip_addresses.txt
set OUTPUT_FILE=reachable_ips.txt

rem Delete the existing output file
del %OUTPUT_FILE% 2>nul

for /f "delims=" %%i in (%INPUT_FILE%) do (
    echo this ping : %%i
    ping -n 1 %%i | find "TTL=" >nul
    if !errorlevel! == 0 (
        echo %%i >> %OUTPUT_FILE%
    ) else (
        echo error!!!
    )
)

echo Ping completed. Reachable IP addresses saved to %OUTPUT_FILE%

endlocal
```





