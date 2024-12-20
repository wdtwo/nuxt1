---
title: webrtc录制麦克风声音
date: 2023-11-30 13:54:47
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---

```js
// 获取用户媒体设备（麦克风）
console.log(navigator.mediaDevices);
var mediaRecorder
navigator.mediaDevices.getUserMedia({ audio: true })
.then(function(stream) {
    // 创建 MediaRecorder 对象
    mediaRecorder = new MediaRecorder(stream);

    // 存放录制的音频数据
    var chunks = [];

    // 监听数据可用事件
    mediaRecorder.ondataavailable = function(event) {
        if (event.data.size > 0) {
            chunks.push(event.data);
            console.log(chunks);
        }
    };
    
    // 监听录制完成事件
    mediaRecorder.onstop = function() {
        // 创建 Blob 对象，其中包含录制的音频数据
        var audioBlob = new Blob(chunks, { type: 'audio/wav' });
        // // 创建一个音频元素并播放录制的音频
        // var audioElement = new Audio(URL.createObjectURL(audioBlob));
        // audioElement.play();
        // document.querySelector("#audio").setAttribute('src',URL.createObjectURL(audioBlob))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = URL.createObjectURL(audioBlob)
        link.download = `a${Math.floor(Math.random()*9999)}.mp3`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    };

    
})
.catch(function(err) {
    console.error('获取麦克风失败：', err);
});
document.querySelector("#start").addEventListener('click',function(){
    // 开始录制
    console.log('开始');
    mediaRecorder.start();
},false)
document.querySelector("#end").addEventListener('click',function(){
    console.log('结束');
    mediaRecorder.stop();
},false)
```


