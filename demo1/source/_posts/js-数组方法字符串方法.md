---
title: 数组方法字符串方法
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---
- 数组方法
- 字符串方法
<!--more-->
## 数组方法
### ES5
#### 改变原数组
##### push() 
追加到尾部 
```js
    var arr = [1,2];
    arr.push(3);
    console.log(arr);// => [1,2,3]
```
##### pop() 
删除尾部
```js
    arr.pop();
    console.log(arr);// => [1]
```
##### shift() 
头部删除
```js
    arr.shift();
    console.log(arr);// => [2]
```
##### unshift() 
头部添加
```js
    arr.unshift(0);
    console.log(arr);// => [0,1,2]
```
##### sort() 
排序
```js
    arr.sort(function(a,b){
        return a>b;
    })
```
##### reverse() 
反转
```js
    arr.reverse();
```
##### splice() 
删除 插入 替换
```js
    // 删除
    arr.splice(1,2); // 从下标1开始删除2个元素
    // 插入
    arr.splice(1,0,'a','b'); // 从下标1开始插入2个元素
    // 替换
    arr.splice(1,2,'a','b'); // 从下标1开始删除2个元素，然后插入2个元素
```
#### 不改变原数组
##### slice() 
选取一部分
```js
    var newArr = arr.slice(1);
    console.log(arr);// => [1,2]
    console.log(newArr);// => [2]
```
##### concat() 
拼接到最后
```js
    var newArr = arr.concat(3);
    console.log(arr);// => [1,2]
    console.log(newArr);// => [1,2,3]
```
##### join() 
连接成字符串
```js
    var newArr = arr.join('-');
    console.log(arr);// => [1,2]
    console.log(newArr);// => 1-2
```
##### indexOf() 
查找
```js
    var index = arr.indexOf(2);
    console.log(index);// => 1
    // 没找到返回 -1
    var index = arr.indexOf(3);
    console.log(index);// => -1
```
##### lastIndexOf() 
从后向前查找
```js
    var index = arr.lastIndexOf(2);
    console.log(index);// => 1
    // 没找到返回 -1
    var index = arr.lastIndexOf(3);
    console.log(index);// => -1
```
### ES6
##### filter() 
过滤
```js
    var newArr = arr.filter(function(item){
        return item>1;
    })
    console.log(newArr);// => [2]
```
##### find() 
用来获取数组中满足条件的第一个数据
```js
    var newArr = arr.find(function(item){
        return item>1;
    })
    console.log(newArr);// => 2
```
##### findIndex 
用来获取数组中满足条件的第一个数据的下标
```js
    var index = arr.findIndex(function(item){
        return item>1;
    })
    console.log(index);// => 1
```
##### includes 
判断数组中是否包含某个值
```js
    var isInclude = arr.includes(2);
    console.log(isInclude);// => true
```
##### reduce() 
```js
    let numbers = [1, 2, 3, 4, 5];
```
求和
```js
    let sum = numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
    console.log("Sum of numbers:", sum); // Sum of numbers: 15
```
求积
```js
    let product = numbers.reduce((accumulator, currentValue) => {
        return accumulator * currentValue;
    }, 1);
    console.log("Product of numbers:", product); // Product of numbers: 120
```
数组中对象的例子
假设我们有一个对象数组，代表一组人的年龄，我们想计算所有人的总年龄：
```js
let people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 40 }
];
let totalAge = people.reduce((accumulator, person) => {
    return accumulator + person.age;
}, 0);
console.log("Total age:", totalAge); // Total age: 145
```
分组和计数
假设我们有一个数组，表示一组人的姓名，我们想计算每个姓名的出现次数：
```js
let names = ["Alice", "Bob", "Alice", "Charlie", "Bob", "Bob"];
let nameCount = names.reduce((accumulator, name) => {
    if (accumulator[name]) {
        accumulator[name]++;
    } else {
        accumulator[name] = 1;
    }
    return accumulator;
}, {});
console.log("Name count:", nameCount); // Name count: { Alice: 2, Bob: 3, Charlie: 1 }
```

### 数组循环方法
##### for
可以使用`break`、`continue`
```js
    for(var i=0;i<arr.length;i++){
        console.log(arr[i]);
    }
```
##### forEach()
```js
    arr.forEach(function(item){
        console.log(item);
    })
```
##### for...in 
`for...in` 循环通常用于遍历对象的属性，但也可以用于遍历数组的索引。
不过，在数组上使用 `for...in` 时要小心，因为它会遍历数组的所有可枚举属性，
包括继承的属性和手动添加的属性，而不仅仅是数组的元素。
```js
    for(var index in arr){
        console.log(arr[index]);
    }
```
##### for...of
`for...of` 循环是遍历数组元素的更佳选择，因为它只遍历数组的值，不会遍历非整数键和继承属性。
让我们看看如何在数组中使用 `for...of` 循环，以及一些实际的例子。
```js
    for(var val of arr){
        console.log(val);
    }
```
#### 使用 entries() 方法遍历索引和值
```js
    for(var [index,value] of arr.entries()){
        console.log(index,value); // 0 1
    }
```

##### while(){}   
可以使用`break`、`continue` 打断
```js
    var i = 0;
    while(i<arr.length){
        console.log(arr[i]);
    }
```
##### do{}while()
`do...while` 循环至少执行一次循环体，然后在每次循环结束时检查条件，如果条件为真则继续执行循环。
与 `while` 循环不同，`do...while` 确保循环体在条件判断之前至少执行一次。
可以使用`break`、`continue` 打断
```js
    let i = 1;
    do {
        console.log(i);
        i++;
    } while (i <= 5);
```
##### map() 循环
```js
    var newArr = arr.map(function(item){
        console.log(item);
    })
```
##### every() 
所有条件都满足返回true
```js
    var isAll = arr.every(function(item){
        return item>0;
    })
```
##### some() 
至少有一个满足则返回true
```js
    var isSome = arr.some(function(item){
        return item>0;
    })
```

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
 
