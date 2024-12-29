---
title: js创建一个列队
date: 2023-07-06 11:15:00
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---

## class版本
```js
// 定義一個 Queue（隊列）類別
class Queue {
  constructor() {
    this.items = []; // 使用陣列來儲存隊列中的元素
  }

  // 將元素添加到隊列尾部
  enqueue(element) {
    this.items.push(element);
  }

  // 從隊列中移除並返回第一個元素
  dequeue() {
    if (this.isEmpty()) {
      return "隊列已經空了";
    }
    return this.items.shift();
  }

  // 返回隊列中的第一個元素
  front() {
    if (this.isEmpty()) {
      return "隊列為空";
    }
    return this.items[0];
  }

  // 檢查隊列是否為空
  isEmpty() {
    return this.items.length === 0;
  }

  // 返回隊列的長度
  size() {
    return this.items.length;
  }

  // 清空隊列
  clear() {
    this.items = [];
  }
}

// 使用範例
const queue = new Queue();
console.log(queue.isEmpty()); // true

queue.enqueue("John");
queue.enqueue("Jane");
queue.enqueue("Bob");
console.log(queue.size()); // 3
console.log(queue.isEmpty()); // false
console.log(queue.front()); // John

console.log(queue.dequeue()); // John
console.log(queue.dequeue()); // Jane
console.log(queue.size()); // 1

```


## 创建一个列队
```js
let Queue = function(){
    this.items = []; // 使用陣列來儲存隊列中的元素
    // 將元素添加到隊列尾部
    enqueue = (element) =>{
        this.items.push(element);
    }
    // 從隊列中移除並返回第一個元素
    dequeue = () =>{
        if (isEmpty()) {
            return "列队为空";
        }
        return this.items.shift();
    }
    // 返回隊列中的第一個元素
    front = () =>{
        if (isEmpty()) {
            return "列队为空";
        }
        return this.items[0];
    }
    // 檢查隊列是否為空
    isEmpty = () => {
        console.log(this);
        return this.items.length === 0;
    }
    // 返回隊列的長度
    size = () =>{
        return this.items.length;
    }
    // 清空隊列
    clear = () =>{
        this.items = [];
    }
    return {
        enqueue,
        dequeue,
        front,
        isEmpty,
        size,
        clear
    }
}

// 使用範例
const queue = new Queue();
console.log(queue.isEmpty()); // true

queue.enqueue("John");
queue.enqueue("Jane");
queue.enqueue("Bob");
console.log(queue.size()); // 3
console.log(queue.isEmpty()); // false
console.log(queue.front()); // John

console.log(queue.dequeue()); // John
console.log(queue.dequeue()); // Jane
console.log(queue.size()); // 1
```

## vue版本带指针的列队
```js
Queue:function(){
    this.items = []; // 使用陣列來儲存隊列中的元素
    this.pointer = 0;// 指针 通过指针更新数组内的数据
    // 將元素添加到隊列尾部
    enqueue = (element) =>{
        this.items.push(element);
    }
    //将数组添加到指针位置
    enqueuePointer = (element,num) =>{
        setPointer(num);
        this.items[this.pointer] = element;
    }
    // 從隊列中移除並返回第一個元素
    dequeue = () =>{
        if (isEmpty()) {
            return "列队为空";
        }
        return this.items.shift();
    }
    // 從隊列中移除並返回最后一个元素
    dequeueList = () =>{
        if (isEmpty()) {
            return "列队为空";
        }
        return this.items.pop();
    }
    // 返回隊列中的第一個元素
    front = () =>{
        if (isEmpty()) {
            return "列队为空";
        }
        return this.items[0];
    }
    // 檢查隊列是否為空
    isEmpty = () => {
        return this.items.length === 0;
    }
    // 返回隊列的長度
    size = () =>{
        return this.items.length;
    }
    autoDelete = ()=>{
        setInterval(()=>{
            if(this.items.length > 30){
                dequeueList()
            }
        },1500)
    }
    // 返回所有数据
    allItem = () =>{
        return this.items;
    }
    // 清空隊列
    clear = () =>{
        this.items = [];
    }
    //设置个指针
    setPointer = (num) =>{
        this.pointer = this.pointer < num ? this.pointer + 1 : 0;
    }
    return {
        enqueue,
        enqueuePointer,
        dequeue,
        dequeueList,
        front,
        isEmpty,
        size,
        clear,
        allItem,
        autoDelete
    }
}
```