---
title: google cloud 开启ssh
date: 2023-05-15 14:29:26
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags:  [vps]
draft: false
---
- 开启ssh
- 服务器连接其他linux服务器
<!--more-->
### google cloud 开启ssh
```js
//切换到 root
sudo -i
//编辑ssh配置文件
vi /etc/ssh/sshd_config
//修改以下内容即可
PermitRootLogin yes
PasswordAuthentication yes
//重启ssh
service sshd restart
```
[原文](https://www.jingxialai.com/1618.html)

`Xshell创建密钥`
1. 工具
2. 新建用户密钥生成向导
3. DSA
4. 密码不填
5. 密钥名称填入google Cloud 元数据-SSH密钥，添加进去，添加的时候，在等号后面加上：空格+密钥名称

#### 服务器连接其他linux服务器
```js
ssh root@43.243.86.49 -p 22
```