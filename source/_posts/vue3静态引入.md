---
title: vue3静态引入
date: 2023-06-21 21:35:56
cover: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
categories:
- 前端
tags:
- js
- vue
---
[官网]('https://vuejs.org/guide/quick-start.html')  
<!--more-->
```html
<script src="https://unpkg.com/vue@3"></script>
<script>
	const { createApp } = Vue
    createApp({
        data(){
            return {
            	message:'hello'
            }
        }
    }).mount('#app')
</script>
```
```html
<script type="importmap">
    {
        "imports":{
            "vue":"https://unpkg.com/vue@3/dist/vue.esm-browser.js"
        }
    }
</script>
<script type="module">
    import { createApp } from 'vue';
    createApp({
        data(){
            return {
                message:'hello'
            }
        }
    }).mount('#app')
</script>
```