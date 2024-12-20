---
title: StableDiffusion安装教程
published: 2023-02-17 08:28:04
image: https://cdn.wdtwo.com/anzhiyu/00413.jpg
category: 其他
tags: [StableDiffusion]
draft: false
---

stablediffusion安装教程

1. 下载安装git
2. 下载安装python3.10.6
3. 创建一个文件夹下载stablediffusion
4. 进入文件夹根目录修改配置文件
5. 运行webui-user.bat
6. 下载模型文件
7. 运行webui-user.bat
8. 汉化教程

- 如果下载github太慢可以去下载dev-sidecar

<!--more-->

## 下载安装git
直接下一步
[git下载地址](https://registry.npmmirror.com/-/binary/git-for-windows/v2.38.1.windows.1/Git-2.38.1-64-bit.exe)

## 下载安装python3.10.6
**安装时勾选 Add python.exe to PATH**
[python下载地址](https://mirrors.huaweicloud.com/python/3.10.6/python-3.10.6-amd64.exe)

## 创建一个文件夹下载stablediffusion
**有问题需要开魔法**
```bash
# cmd
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```
显示done就是成功了

## 进入文件夹根目录修改配置文件
webUI-> webui-user.bat
```bash
# 需要配置
# PYTHON
# VENV_DIR
# COMMANDLINE_ARGS
@echo off
set PYTHON="python.exe的安装目录"
set GIT=
set VENV_DIR=username
set COMMANDLINE_ARGS=--medvram --reinstall-xformers --xformers
call webui.bat
```
## 运行webui-user.bat

- 发现大量报错需要开魔法
- 如果出现pip upgrade pip则复制到cmd更新pip

## 下载模型文件
[资源网站](https://civitai.com/)

- 下载`asfetensors`和`ckpt`类型的文件
- 下载好后放到`stable-diffusion-webui`->`models`->`stable-diffusion`下

## 运行webui-user.bat
如果出现xformers报错则设置
```bash
set COMMANDLINE_ARGS=--medvram --reinstall-xformers --xformers
```
这一行
没有报错继续等待会需要几分钟
出现IP地址则成功

## 汉化教程

1. Extensions -> Available -> 取消勾选localization 找到zh_CN Localization安装install
2. settings -> 下面找Localization -> 设置zh-cn -> 回到上面 apply settings -> readling ui
3. 使用咒语生成想要的图片

## 神秘咒语
```bash
(((wear nothing,flat_breasts,bared,small_nipples, shaved_pussy,loli pussy,cameltoe,wide hips)))
```
```bash
nude, 
half naked
, show nipple
, perfect hand
```

## 如果下载github太慢可以去下载dev-sidecar

[链接地址](https://github.com/docmirror/dev-sidecar)







