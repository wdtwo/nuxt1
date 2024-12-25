---
title: markdown语法
description: 'markdown语法markdown语法markdown语法markdown语法markdown语法markdown语法markdown语法markdown语法markdown语法markdown语法markdown语法'
date: 2024-12-25
image: https://cdn.wdtwo.com/anzhiyu/markdown0380496.jpg
tags:
- markdown
categories:
- 其他
---


### 代码块支持的语言

| 名称 | 关键字 | 调用的js | 说明 |
| -- | -- | -- | -- |
| AppleScript | applescript | shBrushAppleScript.js | - |
| ActionScript 3.0 | actionscript3 , as3 | shBrushAS3.js | - |
| Shell | bash,shell | shBrushBash.js | - |
| ColdFusion | coldfusion,cf | shBrushColdFusion.js | - |
| C | cpp,c | shBrushCpp.js | - |
| C# | c#,c-sharp,csharp | shBrushCSharp.js | - |
| CSS | css | shBrushCss.js | - |
| Delphi | delphi,pascal,pas | shBrushDelphi.js | - |
| diff&patch | diff patch | shBrushDiff.js | 用代码版本库时,遇到代码冲突,其语法就是这个 |
| Erlang | erl,erlang | shBrushErlang.js | - |
| Groovy | groovy | shBrushGroovy.js | - |
| Java | java | shBrushJava.js | - |
| JavaFX | jfx,javafx | shBrushJavaFX.js | - |
| JavaScript | js,jscript,javascript | shBrushJScript.js | - |
| Perl | perl,pl,Perl | shBrushPerl.js | - |
| PHP | php | shBrushPhp.js | - |
| text | text,plain | shBrushPlain.js	| 就是普通文本. |
| Python | py,python | shBrushPython.js | - |
| Ruby | ruby,rails,ror,rb | shBrushRuby.js | - |
| SASS&SCSS | sass,scss | shBrushSass.js | - |
| Scala | scala | shBrushScala.js | - |
| SQL | sql | shBrushSql.js | - |
| Visual Basic | vb,vbnet | shBrushVb.js | - |
| XML | xml , xhtml,xslt , html | shBrushXml.js | - |
| Objective C | objc,obj-c | shBrushObjectiveC.js | - |
| F# | f# f-sharp,fsharp | shBrushFSharp.js | - |
| - | xpp,dynamics-xpp | shBrushDynamics.js | - |
| R | r,s,splus | shBrushR.js | - |
| matlab | matlab | shBrushMatlab.js | - |
| swift | swift | shBrushSwift.js | - |
| GO | go,golang | shBrushGo.js | - |



```markdown
# 标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

段落
```
# 标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

段落


## 语气
```markdown
**加粗**
*斜体*
~~删除线~~
<u>下划线</u>
```
**加粗**
*斜体*
~~删除线~~
<u>下划线</u>

## 引用
```markdown
> 引用
```
> 引用
#### 多段引用
```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
#### 嵌套引用
```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
## 列表
### 无序列表
```markdown
- 列表项
- 列表项
- 列表项
```
- 列表项
- 列表项
- 列表项

### 有序列表
```markdown
1. 列表项
2. 列表项
3. 列表项
```
1. 列表项
2. 列表项
3. 列表项

### 嵌套列表
```markdown
- 列表项
  1. 嵌套列表项
  2. 嵌套列表项
  3. 嵌套列表项
```
- 列表项
  1. 嵌套列表项
  2. 嵌套列表项
  3. 嵌套列表项

## 分割线
```markdown
---
***
___
```
---
***
___

## 代码
```markdown
`代码`
```
`代码`
## 代码块
```python
print("Hello, World!")
```

## 链接
```markdown
[链接文本](链接地址)
这是一个链接 [Markdown语法](https://blog.wdtwo.com)。
这是一个链接 [Markdown语法](https://blog.wdtwo.com "大家都喜欢的blog")。
<https://blog.wdtwo.com>
<fake@example.com>
```
[链接文本](链接地址)
这是一个链接 [Markdown语法](https://blog.wdtwo.com)。
这是一个链接 [Markdown语法](https://blog.wdtwo.com "大家都喜欢的blog")。
<https://blog.wdtwo.com>
<fake@example.com>

## 图片
```markdown
![图片描述](https://cdn.wdtwo.com/anzhiyu/webpack903634.jpg)
![图片描述](https://cdn.wdtwo.com/anzhiyu/webpack903634.jpg "图片描述")
[![图片链接](https://cdn.wdtwo.com/anzhiyu/webpack903634.jpg "图片描述")](https://blog.wdtwo.com)
```
![图片描述](https://cdn.wdtwo.com/anzhiyu/webpack903634.jpg)
![图片描述](https://cdn.wdtwo.com/anzhiyu/webpack903634.jpg "图片描述")
[![图片链接](https://cdn.wdtwo.com/anzhiyu/webpack903634.jpg "图片描述")](https://blog.wdtwo.com)
