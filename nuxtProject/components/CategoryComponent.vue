<script setup lang="ts">
    import { ElBadge, ElButton } from 'element-plus'
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
            <el-badge :value="12">
                <el-button type="primary" plain size="small">comments</el-button>
            </el-badge>
            <el-badge :value="12">
                <el-button type="primary" plain size="small">comments</el-button>
            </el-badge>
        </dd>
    </dl>
</template>