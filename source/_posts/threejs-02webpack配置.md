---
title: threejs 02webpack配置
date: 2023-01-31 10:31:48
cover: https://cdn.wdtwo.com/anzhiyu/three.js8034685.jpg
categories:
- 前端
tags:
- Bruno Simon
---

03 webpack

[视频链接](https://www.bilibili.com/video/BV1eS4y157kG)

<!--more-->

## html

```html

```

## script.js

```js
console.log(THREE);
//创造画布
const scene = new THREE.Scene()
//创造一个几何体
const geometry = new THREE.BoxGeometry(1,1,1)
//创造一个网格属性
const material = new THREE.MeshBasicMaterial({color:'red'})
//把网格属性绑定到几何体
const cube = new THREE.Mesh(geometry,material)
//把绑定后的几何体放到画布内
scene.add(cube)

const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

//添加一个相机
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
//设置相机位置
camera.position.x = 1.5
camera.position.y = 1.5
camera.position.z = 3
//把相机添加到画布
scene.add(camera)

//把创建好的画布渲染到canvas中
const renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector('#cvs')
})
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)
```






