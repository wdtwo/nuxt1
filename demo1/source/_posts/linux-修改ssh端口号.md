---
title: linux修改ssh端口号
date: 2023-05-15 14:29:26
image: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
category: 
- 前端
tags: 
- linux
---

编辑配置文件
```bash
vim /etc/ssh/sshd_config
```

添加一个新的端口
```bash
# If you want to change the port on a SELinux system, you have to tell
# SELinux about this change.
# semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
Port 22
Port 10022
```
重启服务
```bash
systemctl restart sshd  
shutdown -r now  
```
使用新的端口号登录 如果没有问题再注释掉22端口 如果只有22端口则不需要添加22端口 默认注释即可