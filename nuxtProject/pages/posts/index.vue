<script setup lang="ts">
  import { goToPage } from '@/utils/func'
  // 获取所有文章数据
  const list = await useAsyncData('posts',async()=>{
      return queryContent('/posts').find()
  })
  const arrAll = [...list.data.value || []]
  // 显示的列表数据
  const showList = <any>ref(arrAll)
  // 总数
  const total = ref(0)
        total.value = arrAll?.length || 0
  // 每页条数
  const pageSize = ref(4)
  // 切换页码
  const handleCurrentChange = (val: number) => {
    console.log('当前页码', val,'列表测试:', arrAll?.slice((val - 1) * pageSize.value, val * pageSize.value))
    const arr = arrAll?.slice((val - 1) * pageSize.value, val * pageSize.value)
    showList.value = arr
  }
  handleCurrentChange(1)
  
</script>

<style scoped>
  .posts-list {
    background-color: white;
  }
  .box {
    padding:2%;
  }
  .box:nth-child(even){
    padding-left:.9%;
  }
  .box:nth-child(odd){
    padding-right:.9%;
  }
  .item {
    border:1px solid #f1f2f3;
    border-bottom-width: 3px;
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
    display: block;
  }
  .info {
    padding:10px;
  }
  .date {
    position: absolute;
    right:10px;
    top:10px;
    border-radius: 5px;
  }
  a {
    display: block;
    font-size: 16px;
    color:#666;
  }
  p {
    color: #999;
    font-size: 12px;
    padding-top: 10px;
  }
  .p-b-20{
    padding-bottom: 20px;
  }
  .m-t-10 {
    margin-top: 10px;
  }
  .m-t-20 {
    margin-top: 20px;
  }
  .m-r-10 {
    margin-right: 10px;
  }
  hr {
    border:0;
    border-right:1px solid #ccc;
    display: inline-block;
    height:12px;
    vertical-align: middle;
    margin:0 10px;
  }
</style>

<template>
  <div class="posts-list p-b-20">
    <el-row>
      <el-col v-for="item in showList" :key="item._path" :span="12" class="box">
        <div class="item">
          <NuxtLink 
            class="pic" 
            :to="item._path"
            :style="`background-image: url(${item.cover});`"
          ></NuxtLink>
          <div class="info">
            <NuxtLink :to="item._path">{{ item.title }}
          </NuxtLink>
            <p>{{ item.description || '暂无'}}</p>
            <div class="date">
              <el-tag type="danger" effect="dark">{{ item.date }}</el-tag>
            </div>
            <div>
              <div class="m-t-10">
                <el-button 
                v-for="v in item.category" 
                :key="v" 
                type="danger" 
                plain
                size="small"
                @click="goToPage('/category')"
                >{{ v }}</el-button>
                <hr>
                <el-button 
                v-for="v in item.tags" 
                :key="v" 
                type="primary" 
                plain
                size="small"
                @click="goToPage('/tags')"
                >{{ v }}</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    
    <div class="flex m-t-20">
      <el-pagination 
        background 
        layout="prev, pager, next,total" 
        :page-size="pageSize" 
        :total="total" 
        @current-change="handleCurrentChange" 
      />
    </div>
  </div>
</template>