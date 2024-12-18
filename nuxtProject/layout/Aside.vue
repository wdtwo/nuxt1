<script setup lang="ts">

import TagsComponent from '~/components/TagsComponent.vue';
import CategoryComponent from '~/components/CategoryComponent.vue';

import { useCounterStore } from '@/stores/isHome'
const counterStore = useCounterStore()

</script>
<style scoped>
    aside {
      margin-right: 15px;
      min-width: 200px;
      max-width: 300px;
    }
</style>
<template>
    <aside v-if="counterStore.ishome">
        <TagsComponent />
        <CategoryComponent />
    </aside>
</template>
