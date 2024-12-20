---
title: python获取代理池ip并清洗
published: 2020-06-12 16:53:57
image: https://cdn.wdtwo.com/anzhiyu/python467567.webp
category: 后端
tags: [python,爬虫]
draft: false
---
python获取代理池ip并清洗
<!--more-->
## getip
```python
#-*- coding:utf-8 -*-

from bs4 import BeautifulSoup
import requests
import random

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
}

def getHTMLText(url,proxies):
    try:
        r = requests.get(url, proxies=proxies)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
    except:
        return 0
    else:
        return r.text

def get_ip_list(url):
    web_data = requests.get(url,headers)
    soup = BeautifulSoup(web_data.text, 'html')
    ips = soup.find_all('tr')
    ip_list = []
    for i in range(1, len(ips)):
        ip_info = ips[i]
        tds = ip_info.find_all('td')
        ip_list.append(tds[1].text + ':' + tds[2].text)
# 检测ip可用性，移除不可用ip：（这里其实总会出问题，你移除的ip可能只是暂时不能用，剩下的ip使用一次后可能之后也未必能用）
    for ip in ip_list:
        try:
          proxy_host = "https://" + ip
          proxy_temp = {"https": proxy_host}
          res = urllib.urlopen(url, proxies=proxy_temp).read()
        except Exception as e:
          ip_list.remove(ip)
          continue
    return ip_list

def get_random_ip(ip_list):
    proxy_list = []
    for ip in ip_list:
        proxy_list.append('http://' + ip)
    proxy_ip = random.choice(proxy_list)
    proxies = {'http': proxy_ip}
    return proxies

if __name__ == '__main__':
    url = 'http://www.xicidaili.com/nn/'
    ip_list = get_ip_list(url)
    # proxies = get_random_ip(ip_list)
    # print(proxies)
    print(111)

```
## ip代理池
```python
#-*- coding:utf-8 -*-

import urllib3
import re
from bs4 import BeautifulSoup
from time import sleep
from lxml import etree

# 获取代理池ip

# 获取代理池网站ip
def getIpPool(url):
    http = urllib3.PoolManager(
        headers={
           'Upgrade-Insecure-Requests': '1',
           'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
           'Accept-Encoding': 'gzip, deflate, sdch, br',
           'Accept-Language': 'zh-CN,zh;q=0.8',
        }
    )
    res = http.request('GET', url)
    # proxy = urllib3.ProxyManager('http://122.51.183.224:808/')
    # res = proxy.request('GET', url)
    return res.data

ip_pool = []
ip_pool_max = 1

# 添加需要的ip数量以后就不再添加了
while(len(ip_pool) < ip_pool_max):
    # print(getIpPool('https://www.xicidaili.com/nn/'+str(1)).decode('utf-8'))

    # 解析网页中的table
    res = getIpPool('https://www.xicidaili.com/nn/'+str(1)).decode('utf-8')
    text_html = BeautifulSoup(res,'lxml')
    # ip_list = BeautifulSoup(str(text_html.find_all(id='ip_list')),'lxml')
    ip_list = text_html.find_all(id='ip_list')[0]
    print(ip_list)
    ip_arr = re.findall('img(.*?)</td>', ip_list)



    ip_pool.append('aaa')

    # proxy = urllib3.ProxyManager('http://122.51.183.224:808/')
    # res = proxy.request('GET', 'http://www.baidu.com/')
    #
    # if(res.data.decode('utf-8')):
    #     ip_pool.append('1')
    #     print('添加一条ip')


http = urllib3.PoolManager()
res = http.request('GET','http://www.baidu.com')
soup = BeautifulSoup(res.data.decode('utf-8'),'html.parser')

# # 获取到的dom节点及内容
# print(soup.prettify())
# # 获取节点
# print(soup.title)
# # 获取节点标签
# print(soup.title.name)
# # 获取节点内容
# print(soup.title.text)
# print(soup.title.string)
# # 父节点标签
# print(soup.title.parent.name)
# # 节点选择器
# print(soup.div)
# # 属性选择器
# print(soup.div['id'])
# # 选择多个标签
# print(soup.find_all('div'))
# # 查找id
# print(soup.find(id='c-tips-container'))
# # 获取所有元素标签中的属性值
# for link in soup.find_all('div'):
#     print(link.get('id'))
# # 获取文档中所有文字
# print(soup.get_text())


http = urllib3.PoolManager()
res = http.request('GET', 'http://www.baidu.com/')
html = res.data.decode('utf-8')

soup = BeautifulSoup(html, 'lxml')
# print(soup)
print(type(soup.a))
print(soup.a)
print(soup.a['href'])
print(soup.a.attrs)
# http://www.ting89.com/
```