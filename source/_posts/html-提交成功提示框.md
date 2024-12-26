---
title: html提交成功提示框
date: 2023-05-10 11:07:29
image: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: 
- 前端
tags: 
- html
---
html提交成功提示框
<!--more-->

```html
<div class="success">
    <div class="box flex flex-column re">
        <div class="svg" style="transform: scale(1.656);">
            <svg class="done" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <path class="check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
            </svg>
        </div>
        <div class="m-t-70 f36 f-w-b c-555 txt">提交成功!</div>
    </div>
</div>
```

```js
$('.success').addClass("current")
```

```css
.success {
    width: 100%;
    height:100%;
    background-color: rgba(0,0,0,.3);
    position: fixed;
    left:0;
    top:0;
    z-index: 999;
    display: none;
    padding-bottom: 30%;
}
.success.current {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.success .box {
    width: 5rem;
    height:5rem;
    background: white;
    border-radius: 0.2rem;
}
.success .txt {
    opacity: 0;
    transform: translateY(0.3rem);
}
.success i {
    width: .42rem;
    height:.42rem;
    position: absolute;
    right:.25rem;
    top:.25rem;
    background: url(../images/close.png) no-repeat;
    background-size: 100% auto;
    opacity: 0;
}
.done {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 20px auto;
    box-shadow: inset 0px 0px 0px #7ac142;
}
.done .circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #7ac142;
    fill: none;
}
.done .check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
}
.current .done {
    animation: fill-green 0.5s ease-in-out 0.5s forwards, scale 0.3s ease-in-out 0.7s both;
}
.current .done .circle {
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.current .done .check {
    animation: stroke 0.7s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}
.current.success .txt {
    animation: txt 1s ease 0.8s forwards;
}
.current.success i {
    animation: txt 1s ease 0.8s forwards;
}
@keyframes txt {
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}
@keyframes scale {
    0%, 100% {
        transform: none;
    }
    50% {
        transform: scale3d(1.2, 1.2, 1);
    }
    80% {
        transform: scale3d(0.8, 0.8, 1);
    }
}
@keyframes fill-green {
    100% {
        box-shadow: inset 0px 0px 0px 25px #7ac142;
    }
}
@keyframes fill-red {
    100% {
        box-shadow: inset 0px 0px 0px 25px #e74c3c;
    }
}
```