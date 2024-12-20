---
title: js发送系统消息Notification
date: 2023-08-16 10:39:06
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---

js发送系统消息Notification
<!--more-->
```js
document.querySelectorAll('#btn')[0].addEventListener('click',()=>{
    // Notification.requestPermission((res) => {
    //     console.log(res)  // granted 允许 、denied 拒绝、default 未询问
    // })
    //自定义通知内容和样式
    Notification.requestPermission((res) => {
        if(res !== 'granted') return

        //参数详情
        // body: 通知的正文，显示在标题下方
        // tag：定义通知的标识，相同 tag 的通知正在显示的内容会被替换，已经自动关闭的会被替换不再弹出
        // icon：通知图标的 URL
        // image：通知中图像的 URL
        // renotify：重复的 tag 是否再次通知，默认 false 不重复通知
        // requireInteraction：是否强制手动关闭，默认 false 会自动关闭
        // silent：是否静音，默认 false 会有提示声音
        // 当通知创建后会被立即显示出来，过一段时间会自动关闭，包含 4 个事件
        let notice = new Notification("title", {
            body: 'body',
            tag: '111',
            icon: './a.png',
            image: './a.png',
            renotify: false,
            requireInteraction: true,
            silent: false,
        })
        // onshow：当通知显示给用户时触发
        // onclick：当用户点击通知后触发（点击后通知会被关闭）
        // onclose：当使用 notice.close.bind(notice) 关闭通知后触发（自动关闭的通知无法触发）
        // onerror：当通知无法显示给用户时触发（常见于没有用户没有授权）
        notice.onshow = function () {
            console.log('show')
            setTimeout(notice.close.bind(notice), 5000)
        }
        notice.onclick = function () {
            console.log('click')
        }
        notice.onclose = function () {
            console.log('close')
        }
        notice.onerror = function () {
            console.log('error')
        }
    })
})
```