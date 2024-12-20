---
title: js移动端宽度适应
published: 2023-02-13 16:44:14
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 前端
tags: [js,移动端]
draft: false
---

- transform:scale()
- rem

<!--more-->

## transform:scale()

```html
<style>
    * {margin:0;padding:0;}
    .wrap {background: #eee;width:320px;height:100px;position: absolute;left:50%;margin-left:-160px;}
</style>
<div class="wrap">body</div>
<script>
    window.addEventListener('load',function(){
        setScale(document.querySelector(".wrap"),{});
    })
    setScale=>(t,obj){
        try {
            if(!obj.origin){obj.origin = "top"}
            var doc = document.documentElement;
            let [w,h] = [doc.offsetWidth,doc.offsetHeight];
            let scaleW = Math.min(w/320,2);
            let str = `
                transform:scale(${scaleW});
                transform-origin:${obj.origin};
                -webkit-transform:scale(${scaleW});
                -webkit-transform-origin:${obj.origin};
            `;
            t.setAttribute("style",str);
        } catch (e) {
            console.warn(e);
        }
    }
</script>
```
## rem缩放

```html
<style>
    * {margin:0;padding:0;}
    html{font-size:100px;}
    .wrap {position: absolute;left:50%;top:0;margin-left:-3.74rem;background: #eee;width:7.48rem;text-align: center;font-size:.4rem;}
</style>
<div class="wrap">body</div>
<script>
    ["load","resize"].forEach(function(v,i){
        window.addEventListener(v,function(){setScale();})
    })
    let setScale = function(t,obj){
        let w = document.documentElement.offsetWidth;
        document.querySelector("html").style.fontSize = w/7.5 + "px";
    }
</script>
```
```js
function autoScale(){
    var winW = document.documentElement.clientWidth;
    return Math.min (1,Math.min(winW / 750));
}
document.documentElement.style.cssText = 'font-size:'+(100 * autoScale())+'px';
//1rem = 100px
```