<script setup lang="ts">

import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import Aside from '~/layout/Aside.vue';

// const store = useStore()
// const { data } = await useAsyncData('user', () => store.fetchUser())
</script>
<style scoped>
    .container {
      background-color: #f1f2f3;
      padding: 80px 25px;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
    }
    aside {
      margin-right: 15px;
      min-width: 200px;
      max-width: 300px;
    }
    main {
      flex: 1;
    }
</style>

<template>
    <Header></Header>
    <div class="container">
      <Aside />
      <main>
        <NuxtPage />
      </main>
    </div>
    <Footer></Footer>
</template>
