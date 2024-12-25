---
title: golang-中文乱码
published: 2023-11-02 15:09:05
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags: [go]
draft: false
---

## 控制台中文乱码问题

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








