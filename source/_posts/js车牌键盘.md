---
title: js车牌键盘
date: 2023-05-31 09:56:40
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---
车牌键盘
<!--more-->

```html
<ul class="add-plate flex flex-jus-between">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
<script>
    //车牌数组暴露出来
    let list = []
    //绑定单独
    let li = $('.add-plate li')
    li.on('click',function(){
        let index = $(this).index()
        //如果当前位置或者前一个位置有值则可以点击
        if(list[index] || list[index-1] ){
            borad.change(index)
            li.eq(index).addClass('active').siblings().removeClass()
        }
    })
    //键盘实例化
    let borad = new plateKeyBorad({callback:function(obj){
        list = obj.list
        console.log(list);
        for(let i = 0;i <= 7;i++){
            li.eq(i).html(obj.list[i] ? obj.list[i] : "")
        }
        li.eq(obj.list.length <= 7 ? obj.list.length : 7).addClass('active').siblings().removeClass()
        if(obj.list.length <= 7){
            li.eq(7).html("<div>新<br>能源</div>")
        }
        over = obj.list.length >= 7
    }})
    //设置默认值
    li.eq(7).html("<div>新<br>能源</div>")
    li.eq(0).addClass('active')
</script>
```

```js
//车牌键盘
let plateKeyBorad = function(func){
    //绑定显示的元素
    let ele = document.createElement('div')
        ele.setAttribute('id',"plate-keyborad")

    let arrArea = '京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使';
    let arrLetter = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    //保存车牌数据
    let plateStr = []
    let keyboradArea = document.createElement('div')
        keyboradArea.setAttribute('class',"keyborad-area")
    //生成地区键盘的内容
    for(a of arrArea){
        let e = document.createElement('div')
        let o = a
        e.innerHTML = o
        e.addEventListener('click',function(){
            judgePlateLen(o)
        })
        keyboradArea.appendChild(e)
    }
    //占位好看
    for(a of "ABCDEF"){
        let e = document.createElement('div')
        e.innerHTML = a
        e.setAttribute('class',"disabled")
        keyboradArea.appendChild(e)
    }
    //添加删除按钮
    let areaDel = document.createElement('div')
        areaDel.setAttribute('class',"del")
        areaDel.addEventListener('click',function(){
            delPlate()
        })
    keyboradArea.appendChild(areaDel)

    let keyboradLetter = document.createElement('div')
        keyboradLetter.setAttribute('class',"keyborad-letter ")
    //生成字母键盘的内容
    for(a of arrLetter){
        let e = document.createElement('div')
        let o = a
        e.innerHTML = a
        //车牌内没有的字母
        if(["I","O"].includes(a)){
            e.setAttribute('class',"disabled")
        }else{
            e.addEventListener('click',function(){
                judgePlateLen(o)
            })
        }
        keyboradLetter.appendChild(e)
    }
    //添加删除按钮
    let letterDel = document.createElement('div')
        letterDel.setAttribute('class',"del")
        letterDel.addEventListener('click',function(){
            delPlate()
        })
    keyboradLetter.appendChild(letterDel)

    //把元素添加到页面中
    ele.appendChild(keyboradArea)
    ele.appendChild(keyboradLetter)
    document.body.appendChild(ele)

    function judgePlateLen(letter){
        if(changeWait){
            plateStr[changeNum] = letter
            //console.log(plateStr);
            if(func.callback){
                func.callback({list:plateStr})
            }else{
                callback({type:plateStr})
            }
            changeWait = false
            return false;
        }
        //如果有则是添加 如果没有则是删除
        
        //添加完成以后点击数组也不会增加了
        if(plateStr.length >= 8){
            console.log('新能源车添加完成');
            if(letter){
                plateStr[plateStr.length-1] = letter
            }
        }else{
            if(letter){
                //向数组中添加新字符
                plateStr.push(letter)
            }
        }
        if(plateStr.length == 7){
            console.log('燃油车添加完成');
        }
        if(plateStr.length <= 0){
            keyboradLetter.style.display = "none"
            keyboradArea.style.display = "flex"
        }
        //如果长度大于1则显示字母键盘
        if(plateStr.length >= 1){
            keyboradArea.style.display = "none"
            keyboradLetter.style.display = "flex"
        }
        //console.log(plateStr);
        if(func.callback){
            func.callback({list:plateStr})
        }else{
            callback({type:plateStr})
        }
    }
    //删除最后一位
    function delPlate(){
        plateStr.pop()
        judgePlateLen()
    }
    //回调
    function callback(obj){
        console.log(obj.plateStr);
    }
    //点击了元素开始等待更改单个数据更改完了以后改回状态
    let changeWait = false
    let changeNum = -1
    //更改车牌
    function change(num){
        changeNum = num
        changeWait = true
        if(num <= 0){
            keyboradLetter.style.display = "none"
            keyboradArea.style.display = "flex"
        }else{
            keyboradArea.style.display = "none"
            keyboradLetter.style.display = "flex"
        }
    }
    return {
        change
    }
}
```
```css
#plate-keyborad {
    position: fixed;
    left:0;
    bottom:0;
    z-index: 8;
    width: 100%;
    padding:0.3rem 0;
    background-color: #eef0f4;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 1.7rem;
}
#plate-keyborad .keyborad-area,
#plate-keyborad .keyborad-letter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 10.8rem;
}
#plate-keyborad .keyborad-area div,
#plate-keyborad .keyborad-letter div{
    width: 0.87rem;
    height:0.87rem;
    border-radius: 0.1rem;
    background-color: white;
    font-size: 0.44rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin:0.1rem;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.1);
    user-select: none;
}
#plate-keyborad .keyborad-area div:not(.disabled):active,
#plate-keyborad .keyborad-letter div:not(.disabled):active {
    box-shadow: -1px -1px rgba(0, 0, 0, 0.1);
}
#plate-keyborad div.disabled {
    color:#e8e8e8;
}
#plate-keyborad div.del {
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NiIgaGVpZ2h0PSI0NiIgdmlld0JveD0iMCAwIDQ2IDQ2Ij48cGF0aCBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MiwzOUgxOGExLjk5LDEuOTksMCwwLDEtLjQ2Mi0wLjA1OSwzLjI2OCwzLjI2OCwwLDAsMS0yLjg4LS45MDZMMS45MTQsMjUuMjkxYTMuMjc3LDMuMjc3LDAsMCwxLDAtNC42MzRMMTQuNjU3LDcuOTE0YTMuMjY4LDMuMjY4LDAsMCwxLDMuMDA5LS44OEExLjk5MywxLjk5MywwLDAsMSwxOCw3SDQyYTQsNCwwLDAsMSw0LDRWMzVBNCw0LDAsMCwxLDQyLDM5Wk0zNy43LDE2Ljg0N0wzMS41MywyM2w2LjE0NSw2LjE0NWExLjA4NywxLjA4NywwLDEsMS0xLjUzNywxLjUzN0wyOS45OTEsMjQuNTRsLTYuMTI4LDYuMTE2YTEuMDg2LDEuMDg2LDAsMCwxLTEuNTM3LTEuNTM0TDI4LjQ1NSwyMywyMi4zLDE2Ljg1MWExLjA4NywxLjA4NywwLDAsMSwxLjUzNy0xLjUzN2w2LjE1NSw2LjE1NSw2LjE2OC02LjE1NkExLjA4NiwxLjA4NiwwLDEsMSwzNy43LDE2Ljg0N1oiLz48L3N2Zz4=") no-repeat center center;
    background-size: 0.4rem auto;
    background-color: white;
    width: 1.84rem;
}
#plate-keyborad .keyborad-letter {
    display: none;
}
```