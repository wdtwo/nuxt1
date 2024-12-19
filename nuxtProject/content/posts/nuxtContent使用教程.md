--- 
    title: "nuxtContent使用教程"
    decription: "nuxtContent使用教程"
    layout: posts
    tags: [nuxt]
    date: 2024-12-12
    category: [前端]
    author: "garywang"
    cover: https://element-plus.org/images/mele-banner.png
--- 

# 例子1
## 例子2
### 例子3
#### 例子4
##### 例子5
###### 例子6

*斜体文本*  
**粗体文本**  
***粗斜体文本***

1. 有序列表项一  
2. 有序列表项二   
3. 有序列表项三

- 无序列表项一
- 无序列表项二
- 无序列表项三

[百度一下](https://www.baidu.com/ "百度一下")  

```python
def hello():
    print("Hello, Markdown!")
hello()
```

`print("Hello, Markdown!")`


> 块引用文字。

> 最外层
>> 第一层嵌套
>>> 第二层嵌套

***
---
___


~~删除线~~

| 表头1 | 表头2 | 表头3 |
| ----- | ----- | ----- |
| 单元格1 | 单元格2 | 单元格3 |

| 左对齐 | 居中对齐 | 右对齐 |
| :--- | :---: | ---: |
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |

![1](https://element-plus.org/images/mele-banner.png)


```bash
# 例子
NAME         MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
mmcblk0      179:0    0 58.3G  0 disk 
└─mmcblk0p1  179:1    0 58.3G  0 part 
mmcblk1      179:16   0  7.3G  0 disk 
mmcblk1boot0 179:32   0    4M  0 disk 
mmcblk1boot1 179:48   0    4M  0 disk 
zram0        253:0    0   50M  0 disk /var/log
```


# 安装插件
```bash
npm install @nuxt/content
```
# 配置插件
```js
export default {
    modules: [
        '@nuxt/content',
    ],
}
```
## 创建md文件
在`content`文件夹下创建`posts`文件夹，然后在`posts`文件夹下创建`index.md`文件。
### 编写md文件
在`index.md`文件中编写文章内容。
#### 访问文章
在页面中引入`<NuxtContent />`组件，即可显示文章内容。
例如：
```html
<template>
  <div>
    <NuxtContent :document="posts" />
    <button @click="loadMore">加载更多</button>
    <div v-for="post in posts.slice(0, 5)" :key="post.slug">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <img :src="post.image" alt="" />
        <p>{{ post.body }}</p>
        <p>{{ post.date }}</p>
        <p>{{ post.categories }}</p>
        <p>{{ post.tags }}</p>
        <p>{{ post.author }}</p>
        <p>{{ post.cover }}</p>
        <hr />
    </div>
</template>
```


