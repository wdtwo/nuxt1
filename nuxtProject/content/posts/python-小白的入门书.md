---
title: python小白的入门书
published: 2023-06-21 22:03:24
image: https://cdn.wdtwo.com/anzhiyu/python467567.webp
category: 后端
tags: [python]
draft: false
---
- 数据结构
<!--more-->

## 数据结构
1. 列表 list
2. 字典 dict
3. 元组 tuple
4. 集合 set

```python
list  = [val1,val2,val3,val4]
dict  = {key1:val1,key2:val2}
tuple = (val1,val2,val3,val4)
set   = {val1,val2,val3,val4}
```

### 列表 list
```python
fruit = ['pin','pear']
# 增
fruit.insert(1,'grape') # 1插入位置的前面 如果超过长度则放在最后位置
fruit[0:0] = ['0range']
# 增加多个
fruit.extend(['a','b','c'])
# 删
fruit.remove('grape')
del fruit[0:2]
# 替换
fruit[0] = 'Grapefruit'
# 不能使用值直接调用
fruit['H']
```

### 字典 dict
```python
NASDAQ_code = {
 'BIDU':'Baidu',
 'SINA':'Sina'
}
# 增
NASDAQ_code['YOKU'] = 'Youku'
# 增加多个
NASDAQ_code.update({'FB':'Facebook','TSLA':'Tesla'})
# 删
del NASDAQ_code['FB']
```

### 元组 
不可修改,只能获取
```python
letters = ('a','b','c','d','e','f','g')
letter[0]
```

### 集合
无序的不重复的
不能切片也不能被索引
```python
a_set = {1,2,3,4}
# 增
a_set.add(5)
# 删
a_set.discard(5)
```

### 列表排序
```python
list = [6,2,7,4,1,3,5]
# 排序
print(sorted(list))
# 逆序
print(sorted(list,reserve=True))
```
### 同时处理两个列表
```python
num = [6,7,5,2,3]
str = ['d','t','a','e','b','y']

for a,b in zip(num,str):
    print(a,'-',b)
```
### 推导式(解析式)
```python
# 原形
a = []
for i in range(1, 11):
    a.append(i)
print(a)
```
```python
# 推导式 提高效率
a = [i**2 for i in range(1, 11)]
print(a)
b = [i + 1 for i in range(1, 11)]
print(b)
c = [i for i in range(1, 11) if i % 2 == 0]
print(c)
z = [letter.lower() for letter in "ABCDEFG"]
print(z)
```
```python
# 字典推导式
d = {i:i+1 for i in range(4)}
print(d)
e = {i:j for i,j in zip(range(1,6),'abcde')}
print(e)
f = {i:j.upper() for i,j in zip(range(1,6),'abcde')}
print(f)
```

### 获取列表索引
```python
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
for num,letter in enumerate(letters):
    print(letter,'is',num+1)
```
