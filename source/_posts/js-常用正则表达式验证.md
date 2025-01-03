---
title: 常用正则表达式验证
date: 2023-05-15 14:29:26
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---
- 校验数字的表达式
- 校验字符的表达式
- 特殊需求表达式
<!--more-->

## 校验数字的表达式

### 两个字符之间的字符:
```js
/_(.*?)\./g;
```
### 数字：
```js
^[0-9]*$
```
### n位的数字：
```js
^\d{n}$
```
### 至少n位的数字：
```js
^\d{n,}$
```
### m-n位的数字：
```js
^\d{m,n}$
```
### 零和非零开头的数字：
```js
^(0|[1-9][0-9]*)$
```
### 非零开头的最多带两位小数的数字：
```js
^([1-9][0-9]*)+(.[0-9]{1,2})?$
```
### 带1-2位小数的正数或负数：
```js
^(\-)?\d+(\.\d{1,2})?$
```
### 正数、负数、和小数：
```js
^(\-|\+)?\d+(\.\d+)?$
```
### 有两位小数的正实数：
```js
^[0-9]+(.[0-9]{2})?$
```
### 有1~3位小数的正实数：
```js
^[0-9]+(.[0-9]{1,3})?$
```
### 非零的正整数：
```js
^[1-9]\d*$
^([1-9][0-9]*){1,3}$
^\+?[1-9][0-9]*$
```
### 非零的负整数：
```js
^\-[1-9][]0-9"*$
^-[1-9]\d*$
```
### 非负整数：
```js
^\d+$
^[1-9]\d*|0$
```
### 非正整数：
```js
^-[1-9]\d*|0$
^((-\d+)|(0+))$
```
### 非负浮点数：
```js
^\d+(\.\d+)?$
^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
```
### 非正浮点数：
```js
^((-\d+(\.\d+)?)|(0+(\.0+)?))$
^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
```
### 正浮点数：
```js
^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$
^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
```
### 负浮点数：
```js
^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$
^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
```
### 浮点数：
```js
^(-?\d+)(\.\d+)?$
^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$ 
```

## 校验字符的表达式
### 汉字：
```js
^[\u4e00-\u9fa5]{0,}$
```
### 英文和数字：
```js
^[A-Za-z0-9]+$
^[A-Za-z0-9]{4,40}$
```
### 长度为3-20的所有字符：
```js
^.{3,20}$
```
### 由26个英文字母组成的字符串：
```js
^[A-Za-z]+$
```
### 由26个大写英文字母组成的字符串：
```js
^[A-Z]+$
```
### 由26个小写英文字母组成的字符串：
```js
^[a-z]+$
```
### 由数字和26个英文字母组成的字符串：
```js
^[A-Za-z0-9]+$
```
### 由数字、26个英文字母或者下划线组成的字符串：
```js
^\w+$
^\w{3,20}$
```
### 中文、英文、数字包括下划线：
```js
^[\u4E00-\u9FA5A-Za-z0-9_]+$
```
### 中文、英文、数字但不包括下划线等符号：
```js
^[\u4E00-\u9FA5A-Za-z0-9]+$
^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
```
### 可以输入含有^%&',;=?$\"等字符：
```js
[^%&',;=?$\x22]+
```
### 禁止输入含有~的字符：
```js
[^~\x22]+ 
```

## 特殊需求表达式
### Email地址：
```js
^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
```
### 域名：
```js
[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?
```
### InternetURL：
```js
[a-zA-z]+://[^\s]*
^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$
```
### 手机号码：
```js
^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
```
### 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：
```js
^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$ 
```
### 国内电话号码(0511-4405222、021-87888822)：
```js
\d{3}-\d{8}|\d{4}-\d{7}
```
### 身份证号：
#### 15或18位身份证：
```js
^\d{15}|\d{18}$
```
#### 15位身份证：
```js
^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$
```
#### 18位身份证：
```js
^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$
```
### 短身份证号码(数字、字母x结尾)：
```js
^([0-9]){7,18}(x|X)?$
^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$
```
### 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：
```js
^[a-zA-Z][a-zA-Z0-9_]{4,15}$
```
### 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：
```js
^[a-zA-Z]\w{5,17}$
```
### 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：
```js
^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$ 
```
### 日期格式：
```js
^\d{4}-\d{1,2}-\d{1,2}
```
### 一年的12个月(01～09和1～12)：
```js
^(0?[1-9]|1[0-2])$
```
### 一个月的31天(01～09和1～31)：
```js
^((0?[1-9])|((1|2)[0-9])|30|31)$ 
```
## 钱的输入格式：
### 1.有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：
```js
^[1-9][0-9]*$ 
```
###  2.这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：
```js
^(0|[1-9][0-9]*)$ 
```
### 3.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：
```js
^(0|-?[1-9][0-9]*)$ 
```
### 4.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能
的小数部分：
```js
^[0-9]+(.[0-9]+)?$ 
```
### 5.必须说明的是,小数点后面至少应该有1位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：
```js
^[0-9]+(.[0-9]{2})?$ 
```
### 6.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：
```js
^[0-9]+(.[0-9]{1,2})?$ 
```
###  7.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：
```js
^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$ 
```
### 8.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：
```js
^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$ 
```
### 备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
### xml文件：
```js
^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$
```
### 中文字符的正则表达式：
```js
[\u4e00-\u9fa5]
/[\u4E00-\u9FA5\uF900-\uFA2D]/
```
### 双字节字符：
```js
[^\x00-\xff]
```
(包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
### 空白行的正则表达式：\n\s*\r (可以用来删除空白行)
### HTML标记的正则表达式：
```js
<(\S*?)[^>]*>.*?</\1>|<.*? /> (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)
```
### 首尾空白字符的正则表达式：
```js
^\s*|\s*$或(^\s*)|(\s*$) 
```
(可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
### 腾讯QQ号：
```js
[1-9][0-9]{4,}
```
(腾讯QQ号从10000开始)
### 中国邮政编码：
```js
[1-9]\d{5}(?!\d) 
```
(中国邮政编码为6位数字)
### IP地址：
```js
\d+\.\d+\.\d+\.\d+ 
```
(提取IP地址时有用)