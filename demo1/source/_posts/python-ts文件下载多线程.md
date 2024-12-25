---
title: python-ts文件下载多线程
date: 2023-06-07 16:56:20
image: https://cdn.wdtwo.com/anzhiyu/python467567.webp
category: 
- 后端
tags: 
- python
- 爬虫
- 视频处理
---

- 爬虫
- 视频处理
- 文件处理
- 
<!--more-->
```python
# -*- coding: utf-8 -*-

import os
import requests
# import subprocess
from time import sleep
from multiprocessing import Pool

# 创建文件夹
def mkdir(path):
    isExists = os.path.exists(path)
    if not isExists:
        os.makedirs(path) # 不存在则创建
        print('文件夹创建成功')
    else:
        print('文件夹已存在')
# 循环加零并转换数字为字符串
def forNum(n):
    n = int(n)
    if n < 10:
        a = '00000' + str(n)
    else:
        if n < 100:
            a = '0000' + str(n)
        else:
            if n < 1000:
                a = '000' + str(n)
            else:
                if n < 10000:
                    a = '00' + str(n)
                else:
                    if n < 100000:
                        a = '0' + str(n)
                    else:
                        if n < 1000000:
                            a = str(n)
    return a
# 分离m3u8文件 修改下载文件为 | 提取下载文件名称
def editM3u8(url_m3u8):
    f = open(url_m3u8, 'r', encoding='utf-8')
    # 分解文件行数据
    text_list = f.readlines()
    # 下载列表
    files = []
    # 提取下载文件列表
    for i in text_list:
        if i.find('#EX') == -1:
            files.append(str.strip(i))
    f.close()
    return files
# 调用线程下载文件
def download_init(files, tit_link):
    # 循环列表下载
    # 多线程
    if __name__ == "__main__":
        pool = Pool(4)
        for n in range(0, len(files)):
            a = forNum(n)
            url = tit_link + str(files[n])
            pool.apply_async(download, (url, a))
        pool.close()
        pool.join()
    # 单线程
    # for n in range(0, len(files)):
    #     # 数字加零并转换成字符串
    #     a = forNum(n)
    #     url = tit_link + str(n) + '.ts'
    #     # print(url, a)
    #     # 下载文件
    #     download(url, a)
# 下载文件
def download(url, num):
    # print(num + "开始下载")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    }
    print(url)
    response = requests.get(url, headers=headers)
    f = open("./ts/" + num + '.ts', "wb")
    f.write(response.content)
    f.close()
    print(num + "下载完成")
# 删除文件
def delFile(file):
    os.remove(file)
# m3u8地址
url_m3u8 = './ts/boss.m3u8' # 文件路径
tit_link = "https://baikevideo.cdn.bcebos.com/media/mda-XzWxczOmPXU0VoI4/" # 下载前缀
mkdir('./ts/')
# 提取m3u8文件
files = editM3u8(url_m3u8)
# 启动下载进程
download_init(files, tit_link)
# sleep(2)
# 合并视频命令
# subprocess.Popen('cd ts && copy/b *.ts video.mp4', shell=True)
# 在windows系统下面，直接可以使用:copy/b *.ts video.mp4  把所有ts文件合成一个mp4格式文件

```
