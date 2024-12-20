---
title: python福彩双色球保存到mysql数据库
date: 2023-06-07 16:46:51
cover: https://cdn.wdtwo.com/anzhiyu/python467567.webp
category: [后端]
tags: [python,爬虫]
draft: false 
---
福彩双色球保存到mysql数据库
<!--more-->
```python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup  # 爬虫库
import re
import urllib3
import pymysql
import time

count = 0
def saveDatasMySQL(datas_box,i):
    #打开数据库连接
    # conn = pymysql.connect('106.13.69.54',user = "wdtwo_com",passwd = "L7cyyje8hBf43sDW",db = "wdtwo_com")
    conn = pymysql.connect('localhost', user="root", passwd="123456", db="test")
    # print (conn)
    # print (type(conn))
    #获取游标
    cursor=conn.cursor()
    sql="insert into lottery_ssq(`createtime`,`time`,red1,red2,red3,red4,red5,red6,blue1) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    # insert=cursor.executemany(sql,[('a','b',1,2,3,4,5,6,7)])
    insert=cursor.executemany(sql,datas_box)
    # print ('批量插入返回受影响的行数：',insert)
    cursor.close()
    conn.commit()
    conn.close()
    print('sql执行成功---'+str(i))
    time.sleep(.5)

# 获取网页内容
def get_html(url,i):
    datas_box = []
    http = urllib3.PoolManager()
    res = http.request('GET', url)
    html = res.data.decode('utf-8')

    soup = BeautifulSoup(html, 'lxml')
    for child in soup.table.children:
        # print(str(child))
        str111 = re.findall('<td align="center">(.*?)</td>',str(child))
        if len(str111) > 0:
            str_red = re.findall('<em class="rr">(.*?)</em>', str(child))
            str_blue = re.findall('<em>(.*?)</em>', str(child))
            # print(str111[0:2],str_red,str_blue)
            datas_box.append((str111[0],str111[1],str_red[0],str_red[1],str_red[2],str_red[3],str_red[4],str_red[5],str_blue[0]))
    # print(datas_box)
    saveDatasMySQL(datas_box,i)
# get_html('http://kaijiang.zhcw.com/zhcw/html/ssq/list_1.html')

def html(arg):
    print(arg)
i = 0
for i in range(1,129):
    get_html('http://kaijiang.zhcw.com/zhcw/html/ssq/list_'+str(i)+'.html',i)

print('--执行完毕--')
```
