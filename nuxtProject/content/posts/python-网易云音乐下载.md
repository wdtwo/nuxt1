---
title: python网易云音乐下载
published: 2023-05-28 16:43:42
image: https://cdn.wdtwo.com/anzhiyu/python467567.webp
category: 后端
tags: [python,爬虫]
draft: false
---
python网易云音乐下载
<!--more-->
```python
#-*- coding:utf-8 -*-

import re
import urllib3
import os
# 进程池
from multiprocessing import Pool
from time import sleep
import json


# 创建文件夹
def mkdir(path):
    isExists = os.path.exists(path)
    if not isExists:
        os.makedirs(path) #不存在则创建
        # print('文件夹创建成功')
    # else:
    #     print('文件夹已存在')

def getPageData(link):
    http = urllib3.PoolManager(
        num_pools=5,
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
        }
    )
    res = http.request('GET', link)
    return res.data
def main(name, link, save_url):
    print('开始下载：',name, link)
    with open(save_url + name + '.mp3_bak', mode="w", encoding="utf-8") as f:
        pass
    res = getPageData(link).decode('gbk')
    download_url1 = re.findall('datas=(.*?)&mp3', res)
    download_url2 = re.findall('http(.*?)mp3&', download_url1[0])
    res = getPageData("http" + download_url2[0] + "mp3")
    with open(save_url + name + '.mp3', 'wb') as code:
        code.write(res)
    # print(save_url + name + ' 下载完成!')
    os.remove(save_url + name + '.mp3_bak')
def init(url):
    datas = getPageData(url)
    print(json.loads(datas)['result']['songCount'])
save_url = '/网易云音乐/'
args = '邓紫棋&offset=1&limit=1&type=1'
main_url = 'http://music.163.com/api/search/get?s=' + args

arr = init(main_url)
mkdir(save_url)
```
