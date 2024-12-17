<script setup lang="ts">
import { onMounted } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/google-dark.css';

onMounted(() => {
  // 在页面加载后高亮所有代码块
  // document.querySelectorAll('pre code').forEach((block) => {
  //   hljs.highlightElement(block);
  // });
  document.querySelectorAll('code').forEach((block) => {
    hljs.highlightElement(block);
  });
});
</script>

<style scoped>
  .content {
    background-color: white;
    padding:25px 5px 25px 25px;
  }
</style>
<template>
  <main class="content">
    <ContentDoc class="markdown-content"/>
  </main>
</template>
