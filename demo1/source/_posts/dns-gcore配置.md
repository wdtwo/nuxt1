---

title: cloudflare gcore配置
date: 2023-01-22 23:01:54
image: https://cdn.wdtwo.com/anzhiyu/DNS.jpg
category: 后端
tags: [dns]
draft: false
---


gcore配置

<!--more-->

### gcore

[gcore链接](https://gcore.com/)

注册账号 选择免费计划

填写二级域名


### 流程图

#### cdn创建新域名
![1](/src/gcore配置/1.png)
![2](/src/gcore配置/2.png)
![3](/src/gcore配置/3.png)
![4](/src/gcore配置/4.png)

#### 配置https

![5](/src/gcore配置/5.png)

#### 配置dns 

cloudflare域名指向这个dns加速节点

![6](/src/gcore配置/6.png)
![7](/src/gcore配置/7.png)
![8](/src/gcore配置/8.png)
![9](/src/gcore配置/9.png)

#### 配置gcore到服务器的https 这个地方如果服务器没有https也可以不配置 直接指向服务器接口即可

![10](/src/gcore配置/10.png)

#### 强制https

![11](/src/gcore配置/11.png)








