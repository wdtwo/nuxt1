<script setup lang="ts">
  import { ElPagination } from 'element-plus';

  // // 使用 useAsyncData 查询所有文章
  // const list = await useAsyncData('posts',async()=>{
  //   return queryContent('/posts').find()
  // })
  // console.log('列表测试:', list.data.value)
  // const total = ref(0)
  // total.value = list.data.value?.length || 0



</script>

<style scoped>
  .posts-list {
    background-color: white;
    padding:.5%;
  }
  .item {
    border:1px solid #ccc;
    border-bottom-width: 3px;
    width: 23%;
    min-width: 200px;
    margin:.5%;
    transition: all ease .5s;
    position: relative;
  }
  .item::before {
    content: "";
    position: absolute;
    left:0;
    bottom:-3px;
    width: 0%;
    height:3px;
    z-index:2;
    background-color: #09f;
    
  }
  .item:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, .15);
  }
  .item:hover::before {
    transition: all ease-out 3s;
    width: 100%;
  }
  .pic {
    width: 100%;
    height:200px;
    background-position: center center;
    background-size: cover;
  }
  .info {
    padding:10px;
  }
  .item a {
    display: block;
    font-size: 16px;
    color:#666;
  }
  .item p {
    color: #999;
    font-size: 12px;
    padding-top: 10px;
  }
  .p-b-20{
    padding-bottom: 20px;
  }
  .m-t-20 {
    margin-top: 20px;
  }
</style>

<template>
  <div class="posts-list p-b-20">
    <div class="flex flex-jus-start flex-item-start flex-wrap">
      <div v-for="item in list.data.value" :key="item._path" class="item">
        <div class="pic" :style="`background-image: url(${item.cover});`"></div>
        <div class="info">
          <NuxtLink :to="item._path">{{ item.title }}</NuxtLink>
          <p>{{ item.description || '暂无'}}</p>
        </div>
      </div>
      <!-- <ContentList path="/posts" v-slot="{ list }">
        <div v-for="item in list" :key="item._path" class="item">
          <div class="pic" :style="`background-image: url(${item.cover});`"></div>
          <div class="info">
            <NuxtLink :to="item._path">{{ item.title }}</NuxtLink>
            <p>{{ item.description || '暂无'}}</p>
          </div>
        </div>
      </ContentList> -->
    </div>

    <div class="flex m-t-20">
      <el-pagination 
        background 
        layout="prev, pager, next,jumper,total" 
        :page-size="1" 
        :total="total" 
      />
    </div>
  </div>
</template>