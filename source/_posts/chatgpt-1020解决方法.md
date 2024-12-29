---
title: chatgpt1020解决方法
date: 2023-01-30 09:08:49
cover: https://cdn.wdtwo.com/anzhiyu/lianjie038036.jpg
categories:
- 其他
tags:
- chatgpt
---

提示1020错误，尝试换了不同代理软件或者代理地点仍然无法解决，也搜了很多资料，比如删除cookie、重启浏览器、更换浏览器等均不起作用。问题错误情况如下：Access denied Error code 1020。

<!--more-->

```bash
I got an error when visiting chat.openai.com/.
 
Error code: 1020
 
Ray ID: 78959bde8a75d021
 
Country: CN
 
Data center: sjc08
 
IP: 1.183.7.58
 
Timestamp: 2023-01-14 10:15:09 UTC
```


## 问题原因

造成1020错误的主要原因是代理问题。chatgpt登录网址为“https://chat.openai.com/”。当打开代理时，登录该网站会直接显示上述错误“Access denied Error code 1020”。前几天登录是不会出现这个问题的。
如果我们不采用代理，则可以打开如下登录界面，但是登录账号之后会出现“Oops! OpenAI's services are not available in your country. (error=unsupported_country)”，即国内IP已被限制。

## 解决方法
1. 清理cookie
2. 换vpn
3. 重置dns

### 重置dns方法

1. 管理员身份打开cmd
2. 输入: `ipconfig /flushdns`
3. 输入: `netsh winsock reset`
4. 输入: `netsh int ip reset`
5. 配置dns 
    - 首选: 8.8.8.8
    - 备选: 8.8.4.4

亲测暂时没啥效果