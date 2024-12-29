---
title: 数组方法字符串方法
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---
- 数组方法
- 字符串方法
<!--more-->
## 数组方法
### ES5
1. push()        //追加到尾部
2. pop()         //删除尾部
3. shift()       //头部删除
4. unshift()     //头部添加
5. sort()        //排序
6. reverse()     //反转
7. concat()      //拼接到最后
8. slice()       //选取一部分
9. splice()      //删除插入替换
10. join()       //连接成字符串
11. indexOf()    //查找
12. lastIndexOf()//从后向前查找
13. 
### ES6
1.  map()        //映射
2.  reduce()     //汇总
3.  filter()     //过滤
4.  forEach()    //遍历(迭代)

## 字符串方法

1. charAt(x)     //返回字符串中x位置的字符，下标从 0 开始。
2. charCodeAt(x) //返回字符串中`x`位置处字符的`unicode`值。
3. concat(v1,v2..)//方法用于连接两个或多个字符串，此方法不改变现有的字符串，返回拼接后的新的字符串。
4. fromCharcode(c1,c2) //转换一组Unicode值转换为字符。
5. indexOf(substr, [start])  //indexOf方法搜索并(如果找到)返回字符串中搜索到的字符或子字符串的索引。如果没有找到，则返回-1。Start是一个可选参数，指定字符串中开始搜索的位置，默认值为0。
6. lastIndexOf(substr, [start]) //方法返回指定文本在字符串中最后一次出现的索引, 如果未找到，则返回-1。 “Start”是一个可选参数，指定字符串中开始搜索的位置, 默认值为string.length-1。
7. match(regexp) //根据正则表达式在字符串中搜索匹配项。如果没有找到匹配项，则返回一个信息数组或null。
8. replace(regexp/substr, replacetext) //方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
9. search(regexp) //方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，如果找到，返回与 regexp 相匹配的子串的起始位置，否则返回 -1。
10. slice(start, [end]) //slice() 方法可提取字符串的某个部分，返回一个新的字符串。包括字符串从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。
11. split(delimiter, [limit]) //方法用于把一个字符串分割成字符串数组，返回一个字符串数组返回的数组中的字串不包括 delimiter自身。 可选的“limit”是一个整数，允许各位指定要返回的最大数组的元素个数。
12. substr(start, [length]) //方法可在字符串中抽取从 start 下标开始的指定数目的字符。返回一个新的字符串，包含从 start（包括 start 所指的字符） 处开始的 length 个字符。如果没有指定 length，那么返回的字符串包含从 start 到该字符串的结尾的字符。
13. substring(from, [to]) //方法用于提取字符串中介于两个指定下标之间的字符，方返回的子串包括 start 处的字符，但不包括 stop 处的字符，to 可选，如果省略该参数，那么返回的子串会一直到字符串的结尾。
14. toLowerCase() //方法用于把字符串转换为小写。
15. toUpperCase() //方法用于把字符串转换为大写。
16. includes()    //方法用于检查字符串是否包含指定的字符串或字符。
17. endsWith()    //函数检查字符串是否以指定的字符串或字符结束。
18. repeat(2)     //构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
19. valueOf()     //方法返回一个String对象的原始值（primitive value），该值等同于String.prototype.toString()。
20. trim()        //方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）
 
