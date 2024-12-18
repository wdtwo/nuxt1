<script setup lang="ts">

</script>
<template>
    <header class="flex flex-jus-between w100p">
        <h2>
            wdtwo
        </h2>
        <ul class="flex flex-jus-start">
            <li><NuxtLink to="/">首页</NuxtLink></li>
            <li><NuxtLink to="/posts">文章</NuxtLink></li>
            <li><NuxtLink to="/category">分类</NuxtLink></li>
            <li><NuxtLink to="/tags">标签</NuxtLink></li>
            <li><NuxtLink to="/about">关于</NuxtLink></li>
        </ul>
    </header>
</template>
<style>
    header {
        background-color: white;
        box-shadow: 0 0 15px rgba(0, 0, 0, .15);
        padding:20px;
        position: fixed;
        left:0;
        top:0;
        z-index:99;
        font-size: 16px;
        color:#454545;
    }
    header ul {
        padding-right: 20px;
    }
    header li {
        margin-left:40px;
    }
</style>