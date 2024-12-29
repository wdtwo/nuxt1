---
title: canvas图片压缩
date: 2023-02-13 16:14:11
categories:
- 前端
tags:
- canvas
cover: https://cdn.wdtwo.com/anzhiyu/canvas29573945.png
top_img: https://cdn.wdtwo.com/anzhiyu/canvas29573945.png
---

上传图片后用canvas裁剪

<!--more-->

```js
//绑定上传控件
$('#file').on('change',function (e) {
    var t = $(this);
    var file = this.files[0];//获取上传元素
    if(file){
        //判断上传类型
        if(!/image\/\w+/.test(file.type)){
            alert("请确保文件为图像类型");
            return false;
        }
    }else{
        return false;
    }
    //获取上传内容
    var reader = new FileReader();
    reader.readAsDataURL(file);//取图片base64
    //图片加载完毕执行
    reader.onload = function(){
        var img = new Image();
        img.src = reader.result;//将base64赋值给一个新的元素
        img.onload = function(){
            //console.log(img.naturalWidth);
            //判断是不是大图
            if(img.naturalWidth > 800){
                var w = 800*img.naturalHeight/img.naturalWidth;
                //创建一个canvas存放要压缩的图片
                var cvs = document.createElement('canvas');
                cvs.width=800;
                cvs.height=w;
                var ctx = cvs.getContext('2d');
                //绘图
                ctx.drawImage(img,0,0,800,w);
                headImgData = cvs.toDataURL('image/png');//导出base64
                console.log(headImgData);
            }
        }
    }
})
```











