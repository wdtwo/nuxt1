<script setup lang="ts">

    // 获取所有文章数据
    const list = await useAsyncData('posts',async()=>{
        return queryContent('/posts').find()
    })
    // 获取所有的tags
    const allTags = list.data.value.reduce((acc:any, post:any) => {
        post.tags?.forEach((tag:any) => {
            if (!acc.includes(tag)) {
            acc.push(tag)
            }
        })
        return acc
    }, [])
    // console.log(allTags) // 输出所有标签
    const showList = ref([]);
    for (let i = 0; i < allTags.length; i++) {
        showList.value.push({
            name: allTags[i],
            length: list.data.value.filter((v:any)=>v.tags.includes(allTags[i])).length
        })
    }
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
        margin-bottom: 8px;
    }
</style>
<template>
    <dl>
        <dt>标签tags</dt>
        <dd>
            <el-badge v-for="item in showList" :value="item.length">
                <el-button type="primary" plain size="small">{{ item.name }}</el-button>
            </el-badge>
        </dd>
    </dl>
</template>