<script setup lang="ts">
   
    // 获取所有文章数据
    const list = await useAsyncData('posts',async()=>{
        return queryContent('/posts').find()
    })
    // // console.log()
    // // for(let i = 0;i < list.data.value?.length;i++){
    // //     console.log(list.data.value[i]['category'])
    // // }
    // list.data.value = list.data.value?.filter(item=>item['category'])
    // // 获取所有的category
    // const allCategory = list.data.value.reduce((acc:any, post:any) => {
    //     post.category?.forEach((category:any) => {
    //         if (!acc.includes(category)) {
    //         acc.push(category)
    //         }
    //     })
    //     return acc
    // }, [])
    // console.log(allCategory) // 输出所有标签
    // const showList = ref([]);
    // for (let i = 0; i < allCategory.length; i++) {
    //     // list.data.value.filter(v=>v.category.includes(item))
    //     showList.value.push({
    //         name: allCategory[i],
    //         length: list.data.value.filter((v:any)=>v.category.includes(allCategory[i])).length
    //     })
    // }
</script>
<style scoped>
    dl {
      background-color: white;
      margin-bottom: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    }
    dl dt {
        padding:10px;
        border-bottom: 1px solid #eee;
        font-size: 12px;
    }
    dl dd {
        padding:10px;
    }
    .el-badge {
        margin-right: 8px;
    }
</style>
<template>
    <dl>
        <dt>分类category</dt>
        <dd>
            <!-- <el-badge v-for="item in showList" :value="item.length">
                <el-button type="primary" plain size="small">{{ item.name }}</el-button>
            </el-badge> -->
        </dd>
    </dl>
</template>