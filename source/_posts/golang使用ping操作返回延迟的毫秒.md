---
title: golang使用ping操作返回延迟的毫秒
date: 2023-10-19 09:13:04
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
categories:
- 后端
tags:
- go
---

## golang使用ping操作返回延迟的毫秒 单线程
```go
package main

import (
	"fmt"
	"os/exec"
	"strings"

	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
)

func main() {
	// 替换为您要Ping的目标主机或IP地址
	target := "204.246.164.10"

	// 使用exec.Command执行Ping命令，指定完整的路径
	cmd := exec.Command("C:\\Windows\\System32\\ping.exe", "-n", "1", target)

	// 执行Ping命令并捕获标准输出
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("Ping命令执行失败:", err)
		return
	}

	// 将输出从GBK编码转换为UTF-8
	decoder := simplifiedchinese.GBK.NewDecoder()
	output, _, _ = transform.Bytes(decoder, output)

	// 将输出转换为字符串
	outputStr := string(output)

	// 查找输出中关于延迟的行
	lines := strings.Split(outputStr, "\r\n") // 在Windows上使用"\r\n"分割行
	for _, line := range lines {
		if strings.Contains(line, "时间=") {
			parts := strings.Split(line, "时间=")
			if len(parts) >= 2 {
				delayPart := parts[1]
				delay := strings.Split(delayPart, "ms")[0]
				fmt.Printf("延迟: %s\n", delay)
			}
		}
	}
}
```

## 读取文本文件 多携程 完成后保存到txt
```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"sync"
	"time"

	"os/exec"
	"strings"

	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
)

var (
	core     int           = 200        // 协程数量
	interval time.Duration = 20         // 间隔时间
	ipsArr                 = []string{} // 创建一个切片 用来保存IP地址列表
)

func main() {

	// 打开文件
	file, err := os.Open("ips.txt")
	if err != nil {
		fmt.Println("打开文件失败:", err)
		return
	}
	defer file.Close()

	// 创建正则表达式以匹配IP地址
	ipPattern := `(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})`
	re := regexp.MustCompile(ipPattern)

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		// 在每行中查找IP地址
		ips := re.FindAllString(line, -1)
		ipsArr = append(ipsArr, ips...)
	}
	fmt.Println("总ip地址个数：", len(ipsArr))
	// 创建一个任务通道 用来存放ip地址列表
	ipsChannl := make(chan string, len(ipsArr))
	// 把ip地址列表存储到任务通道中
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
		// 防止携程锁死
		stop = true
	}()

	if err := scanner.Err(); err != nil {
		fmt.Println("解析文件失败:", err)
	}

}

// ping ip地址并返回是否成功
func PING(id int, ips <-chan string, results chan string, count *int, total int) {
	// 不论成功还是失败都要累加
	*count += 1
	time.Sleep(time.Microsecond * 100) // 休眠0.1秒

	for ip := range ips {
		fmt.Printf("协程编号: %d ,开始处理任务: %s ,当前进度:%d / %d \n", id, ip, *count, total)

		// 替换为您要Ping的目标主机或IP地址
		target := ip
		// 使用exec.Command执行Ping命令，指定完整的路径
		cmd := exec.Command("C:\\Windows\\System32\\ping.exe", "-n", "2", target)

		// 执行Ping命令并捕获标准输出
		output, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println("Ping命令执行失败:", err)
			return
		}

		// 将输出从GBK编码转换为UTF-8
		decoder := simplifiedchinese.GBK.NewDecoder()
		output, _, _ = transform.Bytes(decoder, output)

		// 将输出转换为字符串
		outputStr := string(output)

		// 查找输出中关于延迟的行
		lines := strings.Split(outputStr, "\r\n") // 在Windows上使用"\r\n"分割行
		for _, line := range lines {
			if strings.Contains(line, "时间=") {
				parts := strings.Split(line, "时间=")
				if len(parts) >= 2 {
					delayPart := parts[1]
					delay := strings.Split(delayPart, "ms")[0]

					fmt.Printf("IP ping成功:%s ,延迟:%s ms\n", ip, delay)
					// 把数据保存到管道中
					results <- (delay + "ms     " + ip)

				}
			}
		}
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