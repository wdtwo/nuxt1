---
title: python抓取www.ysts8.net幻听网小说多线程
date: 2020-05-14 16:38:53
image: https://cdn.wdtwo.com/anzhiyu/python467567.webp
category: 
- 后端
tags: 
- python
- 爬虫
---

调用浏览器测试应用chromedriver
<!--more-->
```python 
#-*- coding:utf-8 -*-

import re
import urllib3
import os
from selenium import webdriver
# 进程池
from multiprocessing import Pool
from time import time
from time import sleep

#创建文件夹
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

def main(name, save_url):
    print('开始下载：',name, link, save_url)
    res = getPageData(link).decode('gbk')
    download_url1 = re.findall('datas=(.*?)&mp3', res)
    download_url2 = re.findall('http(.*?)mp3&', download_url1[0])
    res = getPageData("http" + download_url2[0] + "mp3")
    with open(save_url + name + '.mp3', 'wb') as code:
        code.write(res)
    print(save_url + name + ' 下载完成!',time.strftime('%Y.%m.%d',time.localtime(time.time())))

def init(url, max_pages):
    arr_pages = []
    for n in range(0, max_pages):
        arr_pages.append(url + str(n + 1) + '.html')
    # print(arr_pages)
    return arr_pages

save_url = '/有声小说/大主宰/'
main_url = 'https://ting55.com/book/10797-159'

# datas = getPageData(main_url).decode('utf-8')
# print(datas)

driver = webdriver.Chrome(r'C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe')
# print(link)
driver.get(main_url)

# id = driver.find_element_by_id('jp_audio_0').get_attribute('src')
id = driver.find_element_by_css_selector("#jp_audio_0")
print(id)
# soup = re.findall('1号线路(.*?)本地1线', id)
# url = re.findall('http(.*?)" download', soup[0])
# print('http' + url[0])
# 关闭浏览器
driver.quit()
```
