
<script setup lang="ts">
// @ts-ignore
import { onMounted } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/google-dark.css';

onMounted(() => {
  // 在页面加载后高亮所有代码块
  document.querySelectorAll('code').forEach((block) => {
    hljs.highlightElement(block);
  });
});
</script>

<style scoped>
main {
  background-color: white;
  padding:25px
}
</style>

<template>
  <main>
    <ContentDoc class="markdown-content"/>
  </main>
</template>
