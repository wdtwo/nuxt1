---
title: js前端数据库indexDB管理工具dexie.js
date: 2024-04-28
description: ''
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
tags: 
- js
- 数据库
category: 
- 前端
---

[官网地址https://dexie.org/](https://dexie.org/)

> 适配各大框架

## 简单使用demo
```html
<!-- 引用 -->
<script src="https://npmcdn.com/dexie/dist/dexie.min.js"></script>
```
```js

// 创建数据库
var db = new Dexie("myDB"); // myDB为数据库名称
// 创建表
db.version(1).stores({ // 版本号，表名
    user: "++id,name" // 字段名，自增主键
    // 字段名，自增主键
});
// 添加数据
db.user.add({name: "张三"}).then(function (id) { // 添加数据，返回主键值
    console.log(id); // 1
})
// 更新数据
db.user.update(id, {name: "李四"});
// 删除数据
db.user.delete(id);
// 查询数据
db.user.get(id).then(function (user) {
    console.log(user); // {id: 1, name: "李四"}
})
// 查询所有数据
db.user.toArray().then(function (users) {
    console.log(users); // [{id: 1, name: "李四"}]
})
// 查询数据
db.user.where("name").equals("李四").first().then(function (user) {
    console.log(user); // {id: 1, name: "李四"}
})
// 查询数据
db.user.where("name").equals("李四").last().then(function (user) {
    console.log(user); // {id: 1, name: "李四"}
})
// 查询数据
db.user.where("name").equals("李四").each(function (user) {
    console.log(user); // {id: 1, name: "李四"}
})
// 查询数据
db.user.where("name").equals("李四").count().then(function (num) {
    console.log(num); // 1
})
// 查询数据
db.user.where("name").equals("李四").modify(function (user) {
    console.log(user); // {id: 1, name: "李四"}
})
// 查询数据
db.user.where("name").equals("李四").modify({name: "王五"});
// 查询数据
db.user.where("name").equals("李四").modify(function (user) {
    console.log(user); // {id: 1, name: "李四"}
})
// 查询数据
db.user.where("name").equals("李四").delete();
```

## vue demo
### 安装
```bash
npm install dexie --save
```
### 创建数据库
```js
//  db.js
import Dexie from "dexie";
// 创建数据库
export const db = new Dexie("vuedbsample");
// 创建表
db.version(1).stores({
  items: "++id, name"
});
```
### 创建组件
```html
<template>
  <div>
    <h2>DB Items</h2>
    <!-- 添加一条数据 -->
    <button @click="db.items.add({ name: `Another item` })">Add item</button>
    <!-- 清空所有数据 -->
    <button @click="db.items.clear()">Clear items</button>
    <!-- 显示查询的数据 -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.id }}, {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { liveQuery } from "dexie";
import { db } from "../db";
import { useObservable } from "@vueuse/rxjs";

export default {
  name: "DBItems",
  setup() {
    return {
      db,
      items: useObservable(
        liveQuery(() => db.items.where("name").startsWith("A").toArray())
      ),
    };
  },
};
</script>
```

