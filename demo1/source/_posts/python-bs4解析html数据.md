---
title: BeautifulSoup简单实用教程
published: 2023-06-07 16:56:20
image: https://cdn.wdtwo.com/anzhiyu/python467567.webp
category: 后端
tags: [python,爬虫]
draft: false
---
https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/
<!--more-->
```python
import urllib3
from bs4 import BeautifulSoup

http = urllib3.PoolManager()
res = http.request('GET','http://www.baidu.com')
soup = BeautifulSoup(res.data.decode('utf-8'),'html.parser')

# 获取到的dom节点及内容
print(soup.prettify())
# 获取节点
print(soup.title)
# 获取节点标签
print(soup.title.name)
# 获取节点内容
print(soup.title.text)
print(soup.title.string)
# 父节点标签
print(soup.title.parent.name)
# 节点选择器
print(soup.div)
# 属性选择器
print(soup.div['id'])
# 选择多个标签
print(soup.find_all('div'))
# 查找id
print(soup.find(id='c-tips-container'))
# 获取所有元素标签中的属性值
for link in soup.find_all('div'):
    print(link.get('id'))
# 获取文档中所有文字
print(soup.get_text())
```

## 解析器安装
#### lxml
```python
pip install lxml

BeautifulSoup(markup, "lxml")
BeautifulSoup(markup, ["lxml-xml"])
BeautifulSoup(markup, "xml")
```
#### html5lib
```python
pip install html5lib

BeautifulSoup(markup, "html5lib")
```



























#
