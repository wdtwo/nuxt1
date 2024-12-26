---
title: dns-ip段求子网掩码
date: 2023-07-31 17:44:13
image: https://cdn.wdtwo.com/anzhiyu/DNS.jpg
category: 
- 后端
tags: 
- dns
---

## gcore
```js
var list = [
    "93.123.11.0/26",
    "92.223.108.0/27",
    "92.223.92.16/28",
    "92.46.108.104/30",
    "194.152.37.176/28"
]
```
## cloudfront
```js
var list = [
    "120.52.22.96/27",
    "205.251.249.0/24",
    "180.163.57.128/26",
    "204.246.168.0/22",
    "111.13.171.128/26",
    "18.160.0.0/15",
    "205.251.252.0/23",
    "54.192.0.0/16",
    "204.246.173.0/24",
    "54.230.200.0/21",
    "120.253.240.192/26",
    "116.129.226.128/26",
    "130.176.0.0/17",
    "108.156.0.0/14",
    "99.86.0.0/16",
    "205.251.200.0/21",
    "13.32.0.0/15",
    "120.253.245.128/26",
    "13.224.0.0/14",
    "70.132.0.0/18",
    "15.158.0.0/16",
    "111.13.171.192/26",
    "13.249.0.0/16",
    "18.238.0.0/15",
    "18.244.0.0/15",
    "205.251.208.0/20",
    "65.9.128.0/18",
    "130.176.128.0/18",
    "58.254.138.0/25",
    "54.230.208.0/20",
    "3.160.0.0/14",
    "116.129.226.0/25",
    "52.222.128.0/17",
    "18.164.0.0/15",
    "111.13.185.32/27",
    "64.252.128.0/18",
    "205.251.254.0/24",
    "54.230.224.0/19",
    "71.152.0.0/17",
    "216.137.32.0/19",
    "204.246.172.0/24",
    "18.172.0.0/15",
    "120.52.39.128/27",
    "118.193.97.64/26",
    "18.154.0.0/15",
    "54.240.128.0/18",
    "205.251.250.0/23",
    "180.163.57.0/25",
    "52.46.0.0/18",
    "52.82.128.0/19",
    "54.230.0.0/17",
    "54.230.128.0/18",
    "54.239.128.0/18",
    "130.176.224.0/20",
    "36.103.232.128/26",
    "52.84.0.0/15",
    "143.204.0.0/16",
    "144.220.0.0/16",
    "120.52.153.192/26",
    "119.147.182.0/25",
    "120.232.236.0/25",
    "111.13.185.64/27",
    "3.164.0.0/18",
    "54.182.0.0/16",
    "58.254.138.128/26",
    "120.253.245.192/27",
    "54.239.192.0/19",
    "18.68.0.0/16",
    "18.64.0.0/14",
    "120.52.12.64/26",
    "99.84.0.0/16",
    "130.176.192.0/19",
    "52.124.128.0/17",
    "204.246.164.0/22",
    "13.35.0.0/16",
    "204.246.174.0/23",
    "3.172.0.0/18",
    "36.103.232.0/25",
    "119.147.182.128/26",
    "118.193.97.128/25",
    "120.232.236.128/26",
    "204.246.176.0/20",
    "65.8.0.0/16",
    "65.9.0.0/17",
    "108.138.0.0/15",
    "120.253.241.160/27",
    "64.252.64.0/18"
]
```

## cloudflare

```js

var list = [
  "162.158.0.0/15",
  "103.21.244.0/22",
  "173.245.48.0/20",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "104.16.0.0/12",
  "172.64.0.0/13",
  "131.0.72.0/22"
]
```
```js
function calculateSubnetFirstAndLastIP(networkAddress, prefixLength) {
    // 将子网地址转换为32位整数
    const networkNumber = ipToNumber(networkAddress);
  
    // 计算子网掩码中的主机位数
    const hostBits = 32 - prefixLength;
  
    // 计算子网中可用的IP数量
    const availableIPs = 2 ** hostBits;
  
    // 计算子网的第一个IP地址和最后一个IP地址
    const firstIPNumber = networkNumber;
    const lastIPNumber = networkNumber + availableIPs - 1;
  
    // 将32位整数转换回IP地址格式
    const firstIP = numberToIP(firstIPNumber);
    const lastIP = numberToIP(lastIPNumber);
  
    return { firstIP, lastIP };
  }
  
  function getRandomInt(min, max) {
    // 生成指定范围内的随机整数（包括最小值，但不包括最大值）
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function ipToNumber(ipAddress) {
    // 将IP地址拆分成四个部分
    const ipParts = ipAddress.split(".");
  
    // 确保IP地址有四个部分
    if (ipParts.length !== 4) {
      throw new Error("Invalid IP address format");
    }
  
    // 将每个部分转换为数值，并合并成一个32位的整数
    const ipNumber = ipParts.reduce((acc, part) => (acc << 8) + parseInt(part, 10), 0);
  
    return ipNumber;
  }
  
  function numberToIP(ipNumber) {
    // 将32位整数拆分成四个部分，并转换回IP地址格式
    const ipParts = [];
    for (let i = 3; i >= 0; i--) {
      const part = (ipNumber >>> (i * 8)) & 255;
      ipParts.push(part);
    }
  
    const ipAddress = ipParts.join(".");
    return ipAddress;
  }
  
  function generateRandomIPsBetween(startIP, endIP, count) {
    const startNumber = ipToNumber(startIP);
    const endNumber = ipToNumber(endIP);
  
    const randomIPs = [];
  
    // 在起始和结束IP地址之间生成指定数量的随机IP地址
    for (let i = 0; i < count; i++) {
      const randomIPNumber = getRandomInt(startNumber, endNumber + 1);
      const randomIP = numberToIP(randomIPNumber);
      randomIPs.push(randomIP);
    }
  
    return randomIPs;
  }
  function countIPsBetween(startIP, endIP) {
    const startNumber = ipToNumber(startIP);
    const endNumber = ipToNumber(endIP);
  
    // 计算两个IP地址之间的IP数量（包括起始IP和结束IP）
    const count = endNumber - startNumber + 1;
  
    return count;
  }
  // 示例使用：
let ip = "108.156.0.0/14";
const networkAddress = ip.split('/')[0];
const prefixLength = 14;
const { firstIP, lastIP } = calculateSubnetFirstAndLastIP(networkAddress, ip.split('/')[1]);

console.log("第一个IP地址:", firstIP); // 输出：第一个IP地址: 108.156.0.0
console.log("最后一个IP地址:", lastIP); // 输出：最后一个IP地址: 108.159.255.255

const randomIPs = generateRandomIPsBetween(firstIP, lastIP, 10);
console.log("随机取出的10个IP地址:", randomIPs);

const numberOfIPsBetween = countIPsBetween(firstIP, lastIP);
console.log("两个IP地址之间共有多少个IP:", numberOfIPsBetween);
```