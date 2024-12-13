--- 
    title: "nuxtContent使用教程"
    decription: "nuxtContent使用教程"
    layout: posts
    tags: [nuxt]
    date: 2024-12-12
    categories: [前端]
    author: "garywang"
    cover: https://element-plus.org/images/mele-banner.png
--- 

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
# 创建md文件
在`content`文件夹下创建`posts`文件夹，然后在`posts`文件夹下创建`index.md`文件。
# 编写md文件
在`index.md`文件中编写文章内容。
# 访问文章
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


