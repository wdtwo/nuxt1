---
title: elementui问题汇总
published: 2023-06-21 21:41:07
image: https://cdn.wdtwo.com/anzhiyu/element456456.jpg
category: 前端
tags: [vue]
draft: false
---
- table
- select
<!--more-->
### table
**获取索引**
```html
<el-table :data="tableData" :row-class-name="tableRowClassName" 
    @selection-change="handleSelectionChange">
	<el-table-column>
        <template slot-scope="scope">
          <div>
            scope.$index
          </div>
        </template>
    </el-table-column>
</el-table>
```
```js
methods:{
	tableRowClassName(row) {
        //设置row对象的index
        row.row.index = row.rowIndex;
    },
    handleSelectionChange(rows) {
      //用一个变量来存放被选中的index
      this.selectionItemIndexes = [];
      rows.forEach((item) => {
          this.selectionItemIndexes.push(item.index)
      });
      //console.log(this.selectionItemIndexes)
      this.output()
    },
    output(){
      this.total = 0;
      this.selectionItemIndexes.map((index)=>{
        this.total += this.list[index]*1 || 0
      });
      console.log('output',this.total)
    },
}
```
### select
**选项过多截取最开始的一百个 防止卡顿**
```html
<el-select v-model="value" filterable placeholder="请选择" clearable :filter-method="filterList">
        <el-option
          v-for="item in showList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
</el-select>
```
```js
data: () => (
     {
        //数据查找的数组
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        showList:[],//保存过滤后的数组
        value:''//保存选中的值
      }
  ),
methods:{
    filterList(query) {
      if(!query){
        this.showList = this.options.slice(0,100)
      }else{
        let result = []
        this.options.forEach(val=>{
          if(val.label.includes(query)) result.push(val)
        })
        this.showList = result.slice(0,100)
      }
    },
  },
  created(){
    this.showList = this.options.slice(0,100)
  }
```