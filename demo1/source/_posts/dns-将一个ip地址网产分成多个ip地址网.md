---
title: dns-将一个ip地址网产分成多个ip地址网
date: 2023-11-01 16:39:31
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags: [go]
draft: false
---

## 将一个ip地址网拆分成多个
```go
package main

import (
	"fmt"
	"math/big"
	"net"
	"os"
)

func main() {
	// go run main.go 192.168.0.0/16
	args := os.Args[1:]
	bigIPNet := args[0]

	// 解析 IP 地址网
	_, ipnet, err := net.ParseCIDR(bigIPNet)
	if err != nil {
		fmt.Println("解析 IP 地址网时出错:", err)
		return
	}
	// 获取子网掩码
	subnetMask := ipnet.Mask
	// 计算 IP 地址数量
	ipCount := calculateIPCount(subnetMask)
	// 拆分成多个小的IP地址网
	subnets := splitIPNet(ipnet, 24, ipCount/256) // 拆分成多个/24子网
	fmt.Println(subnets)
	// 打印拆分后的子网
	str := ""
	for v := range subnets {
		str += subnets[v].String() + "\n"
	}
	file, err := os.OpenFile("reachable_ips.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0777)
	if err != nil {
		fmt.Println("打开文档出错:", err)
		return
	}
	defer file.Close()
	_, err = fmt.Fprintln(file, str)
	if err != nil {
		fmt.Println("写入数据出错:", err)
	}
}

// calculateIPCount 计算 IP 地址网中包含的 IP 地址数量
func calculateIPCount(subnetMask net.IPMask) int {
	// 计算 IP 地址数量
	mask := net.IPMask(subnetMask)
	ipCount := 1
	for _, b := range mask {
		ipCount *= 256 - int(b)
	}
	return ipCount
}

// splitIPNet 将给定的IP地址网拆分为指定数量的子网
func splitIPNet(ipnet *net.IPNet, newPrefixLen, numSubnets int) []*net.IPNet {
	ip := ipnet.IP
	subnetMask := net.CIDRMask(newPrefixLen, 32)
	subnetSize := new(big.Int).SetBit(new(big.Int), 32-newPrefixLen, 1)

	subnets := make([]*net.IPNet, numSubnets)
	for i := 0; i < numSubnets; i++ {
		newSubnet := &net.IPNet{
			IP:   ip,
			Mask: subnetMask,
		}
		subnets[i] = newSubnet

		// 更新下一个子网的起始IP
		ip = nextIP(ip, subnetSize)
	}
	return subnets
}

// nextIP 计算下一个子网的起始IP
func nextIP(ip net.IP, increment *big.Int) net.IP {
	ipInt := new(big.Int)
	ipInt.SetBytes(ip.To4())
	ipInt.Add(ipInt, increment)
	nextIP := make(net.IP, 4)
	copy(nextIP, ipInt.Bytes())
	return nextIP
}

```

## 批量读取txt中的ip地址网转换成小的ip地址网

```go
package main

import (
	"bufio"
	"fmt"
	"math/big"
	"net"
	"os"
	"regexp"
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
	ipPattern := `(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2})`
	re := regexp.MustCompile(ipPattern)
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		// 在每行中查找IP地址
		ips := re.FindAllString(line, -1)
		for _, ip := range ips {
			fmt.Println("找到ip地址:", ip)
			play(ip)
		}
	}
}

func play(bigIPNet string) {
	// 解析 IP 地址网
	_, ipnet, err := net.ParseCIDR(bigIPNet)
	if err != nil {
		fmt.Println("解析 IP 地址网时出错:", err)
		return
	}
	// 获取子网掩码
	subnetMask := ipnet.Mask
	// 计算 IP 地址数量
	ipCount := calculateIPCount(subnetMask)
	// 拆分成多个小的IP地址网
	subnets := splitIPNet(ipnet, 24, ipCount/256) // 拆分成多个/24子网
	fmt.Println(subnets)
	// 打印拆分后的子网
	str := ""
	for v := range subnets {
		str += subnets[v].String() + "\n"
	}
	file, err := os.OpenFile("reachable_ips.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0777)
	if err != nil {
		fmt.Println("打开文档出错:", err)
		return
	}
	defer file.Close()
	_, err = fmt.Fprintln(file, str)
	if err != nil {
		fmt.Println("写入数据出错:", err)
	}
}

// calculateIPCount 计算 IP 地址网中包含的 IP 地址数量
func calculateIPCount(subnetMask net.IPMask) int {
	// 计算 IP 地址数量
	mask := net.IPMask(subnetMask)
	ipCount := 1
	for _, b := range mask {
		ipCount *= 256 - int(b)
	}
	return ipCount
}

// splitIPNet 将给定的IP地址网拆分为指定数量的子网
func splitIPNet(ipnet *net.IPNet, newPrefixLen, numSubnets int) []*net.IPNet {
	ip := ipnet.IP
	subnetMask := net.CIDRMask(newPrefixLen, 32)
	subnetSize := new(big.Int).SetBit(new(big.Int), 32-newPrefixLen, 1)

	subnets := make([]*net.IPNet, numSubnets)
	for i := 0; i < numSubnets; i++ {
		newSubnet := &net.IPNet{
			IP:   ip,
			Mask: subnetMask,
		}
		subnets[i] = newSubnet

		// 更新下一个子网的起始IP
		ip = nextIP(ip, subnetSize)
	}
	return subnets
}

// nextIP 计算下一个子网的起始IP
func nextIP(ip net.IP, increment *big.Int) net.IP {
	ipInt := new(big.Int)
	ipInt.SetBytes(ip.To4())
	ipInt.Add(ipInt, increment)
	nextIP := make(net.IP, 4)
	copy(nextIP, ipInt.Bytes())
	return nextIP
}

```
