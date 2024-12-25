---
title: 玩客云armbian挂载硬盘
date: 2024-04-21 08:33:30
image: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
category: 
- 后端
tags: 
- linux
---

## 查看设备
```bash
lsblk
```
列出所有设备及挂载点
```bash
# 例子
NAME         MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
mmcblk0      179:0    0 58.3G  0 disk 
└─mmcblk0p1  179:1    0 58.3G  0 part 
mmcblk1      179:16   0  7.3G  0 disk 
mmcblk1boot0 179:32   0    4M  0 disk 
mmcblk1boot1 179:48   0    4M  0 disk 
zram0        253:0    0   50M  0 disk /var/log
```
## 创建挂载点
```bash
sudo mkdir /mnt/sdcard
```
## 挂载设备
```bash
sudo mount /dev/mmcblk0p1 /mnt/sdcard
```
提示`mount: special device /dev/mmcblk1p1 does not exist`说明挂载设备的路径`/dev/mmcblk0p1`不对，需要重新挂载
## 验证挂载点
```bash
ls /mnt/sdcard
```
## 卸载设备
```bash
sudo umount /mnt/sdcard
```
