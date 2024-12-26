---
title: js浏览器文本阅读
date: 2023-11-15 08:55:48
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---

```js
// 获取阅读方法
const synth = window.speechSynthesis;
if(!synth){
    alert("浏览器不支持阅读")
}
const sel = document.querySelectorAll("#sel")[0]
let voices
let selectActive
getVoices().then(res=>{
    // console.log(res);
    voices = res
    for(v of res){
        var option = document.createElement("option");
        option.text = v.name
        option.value = v.name
        if(v.name.includes("Yunxi ")){
            // 设置<option>为默认选中
            option.selected = true;
            selectActive = v.name
        }
        document.querySelectorAll("#sel")[0].add(option);
    }
})
// 选择声音
sel.addEventListener('change',function(e){
    console.log(this,this.value);
    selectActive = this.value
})
// 暂停
document.querySelectorAll("#pause")[0].addEventListener("click",function(){
    synth.pause()
})
// 继续
document.querySelectorAll("#resume")[0].addEventListener("click",function(){
    synth.resume()
})
// document.querySelectorAll("#read")[0].addEventListener("click",function(){
//     readTextPlay()
// })
function readTextPlay(){
    // 获取文本内容
    let txt = document.querySelectorAll("#text")[0].value
    // console.log(txt);
    // 把文本添加到需要阅读的对象中
    let readText = new SpeechSynthesisUtterance(txt.trim())
    // 阅读完成事件
    readText.onend = function (event) {
        console.log("阅读完成");
        getDatas()
    };
    readText.onerror = function (event) {
        console.error("阅读出错");
    };
    readText.voice = voices.filter(v=>v.name == selectActive)[0]; // 设置说话的声音
    readText.pitch = 1; // 设置音调高低 听不出效果
    readText.rate = 1; // 设置说话的速度  0.5: "缓慢",  0.75: "", 1: "常规",1.25: "",1.5: "",1.75: "",2: "快",
    synth.speak(readText);
}
//获取语音列表
function getVoices(){
    return new Promise(function(resolve,reject){
        // 获取语音列表
        setTimeout(()=>{
            let voices = synth.getVoices()
            //过滤出只有中文的语音 其他的排除
            resolve(voices.filter(v=>v.name.includes("Chinese")));
        },100)
    })
}
```