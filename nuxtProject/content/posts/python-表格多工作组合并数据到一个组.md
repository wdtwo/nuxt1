---
title: python表格多工作组合并数据到一个组
date: 2023-06-07 17:06:25
cover: https://cdn.wdtwo.com/anzhiyu/python467567.webp
category: [后端]
tags: [python]
draft: false
---
表格多工作组合并数据到一个组
<!--more-->

## play.bat
```bash
@echo off
start ./382/python.exe app.py
```

## app.py
```python
#-*- coding:utf-8 -*-

import csv
import xlrd
import pandas as pd
# 除了姓名以外的参数
listargs = ['绩效结果','岗位名称','绩效分数','合同单位']
#打开excel
wb = xlrd.open_workbook('input.xlsx')
get_sheet_name = wb.sheet_names()[0]
nameArr = []
# 获取到表格的sheet名称
for a in range(0,len(wb.sheet_names())):
    nameArr.append(wb.sheet_names()[a])
# print(nameArr)
# 判断是否是数字
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        pass
    try:
        import unicodedata
        unicodedata.numeric(s)
        return True
    except (TypeError, ValueError):
        pass
    return False
# 获取指定列内容 前提是要有姓名列
def getRowsDatas(str,sh,nameRow):
    can = -1
    for num in range(0, sh.ncols):
        # print(sh.row_values(i)[line])
        if (sh.row_values(nameRow)[num] == str):
            # print('a2',i,num)
            can = num
            break
    return can
# 把数组保存成csv
def save(data):
    with open('output.csv', 'w', newline='') as csv_file:
        f_csv = csv.writer(csv_file)
        # f_csv.writerow(headers)
        f_csv.writerows(data)
def openSheet(name):
    print(name)
    sh = wb.sheet_by_name(name)
    #遍历excel，打印所有数据
    # 存储行和列
    nameCol = 0 #列
    nameRow = 0 #行
    var1 = []
    for a in range(0,len(listargs)):
        var1.append([])
    # 查找姓名单元格位置
    for i in range(sh.nrows):
        # print(sh.row_values(i))
        # 获取到姓名位置
        for num in range(0,sh.ncols):
            # print(sh.row_values(i)[line])
            if(sh.row_values(i)[num] == '姓名'):
                # print('a',i,num)
                nameRow = i
                nameCol = num
                break
        #获取绩效分数列位置
        for index,a in enumerate(listargs):
        # for a in listargs:
            print(a,index)
            var1[index] = getRowsDatas(a, sh, nameRow)
            print(var1[index])
        # print('ccccc',var1)

    # 输出姓名列表
    for line in range(nameRow+1,sh.nrows):
        # 先检测第一行是否有id
        if(is_number(sh.row_values(line)[0])):
            # 输出姓名列
            arr = []
            arr.append(sh.row_values(line)[nameCol])
            for a in var1:
                if(a == -1):
                    arr.append('')
                else:
                    arr.append(sh.row_values(line)[a])
            datasNames.append(arr)
# 存储数据
datasNames = []
# 启动程序
for name in nameArr:
    openSheet(name)
print(datasNames)
save(datasNames)
input()
```

