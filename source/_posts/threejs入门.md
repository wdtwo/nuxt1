---
title: threejs入门
date: 2024-09-10 21:35:56
image: https://cdn.wdtwo.com/anzhiyu/three.js8034685.jpg
category: 
- 前端
tags: 
- threejs
---

## cdn引入
```html
<script type="importmap">
        {
            "imports":{
                "three":"./src/three.module.js"
            }
        }
</script>
<script type="module">
 import * as THREE from 'three'
 import {OrbitControls} from './src/OrbitControls.js'
 </script>
```
```js
//相机轨道控制器 创建控制器          相机  绑定的事件元素
const controls = new OrbitControls(camera,render.domElement)
controls.addEventListener('change',function(){
	//每次改变值重新触发输出 类似逐帧
	render.render(scene,camera)  //3d场景  相机
})
```


## 创建vue3项目
```bash
vite create object
npm init vite@latest
```
## 安装threejs
```bash
npm i three -S
```
```js
import * as Three from 'three'
```

## 场景创建基本步骤
1. 创建场景
2. 创建相机
3. 创建渲染器
4. 添加到DOM中
5. 添加物体
6. 添加光源

## 创建场景
```html
<script setup lang="ts">
import {ref,onMounted} from 'vue'
import * as Three from 'three'
const canvas = ref<any>()

onMounted(()=>{
    // 设置容器宽高
    const pos = {
        width:window.innerWidth,
        height:window.innerHeight
    }
    // 全屏渲染 改变窗口大小时重新设置相机
    window.onresize = function(){
        pos.width = window.innerWidth
        pos.height = window.innerHeight
        camera.aspect = pos.width / pos.height // 设置相机纵横比
        camera.updateProjectionMatrix() // 更新相机矩阵
        renderer.setSize(pos.width, pos.height) // 设置渲染器尺寸
        renderer.setPixelRatio(window.devicePixelRatio) // 设置像素比
        renderer.outputEncoding = THREE.sRGBEncoding; //定义渲染器的输出编码 默认为THREE.LinearEncoding
        renderer.shadowMap.enabled = true;//阴影贴图
    }

    // 创建一个场景  参数可选可不选
    const scene = new Three.Scene({
        antialias:true, // 抗锯齿
        powerPreference:'high-performance', // 性能优先
        alpha:true, // 不透明
        stencil:true, // 深度测试
        preserveDrawingBuffer:true, // 保留缓冲区
    })
   
    // 创建一个立方体
    const geometry = new Three.BoxGeometry(3, 3, 3)
    // 创建一个材质 opacity透明度 transparent是否透明 wireframe: true 是否显示线框
    const material = new Three.MeshBasicMaterial({color: 0x00ff00,opacity:0.5,transparent:true})
    // 创建一个网格模型 把材质和几何体绑定到一起
    const mesh = new Three.Mesh(geometry, material)
    // 设置模型的位置
    mesh.position.set(1.5,1.5,1.5)
    // 把模型添加到场景中
    group.add(mesh)
    // 创建一个透视相机
    const camera = new Three.PerspectiveCamera(75, pos.width / pos.height, 0.1, 1000)
    // 设置相机位置
    camera.position.set(5, 5, 20)
    // 把相机添加到场景中
    scene.add(camera)

    // 创建一个渲染器
    const renderer = new Three.WebGLRenderer({
        canvas:canvas.value,
        antialias:true, // 抗锯齿
    })
    // 渲染场景
    renderer.render(scene, camera)
})
</script>

<template>
    <canvas ref="canvas"></canvas>
</template>
```

## 创建一个模型组
```js
// 创建一个组
const group = new Three.Group()
scene.add(group)
group.add(new Three.Mesh(
    new Three.BoxGeometry(3, 3, 3),
    new Three.MeshBasicMaterial({ color: 0xff0000 })
))
```

## 设置模型位置的几种方式
```js
mesh.position.set(1,2,3) // 直接设置x y z

mesh.position.x = 1
mesh.position.y = 2
mesh.position.z = 3

mesh.position = {x:1,y:2,z:3}
```
## 设置模型旋转
```js
mesh.rotation.x = Math.PI / 4 // x轴旋转45度
mesh.rotation.y = Math.PI / 4 // y轴旋转45度
mesh.rotation.z = Math.PI / 4 // z轴旋转45度
mesh.rotation = {x:Math.PI / 4,y:Math.PI / 4,z:Math.PI / 4}
```
## 设置模型移动
```js
mesh.translateX(1) // x轴移动1个单位
mesh.translateY(2) // y轴移动2个单位
mesh.translateZ(3) // z轴移动3个单位
mesh.translateX(1,2,3) // x y z轴移动
mesh.translateX(1,2,3) // x y z轴移动
mesh.translateX({x:1,y:2,z:3}) // x y z轴移动
```
## 设置模型缩放
```js
mesh.scale.x = 2 // x轴缩放2倍
mesh.scale.y = 2 // y轴缩放2倍
mesh.scale.z = 2 // z轴缩放2倍
mesh.scale = {x:2,y:2,z:2}
```
## 创建辅助坐标轴
```js
const axesHelper = new Three.AxesHelper(5)
scene.add(axesHelper)
```
## 创建辅助网格
```js
// 平面辅助网格
const gridHelper = new Three.GridHelper(10, 10,0xff0000,0xefefef) // 总尺寸 格子个数 中线颜色(可选) 网格颜色(可选)
scene.add(grid)
```
## 辅助边界
为创建的模型添加矩形边界
```js
const sphere = new Three.SphereGeometry(1,32,32);
const object = new Three.Mesh( sphere, new Three.MeshBasicMaterial() );
const box = new Three.BoxHelper( object, 0xffff00 );
scene.add( object,box );
```
## 主动创建一个辅助边界
```js
const box = new THREE.Box3();
// 第一个参数是中心点 第二个参数是大小 x2 y1 z3
box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );
const helper = new THREE.Box3Helper( box, 0xffff00 );
scene.add( helper );
```
## 判断两个点之间的距离
```js
console.log(new Three.Vector3(0, 10, 0).distanceTo(mesh.position))
console.log(mesh.position.distanceTo(new Three.Vector3(0, 10, 0)))
```
## 通过第三方插件设置动画
```bash
npm install gsap -S
```
```js
gsap.to(group.position, {
    duration:1, 
    x:Math.sin(time) * 1.5,
    y:Math.sin(time) * 1.5,
    z:Math.sin(time) * 1.5
})
```
## 让模型动起来
恒定帧率渲染
```js
let quan = 0
setInterval(()=>{
    group.rotation.x += 0.01
    group.rotation.y += 0.01
    if(quan < 360){
        quan += 1
    }else{
        quan = 1
    }
    camera.position.x = Math.sin(quan * Math.PI / 180) * 10
    camera.position.y = 10
    camera.position.z = Math.cos(quan * Math.PI / 180) * 10
    // console.log(quan,camera.position)
    camera.lookAt(group.position)
    renderer.render(scene, camera)
},30)
```
通过window.requestAnimationFrame实现
```js
let lastTime = Date.now()
const tick = ()=>{
    let time = Date.now()
    const deltaTime = time - lastTime
    lastTime = time
    console.log(deltaTime) // 上一次结束和这次开始之间的时间间隔
    camera.position.x += 0.001 * deltaTime
    camera.position.z += 0.001 * deltaTime
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```
通过threejs clock实现
```js
const clock = new Three.Clock()
let quan = 0
const tick = ()=>{
    let time = clock.getElapsedTime()
    
    quan = time % 365 * 30 // 角度根据时间取余360度后放大30倍
    // 角度换算弧度 弧度 = 角度 * (Math.PI / 180);
    camera.position.x = Math.sin(quan * Math.PI / 180) * 10
    camera.position.z = Math.cos(quan * Math.PI / 180) * 10
    camera.position.y = 10
    // 直接使用时间也可以
    // camera.position.x = Math.sin(time) * 10
    // camera.position.z = Math.cos(time) * 10
    camera.lookAt(group.position)
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

## 使用数据控制相机移动
```js
canvas.value.addEventListener('mousemove',(event:any)=>{
    // x,y 的范围在 -1 到 1
    let x = event.offsetX / (pos.width / 2) - 0.5
    let y = event.offsetY / (pos.height / 2) - 0.5
    // 使用x,y移动的距离来进行圆周移动计算 放大十倍 然后进行相机的移动
    camera.position.x = Math.sin(x * Math.PI * 2) * 10
    camera.position.z = Math.cos(x * Math.PI * 2) * 10
    camera.position.y = Math.sin(y * Math.PI) * 10
    camera.lookAt(group.position)
})
```

## 内置事件
1.鼠标拖动
```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const controls = new OrbitControls(camera, canvas.value)
controls.minDistance = 2 // 最小距离
controls.maxDistance = 10 // 最大距离
controls.enableDamping = true // 开启惯性
// 限制相机旋转角度 
// x轴的旋转角度 上下视角限制
controls.minPolarAngle = 0; // 俯视视角
controls.maxPolarAngle = Math.PI / 2; // 90度 正视视角
// y轴的旋转角度 左右视角限制
controls.minAzimuthAngle = -Infinity; // 左视 参数和x轴的参数相反
controls.maxAzimuthAngle = Infinity; // 右视

// 给controls添加事件监听
controls.addEventListener('change', () => {
})
controls.addEventListener('start', () => {
})
controls.addEventListener('end', () => {
})

// 需要在window.requestAnimationFrame()中添加代码
controls.update()
```

## 使用BufferGeometry创建几何体
```js
// 创建一个三元数组 用来设置线的属性
const positionAttr = new Float32Array([
    1,1,1,
    2,1,1,
    1,2,1,
    1,1,1
])
// 创建一个线
const lineGeometry = new Three.BufferGeometry()
// 设置线的属性 3代表三元属性 每个点有三个参数构成
lineGeometry.setAttribute('position',new Three.BufferAttribute(positionAttr,3))
// 创建线模型 将线和材质绑定后添加到场景中 
scene.add(new Three.Line(lineGeometry,new Three.LineBasicMaterial({color:0xff00ff})))
```
### 创建线段
[Line](https://threejs.org/docs/index.html?q=line#api/zh/objects/Line)
```js
  const lineMaterial = new Three.LineBasicMaterial( {
    color: 0xffffff,
    linewidth: 1,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin:  'round' //ignored by WebGLRenderer
  } );
  const points = [];
  points.push( new Three.Vector3( - 10, 0, 0 ) );
  points.push( new Three.Vector3( 0, 10, 0 ) );
  points.push( new Three.Vector3( 10, 0, 0 ) );
  
  const geometry = new Three.BufferGeometry().setFromPoints( points );
  
  const line = new Three.Line( geometry, lineMaterial );
  scene.add( line );
```
### 创建闭合线段
[LineLoop](https://threejs.org/docs/index.html?q=line#api/zh/objects/LineLoop)
```js
const line = new Three.LineLoop( geometry, lineMaterial );
```

## 设置环境颜色
需要改变渲染器的颜色
```js
// 创建一个渲染器
const renderer = new Three.WebGLRenderer({
    canvas:canvas.value
})
renderer.setClearColor(0xdfdfdf, 1);
```
### 添加云雾效果
```js
// 添加雾效 当雾颜色和渲染器颜色相同时，远距离会导致物体隐藏
const fog = new Three.Fog(0xdfdfdf, 1,10) // 颜色 距离相机的近距离 距离相机的远距离(超过远距离则不显示)
scene.fog = fog
```

## 相机
### 透视相机
符合人眼的透视效果
```js
const camera = new Three.PerspectiveCamera(75, pos.width / pos.height, 0.1, 100)
camera.position.set(10,20,30) // x y z
camera.lookAt(group.position)
// 添加相机辅助控件 
// 会显示相机的位置和方向
const cameraHelper = new Three.CameraHelper(camera)
scene.add(camera,cameraHelper)
```

## 光源
### 环境光
[AmbientLight](https://threejs.org/docs/index.html#api/zh/lights/AmbientLight)
环境光不能单独存在,单独添加不会有效果
环境光会均匀的照亮场景中的所有物体。
环境光不能用来投射阴影，因为它没有方向。
某些材质（如基本材质` BasicMaterial`）可能不支持光照效果，或者对光照的响应不明显。尝试使用支持光照的材质，如 `MeshStandardMaterial` 或 `MeshPhongMaterial`。
```js
const ambientLight = new Three.AmbientLight(0xffffff, 1)
// 不能设置位置
scene.add(ambientLight)
```
### 平行光
[DirectionalLight](https://threejs.org/docs/index.html#api/zh/lights/DirectionalLight)
平行光是沿着特定方向发射的光。这种光的表现像是无限远，从它发出的光线都是平行的。常常用平行光来模拟太阳光的效果。 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的。
```js
const directionalLight = new Three.DirectionalLight(0xffffff, 1)
directionalLight.position.set(-2,3,4) // 设置平行光的位置
directionalLight.target.position.set(0,-3,0) // 设置平行光照射的目标
directionalLight.target.updateMatrixWorld() // 更新目标
scene.add(directionalLight)
// 平行光辅助线
const helper = new Three.DirectionalLightHelper( light, 5 ); // 光源 尺寸 颜色
scene.add( helper );
```
### 半球光
[HemisphereLight](https://threejs.org/docs/index.html#api/zh/lights/HemisphereLight)
光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
半球光不能投射阴影
```js
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); // 顶部照射颜色 底部照射颜色
const helper = new THREE.HemisphereLightHelper( light, 5 );
scene.add( light,helper );
```
### 点光源
[PointLight](https://threejs.org/docs/index.html#api/zh/lights/PointLight)
从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。
```js
const pointLight = new Three.PointLight(0xffffff, 1)
pointLight.position.set(-4,6,-2) // 设置点光源的位置
// 添加点光源辅助
const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
scene.add(pointLight,pointLightHelper)
```
### 平面光光源
[RectAreaLight](https://threejs.org/docs/index.html#api/zh/lights/RectAreaLight)
平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源。
注意事项:
- 不支持阴影。
- 只支持 MeshStandardMaterial 和 MeshPhysicalMaterial 两种材质。
- 你必须在你的场景中加入 RectAreaLightUniformsLib，并调用 init()。

```js
const width = 10;
const height = 10;
const intensity = 1; // 强度
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight.position.set( 5, 5, 0 );
rectLight.lookAt( 0, 0, 0 );
scene.add( rectLight )
// 需要辅助引入插件
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
const rectLightHelper = new RectAreaLightHelper( rectLight );
scene.add( rectLightHelper );
```

### 聚光灯
[SpotLight](https://threejs.org/docs/index.html#api/zh/lights/SpotLight)
光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大。
该光源可以投射阴影。
```js
const spotLight = new Three.SpotLight(0xffffff, 1)
spotLight.position.set(-4,6,-2) // 设置聚光灯的位置
spotLight.map = new THREE.TextureLoader().load( url ); // 聚光灯可以设置贴图(可选)
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add(spotLight,spotLightHelper)
```

## 添加测试组件
[lil-gui官方文档](https://lil-gui.georgealways.com/)
```bash
npm install lil-gui --save
```
使用
```js
import GUI from 'lil-gui'
const gui = new GUI()
// 第一种设置方式
// 对象 属性 名称 最小值 最大值 步长
gui.add(camera,'position','x',-10,10,0.1)
// 第二种设置方式 更清晰
gui.add(camera,'position','y').min(-10).max(10).step(0.1).name('y轴位置')
```
```js
gui.add(mesh,'visible') // 是否可见的复选框
gui.add(mesh.material,'wireframe').name('材质') // 材质的线框
```
### 添加一个颜色选择器
直接修改会发现选择的颜色和材质的颜色不一致
```js
gui.addColor(mesh.material,'color') // 添加颜色选择器
```
改良方法
```js
let debugObject = {
    color:'#333333'
}
const material = new Three.MeshStandardMaterial({color: debugObject.color,opacity:1,transparent:true})
gui.addColor(debugObject,'color').name('颜色').onChange((value)=>{
    mesh.material.color = new Three.Color(value)
    // 或者
    mesh.material.color.set(value)
})
```
### 添加按钮并添加事件
```js
debugObject.move = function(){
    mesh.position.x += 0.1
}
gui.add(debugObject,'move').name('移动')
```
### 设置相机回到初始位置
```js
debugObject.move = function(){
    gsap.to(camera.position,{
        duration : 1,
        x : Math.sin(0.5) * 10,
        y : Math.sin(0.5) * 10,
        z : Math.sin(0.8) * 10
    })
}
gui.add(debugObject,'move').name('移动')
```
### 修改网格数量
修改网格数量相对麻烦 没有直接修改的方法 所以只能先删除原来的 再添加新的
```js
debugObject.geometry = {
    geometry:1
}
    gui.add(debugObject.geometry,'geometry').name('网格数量').min(1).max(10).step(1).onFinishChange((e)=>{
    mesh.geometry.dispose() // 销毁原来的几何体
    mesh.geometry = new Three.BoxGeometry(3, 3, 3, e, e, e) // 重新设置几何体
})
```
### 创建一个编组
```js
// 创建一个编组
const folder = gui.addFolder('编组1')
folder.add(camera.position,'x').min(1).max(100).step(0.01)
folder.close() // 默认关闭分组
```
### 面板的基本参数设置
```js
const gui = new GUI({
  width: 300, // gui 面板宽度
  title: '控制面板', // 标题
  closeFolders: true, // 默认收起所有文件夹 true为收起
})
gui.close() //默认收起gui面板
gui.hide() // 隐藏gui面板
gui.show() // 显示gui面板
// 实现按键控制显示隐藏
document.addEventListener('keydown', (e) => {
  if (e.key === 'h') gui.show(gui._hidden) // 按下h键显示隐藏gui面板
})
```
## 帧数显示插件 stats.js
[github地址](https://github.com/mrdoob/stats.js/tree/master)
```bash
npm install stats.js --save
```
```js
import Stats from 'stats.js';
// 此处也可能写成 import * as Stats from 'stats.js' 可以看源码怎么写的再做处理
const clock = new Three.Clock()
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
function animate() {
    let time = clock.getElapsedTime()
    stats.begin();

    camera.position.x = Math.sin(time) * 10
    camera.position.z = Math.cos(time) * 10
    camera.lookAt(group.position)
    controls.update()
    renderer.render(scene, camera)

    stats.end();
    requestAnimationFrame( animate );
}
requestAnimationFrame( animate );
```

## 材质
### 加载图片材质
麻烦的方式
```js
// 加载一张图片作为纹理贴图
const img = new Image()
img.src = new URL('@/assets/1.jpg', import.meta.url).href; // vite加载资源的url 直接写不能加载
// 先把图片绑定到材质上 然后等待图片加载完成 更新材质
const texture = new Three.Texture(img) // 创建纹理贴图  
img.onload = function() {
    console.log('图片加载完成.')
    texture.needsUpdate = true; // 更新纹理贴图  
}
const material = new Three.MeshBasicMaterial({map:texture})
```
使用threejs加载器
```js
let material = ''
const loader = new Three.TextureLoader()
loader.load(new URL('@/assets/1.jpg', import.meta.url).href, (texture) => {
    material = new Three.MeshBasicMaterial({map:texture})
})
```
### 配置信息
```js
texture.repeat.x = 2  // 重复纹理次数
texture.repeat.y = 2  // 重复纹理次数
texture.wrapS = Three.RepeatWrapping // 水平重复方式
texture.wrapT = Three.RepeatWrapping // 垂直重复方式
texture.anisotropy = 16 // 纹理放大倍数
texture.offset.x = 0.5  // 纹理偏移
texture.offset.y = 0.5  // 纹理偏移
texture.rotation = Math.PI / 4 // 纹理旋转
texture.center.x = 0.5  // 纹理中心点
texture.center.y = 0.5  // 纹理中心点
texture.generateMipmaps = false // 是否根据相机的远近进行纹理放大和缩小
// 大图片缩小用这个不模糊 会出摩尔纹
texture.minFilter = Three.NearestFilter // 纹理过滤方式
// 小图片放大用这个不会模糊边界  
texture.magFilter = Three.NearestFilter // 纹理过滤方式
// 如果显示的图片和实际图片颜色不一致，可以设置一下
texture.colorSpace = Three.SRGBColorSpace // 颜色空间
```

## 材料
### 基础材质
[一种用于绘制线框样式几何体的材质。](https://threejs.org/docs/index.html#api/zh/materials/LineBasicMaterial)
不受光照影响的材质
```js
const material = new Three.MeshBasicMaterial({color:0xff0000}) // 红色
// 常用选项
material.map = texture; // 纹理贴图
material.color = new Three.Color(0xfffff); // 颜色
material.wireframe = true; // 显示线框
material.transparent = true; // 透明
material.opacity = 0.5; // 不透明度
material.side = Three.DoubleSide; // 两面显示 会消耗更过GPU
material.alphaMap = texture; // 透明贴图 白色显示 黑色隐藏 需要和transparent配合使用
```
### 点材质
[PointsMaterial](https://threejs.org/docs/index.html?q=points#api/zh/materials/PointsMaterial)
可以将物体的分段线段绘制为点
```js
// 加载贴图
const loader = new Three.TextureLoader()
let texture = loader.load(new URL('@/assets/bg.jpg', import.meta.url).href)
const sphere = new Three.SphereGeometry(1,32,32)
const masterial = new Three.PointsMaterial({
    size:0.01, // 设置点大小
    sizeAttenuation:true // 指定点的大小是否因相机深度而衰减。（仅限透视摄像头。）默认为true。
    map:texture, // 纹理贴图(纹理会渲染到每个点上)
    alphaMap:texture, // 透明度贴图 显示出透明部分后面的物体
    alphaTest:0.5, // 透明度测试
    depthTest:true, // 深度测试 物体不会遮挡其他物体(会导致所有物体都显示出来)
    depthWrite:false, // 深度写入 除非特殊情况,这种效果已经很好了
    blending:Three.AdditiveBlending, // 设置混合模式 相近的颜色会叠加在一起
    vertexColors:true, // 顶点颜色 Three.VertexColors 基础颜色color会影响设置的顶点颜色
    fog : Boolean, //材质是否受雾影响。默认为true。
})
const mesh = new Three.Points(sphere,masterial)
scene.add(mesh)
```
### 创建固定个数的随机点
```js
// 创建点材质
const masterial = new Three.PointsMaterial({
    color:0xff0000,
    size:0.02,
    sizeAttenuation:true
})
// 创建几何体
const bufferGeometry = new Three.BufferGeometry() 
// 创建点坐标数组
const pointArr = new Float32Array(5000 * 3)
const colorArr = new Float32Array(5000 * 3)
// 添加数据到数组中
for(let i = 0;i < pointArr.length;i++){
    pointArr[i] = Math.random() * 2 - 1
    colorArr[i] = Math.random()  // 0-1之间 不是0-255之间 
}
// 添加数据到几何体中
// 位置
bufferGeometry.setAttribute('position', new Three.BufferAttribute(pointArr,3))
// 颜色
bufferGeometry.setAttribute('color', new Three.BufferAttribute(colorArr,3))
// 创建点
const m1 = new Three.Points(bufferGeometry,masterial)
scene.add(m1)
```
### 让点动起来
```js
const clock = new Three.Clock()
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
function animate() {
    let time = clock.getElapsedTime()
    stats.begin();

    // 让每一个点分别动起来
    // 以三个数组为一组操作数据 i = 1 则是 xyz 从y开始
    for(let i = 1;i < m1.geometry.attributes.position.array.length;i+=3){
        // 获取到每个点的x值
        let x = m1.geometry.attributes.position.array[i - 1]
        // 设置每个点的y值为时间+x轴坐标的sin值 让他进行sin波动
        m1.geometry.attributes.position.array[i] = Math.sin(time+x*5) // Math.sin(time + i/10) * 3
    }
    // 告诉渲染器数据在更新重新渲染
    m1.geometry.attributes.position.needsUpdate = true

    controls.update()
    renderer.render(scene, camera)
    stats.end();
    requestAnimationFrame( animate );
}
requestAnimationFrame( animate );
```

### 法线网格材质
[一种把法向量映射到RGB颜色的材质。](https://threejs.org/docs/index.html#api/zh/materials/MeshNormalMaterial)
```js
const material = new Three.MeshNormalMaterial()

// 多一个属性
material.flatShading = true // 法线阴影 会产生平坦的阴影
```
### 材质捕捉
会在材质表面反射出加载图像的内容 像是照镜子
不受光照影响的材质
```js
const material = new Three.MeshMatcapMaterial()
material.matcap = new Three.TextureLoader().load(new URL('@/assets/1.jpg',import.meta.url).href)
```
### 深度网格材质
根据距离摄像机的距离来显示材质 (距离越近显示越亮)
可以用来实现云雾等效果
```js
const material = new Three.MeshDepthMaterial()
```
### Lambert网格材质
[MeshLambertMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshLambertMaterial)
一种非光泽表面的材质，没有镜面高光。
该材质使用基于非物理的Lambertian模型来计算反射率。 这可以很好地模拟一些表面（例如未经处理的木材或石材），但不能模拟具有镜面高光的光泽表面（例如涂漆木材）。 MeshLambertMaterial uses per-fragment shading。
由于反射率和光照模型的简单性，MeshPhongMaterial，MeshStandardMaterial或者MeshPhysicalMaterial 上使用这种材质时会以一些图形精度为代价，得到更高的性能。
```js
const material = new Three.MeshLambertMaterial()
```
### Phong网格材质
[MeshPhongMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial)
一种用于具有镜面高光的光泽表面的材质。
该材质使用非物理的Blinn-Phong模型来计算反射率。 与MeshLambertMaterial中使用的Lambertian模型不同，该材质可以模拟具有镜面高光的光泽表面（例如涂漆木材）。MeshPhongMaterial uses per-fragment shading。
在MeshStandardMaterial或MeshPhysicalMaterial上使用此材质时，性能通常会更高 ，但会牺牲一些图形精度。
```js
const material = new Three.MeshPhongMaterial()
```
### 标准网格材质
[MeshStandardMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshStandardMaterial)
一种基于物理的标准材质，使用Metallic-Roughness工作流程。
基于物理的渲染（PBR）最近已成为许多3D应用程序的标准，例如Unity， Unreal和 3D Studio Max。
这种方法与旧方法的不同之处在于，不使用近似值来表示光与表面的相互作用，而是使用物理上正确的模型。 我们的想法是，不是在特定照明下调整材质以使其看起来很好，而是可以创建一种材质，能够“正确”地应对所有光照场景。
在实践中，该材质提供了比MeshLambertMaterial 或MeshPhongMaterial 更精确和逼真的结果，代价是计算成本更高。MeshStandardMaterial uses per-fragment shading。
```js
const material = new Three.MeshStandardMaterial({
    roughness: 0.5, // 粗糙度
    metalness: 0.2, // 金属度
})
```
### 物理网格材质
[MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial)
MeshStandardMaterial的扩展，提供了更高级的基于物理的渲染属性：
Clearcoat: 有些类似于车漆，碳纤，被水打湿的表面的材质需要在面上再增加一个透明的，具有一定反光特性的面。而且这个面说不定有一定的起伏与粗糙度。Clearcoat可以在不需要重新创建一个透明的面的情况下做到类似的效果。
基于物理的透明度:.opacity属性有一些限制:在透明度比较高的时候，反射也随之减少。使用基于物理的透光性.transmission属性可以让一些很薄的透明表面，例如玻璃，变得更真实一些。
高级光线反射: 为非金属材质提供了更多更灵活的光线反射。
Sheen: Can be used for representing cloth and fabric materials.
物理网格材质使用了更复杂的着色器功能，所以在每个像素的渲染都要比three.js中的其他材质更费性能，大部分的特性是默认关闭的，需要手动开启，每开启一项功能在开启的时候才会更耗性能。
```js
const material = new Three.MeshPhysicalMaterial()
```
### 卡通着色
[MeshToonMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshToonMaterial)
一种实现卡通着色的材质。
```js
const material = new Three.MeshToonMaterial()
```

## 加载glb模型
```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 加载.glb模型
const loader = new GLTFLoader();

// 使用 import.meta.url 来构建正确的文件路径  
const url = new URL('@/assets/1.glb', import.meta.url).href;  
// 注意：如果文件是 .glb（二进制格式），上面的路径应该是正确的，但请确保文件扩展名正确  
// 如果文件是 .gltf（文本格式），则无需更改  
loader.load(  
    url,  
    (gltf) => {  
        console.log(gltf);  
        gltf.scene.position.set(3, 3, 3);  
        scene.add(gltf.scene);  
    },  
    undefined,  
    (error) => {  
        console.error(error);  
    }  
);
```

## 使用加载器管理加载状态 loadingManager
LoadingManager只能监控加载的资源 不能监控自定义的资源 
例如glb模型可以监控加载完成不能在回调中添加模型
```js
const loadingManager = new Three.LoadingManager()
loadingManager.onLoad = () => {
    console.log('加载完成')
}
loadingManager.onProgress = (url,loaded,total) => {
    console.log(`${url} 加载中 ${Math.floor(loaded / total * 100)}%`)
}
loadingManager.onError = (url) => {
    console.log(`${url} 加载失败`)
}
const url1 = new URL('@/assets/1.jpg',import.meta.url)
const texture = new Three.TextureLoader(loadingManager).load(url1)
```

### 使用google压缩模型文件(DRACOLoader)

(draco github)[https://github.com/google/draco]
(draco 官网)[https://google.github.io/draco/]
需要将`node_modules\three\examples\jsm\libs\draco`文件夹放到public目录下

** 如果报错Uncaught SyntaxError: Unexpected token '<' (at 7fde97c8-de31-412f-9f30-4f2af27bf265:2:1)**
则说明解码器文件路径不对 需要设置正确的路径
```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// 引用解码器库
const dracoLoader = new DRACOLoader()
// 设置解码器路径
dracoLoader.setDecoderPath('public/draco/gltf/');
// 设置解码器类型
dracoLoader.setDecoderConfig({ type: 'js' });
// 创建一个加载器
const loader = new GLTFLoader()
// 设置加载器
loader.setDRACOLoader(dracoLoader)

// 引用加密模型
loader.load(new URL('@/assets/glTF-Draco/Duck.gltf',import.meta.url).href,(model)=>{
    console.log(model)
    model.scene.scale.set(1, 1, 1)
    scene.add(model.scene)
})
```
## 使用模型的动画
```js
// 创建一个变量保存动画播放器
let mixer = null;

// 加载模型
loader.load('/static/fox/Fox.gltf',(model)=>{
    // 绑定一个动画播放器
    mixer = new Three.AnimationMixer(model.scene)
    // 提取出动画
    const action = mixer.clipAction(model.animations[0])
    // 播放动画
    action.play()

    scene.add(model.scene)
})

// 在渲染循环中更新动画
const clock = new Three.Clock()
let endTime = 0
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
function animate() {
    let time = clock.getElapsedTime()
    stats.begin();
    // 更新动画
    if(mixer){
        mixer.update(time - endTime)
    }
    renderer.render(scene, camera)
    endTime = time
    stats.end();
    requestAnimationFrame( animate );
}
requestAnimationFrame( animate );
```





## 设置阴影投影

1. 设置渲染器
2. 设置灯光
3. 设置可投影的模型
4. 设置接收阴影的模型

渲染器开启投影
```js
  renderer.shadowMap.enabled = true;
  // 阴影类型
  renderer.shadowMap.type = Three.PCFSoftShadowMap; 
```
光源开启投影
```js
const directionalLight = new Three.DirectionalLight(0xffffff, 1) // 白光
directionalLight.position.set(10,13,20)
directionalLight.castShadow = true // 开启阴影
// 设置参数
directionalLight.shadow.camera.left = -10
directionalLight.shadow.camera.right = 10
directionalLight.shadow.camera.top = 10
directionalLight.shadow.camera.bottom = -10
directionalLight.shadow.camera.near = 0
directionalLight.shadow.camera.far = 100
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.radius = 20
// 通过设置bias和normalBias来调整阴影的偏移 消除模型上的摩尔纹
directionalLight.shadow.bias = -0.001 // 阴影偏移
directionalLight.shadow.normalBias = 0 // 法线偏移

```
需要投影的网格开启投影
```js
 const boxGeometry = new Three.BoxGeometry(1, 1, 1)
 const material = new Three.MeshStandardMaterial({color:0xff0000})
 const mesh = new Three.Mesh(boxGeometry, material)
 mesh.castShadow = true // 开启阴影
```
接收投影的网格开启接收
```js
const plane2 = new Three.PlaneGeometry(10, 10)
const mesh2 = new Three.Mesh(plane2, new Three.MeshStandardMaterial({color:0xffffff}))
mesh2.receiveShadow = true // 接收阴影
```
### 静止的物体可以使用贴图来模拟投影
效果会更真实一些
```js
const loader = new Three.TextureLoader()
let texture = loader.load(new URL('@/assets/1.jpg', import.meta.url).href)
const plane2 = new Three.PlaneGeometry(10, 10)
const mesh = new Three.Mesh(plane2, new Three.MeshStandardMaterial({map:texture}))
    mesh.rotation.x = - Math.PI / 2
    mesh.receiveShadow = true // 接收阴影
scene.add(mesh)
```
### 使用alphaMap来模拟投影
```js
const mesh = new Three.Mesh(plane2, new Three.MeshStandardMaterial({
    // map:texture,
    color:0xffff00,
    transparent:true,
    opacity:0.5,
    alphaMap:texture,
}))
mesh.rotation.x = - Math.PI / 2
mesh.receiveShadow = true // 接收阴影
scene.add(mesh)
```
```js
const clock = new Three.Clock()
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
function animate() {
    let time = clock.getElapsedTime()
    stats.begin();

    box.position.y = Math.abs(1.5*Math.sin(time))+0.5
    mesh.scale.set(Math.abs(-0.5*Math.sin(time)),Math.abs(-0.5*Math.sin(time)),Math.abs(-0.5*Math.sin(time)))
    mesh.material.opacity = 1-Math.abs(Math.sin(time))+0.3
    
    controls.update()
    renderer.render(scene, camera)

    stats.end();
    requestAnimationFrame( animate );
}
requestAnimationFrame( animate );

```




## 光线投射
[Raycaster](https://threejs.org/docs/index.html?q=raycaster#api/zh/core/Raycaster)
```js
const raycaster = new Three.Raycaster()
const rayOrigin = new Three.Vector3(0, 0, 0)
```
```js
// 创建一个相交物体的组
const sphereGroup = new Three.Group()
// 添加球体
for(let i = 0; i < 3; i++){
    const sphere = createSphere(1, 20, 20,i * 3, 0 , 0, 0xff00ff)
    sphereGroup.add(sphere)
}
scene.add(sphereGroup)
// 创建一个光线投影
const raycaster = new Three.Raycaster()
// 创建一个位置作为初始位置
const rayOrigin = new Three.Vector3(-2, 0, 0)
// 创建一个方向向量
const rayDirection = new Three.Vector3(10, 5, 0)
rayDirection.normalize() // 只管方向不管大小 .multiplyScalar(50); 向量长度
raycaster.set(rayOrigin,rayDirection)
// 获取相交的物体
const intersects = raycaster.intersectObjects(sphereGroup.children, true)
// 画一条射线辅助线
const lineMaterial = new Three.LineBasicMaterial( {
    color: 0xffffff,
    linewidth: 1,
    linecap: 'round',
    linejoin:  'round'
});
const points = [];
points.push( rayOrigin );
points.push( rayDirection );
const geometry = new Three.BufferGeometry().setFromPoints( points );
const line = new Three.Line( geometry, lineMaterial );
scene.add( line );
```
### 计时器中更新射线
```js
const clock = new Three.Clock()
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
function animate() {
    let time = clock.getElapsedTime()
    stats.begin();

    // 恢复默认颜色
    for (const geometry of sphereGroup.children){
      geometry.material.color = new Three.Color(0xff00ff)
    }
    // 返回相交的物体
    const intersects = raycaster.intersectObjects(sphereGroup.children, true)
    // 设置接触颜色
    for(const interfsect of intersects){
      interfsect.object.material.color = new Three.Color(0x0000ff)
    }

    controls.update()
    renderer.render(scene, camera)
    stats.end();
    requestAnimationFrame( animate );
  }
  requestAnimationFrame( animate );
```

### 点击屏幕根据相机和鼠标位置获取相交的物体
```js
// 创建一个光线投影
const raycaster = new Three.Raycaster()
// 创建一个鼠标二维坐标系
let mouse = new Three.Vector2();
canvas.value.addEventListener('click', function(event) {
    // 将鼠标位置转换为归一化设备坐标
    mouse.x = (event.offsetX / canvas.value.width) * 2 - 1;
    mouse.y = -(event.offsetY / canvas.value.height) * 2 + 1;
    // 使用鼠标位置和相机设置射线投射器
    raycaster.setFromCamera(mouse, camera);
    // 返回相交的物体
    const intersect = raycaster.intersectObjects(sphereGroup.children)
    // 恢复默认颜色
    for (const geometry of sphereGroup.children){
      geometry.material.color = new Three.Color(0xff00ff)
    }
    // 设置接触颜色
    for(const interfsect of intersect){
      interfsect.object.material.color = new Three.Color(0x0000ff)
    }

    // 创建一个投射辅助线
    // 射线的起点（相机位置）
    const start = camera.position.clone();
    // 射线的终点（这里我们假设射线长度为50个单位）
    const end = new Three.Vector3().addVectors(camera.position, raycaster.ray.direction.multiplyScalar(50));
    // 创建线段的几何体
    const geometry = new Three.BufferGeometry().setFromPoints([start, end]);
    // 创建线段的材料
    const material = new Three.LineBasicMaterial({ color: 0x00ff00 }); // 假设我们使用绿色来表示射线
    // 创建线段并添加到场景中
    const rayLine = new Three.Line(geometry, material);
    scene.add(rayLine);
});
```



## 添加文字模型
[TextGeometry](https://threejs.org/docs/index.html#examples/zh/geometries/TextGeometry)
```js
// 引用字体
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
// 字体路径
const url = new URL('@/assets/helvetiker_regular.typeface.json',import.meta.url)
// 加载器加载字体
const loaderText = new FontLoader()
loaderText.load(url.href, function (font) {
    // 创建文本几何体
    const geometry = new TextGeometry('Hello three.js!', {
        font: font, // 字体
        size: 1,    // 字体大小 默认值为100
        depth:.1,   // 字体厚度。默认值为50。
        
        curveSegments: 12,    // （表示文本的）曲线上点的数量。默认值为12
        bevelEnabled: true,   // 是否开启斜角，默认为false
        bevelThickness: 0.03, // 文本上斜角的深度，默认值为20
        bevelSize: 0.03,      // 斜角与原始文本轮廓之间的延伸距离。默认值为8
        bevelSegments: 1,     //  斜角的分段数。默认值为3
    })
    // 获取几何体边界框
    geometry.computeBoundingBox()
    console.log(geometry.boundingBox)
    // 设置几何体的中心
    geometry.center()
    const mesh = new Three.Mesh(geometry, new Three.MeshNormalMaterial({ color: 0xff0000 }))
    mesh.castShadow = true // 阴影
    scene.add(mesh)
})
```
## 根据鼠标移动和滚轮来移动物体
```js
// 创建相机组用来使用滚轮控制相机位置
const cameraGroup = new Three.Group()
// 创建一个透视相机
const camera = new Three.PerspectiveCamera(35, pos.width / pos.height, 0.1, 1000)
cameraGroup.add( camera );
scene.add(cameraGroup)
// 设置相机位置
camera.position.z = 10
// 不要设置lookAt方法，因为它会导致相机的方向发生变化

const mouse = {
    x:0,
    y:0
}
// 鼠标移动事件监听
window.addEventListener('mousemove', function(event){
    mouse.x = (event.clientX / window.innerWidth) - 0.5
    mouse.y = -(event.clientY / window.innerHeight) - 0.5
})
function animate() {
    let time = clock.getElapsedTime()
    stats.begin();
    // 滚轮控制相机组移动
    cameraGroup.position.y = - (window.scrollY -window.innerHeight/2)/ 300
    // 鼠标滑动控制相机移动
    camera.position.x = mouse.x 
    camera.position.y = mouse.y 

    renderer.render(scene, camera)

    stats.end();
    requestAnimationFrame( animate );
  }
  requestAnimationFrame( animate );
```
### 添加缓动效果
```js

var timeEnd = 0;
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
function animate() {
    let time = clock.getElapsedTime()
    stats.begin();
    cameraGroup.position.y = - (window.scrollY - window.innerHeight  /2) / 300
    // 目标位置 - 当前位置    *   时间差    *   速度
    camera.position.x += (mouse.x - camera.position.x) * (time-timeEnd) * 5
    camera.position.y += (mouse.y - camera.position.y) * (time-timeEnd) * 5

    renderer.render(scene, camera)
    stats.end();
    timeEnd = time;
    requestAnimationFrame( animate );
}
requestAnimationFrame( animate );
```

## 物理引擎(重力)
### 3D库
- Ammo.js
- Cannon.js
- Oimo.js

### 2D库
- Matter.js
- P2.js
- Planck.js
- Box2D.js

### cannon.js
#### 安装
```bash
npm install cannon
```
#### 引用
```js
import CANNON from 'cannon'
```
### 创建刚体世界
```js
// 创建一个刚体世界
const world = new CANNON.World()
// 设置重力
world.gravity.set(0, -9.82, 0)
world.broadphase = new CANNON.SAPBroadphase(world) // 空间分割算法 速度快 稳定性好 速度过快可能会检测不到碰撞
world.solver.iterations = 10 // 迭代次数 每一帧进行碰撞检测的次数 越多越精确 但是会增加计算量
world.allowSleep = true // 允许睡眠 减少计算量 停止的物体会进入睡眠状态

// 创建一个球星刚体
const sphereBody = new CANNON.Body({ mass: 1 }) // 质量为1的刚体
const sphereShape = new CANNON.Sphere(0.5) // 半径为0.5的球体
sphereBody.addShape(sphereShape) // 给刚体添加形状
sphereBody.position.set(0, 1, 0) // 设置刚体位置
world.addBody(sphereBody) // 加入世界
// 创建一个地面刚体
const groundBody = new CANNON.Body({ mass: 0 }) // 质量为0的刚体为不可移动的物体
const groundShape = new CANNON.Plane() // 平面形状
groundBody.addShape(groundShape) // 给刚体添加形状
groundBody.position.set(0, 0, 0) // 设置刚体位置
// cannon.js旋转只支持四元数，这里设置地面刚体的四元数为绕x轴旋转-90度
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // 默认方向和threejs的平面是一样的 所以需要旋转一下
world.addBody(groundBody) // 加入世界

// 更新到定时器中
const clock = new Three.Clock()
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
function animate() {
    let time = clock.getElapsedTime()
    stats.begin();
    // 物理引擎更新
    world.step(1/60,time - endTime,3) // 步长 两次调用的时间间隔(可选) 迭代次数(可选最大10)
    // 刚体本身只负责物理属性 不会显示在场景中 所以需要手动绑定threejs的物体
    sphereMesh.position.copy(sphereBody.position) // 更新球体位置
    sphereMesh.quaternion.copy(sphereBody.quaternion) // 更新球体姿态

    renderer.render(scene, camera)
    stats.end();
    requestAnimationFrame( animate );
}
requestAnimationFrame( animate );

```

### 创建两种材质 并设置两种材质的物理属性
```js
// 创建两种材质
const AMaterial = new CANNON.Material('AMaterial')
const BMaterial = new CANNON.Material('BMaterial')
// 两种材质碰撞后的物理属性
const AContactMaterial = new CANNON.ContactMaterial(AMaterial, BMaterial, {
    friction: 0.3, // 摩擦系数
    restitution: 0.5, // 弹性系数
})
// 物理属性添加到世界
world.addContactMaterial(AContactMaterial)

// 把两种材质绑定到刚体上
sphereBody.material = BMaterial
groundBody.material = AMaterial

```
### 默认材质
```js
// 创建默认材质
const defaultMaterial = new CANNON.Material('default')
// 默认材质碰撞后的物理属性
const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
    friction: 0.3, // 摩擦系数
    restitution: 0.5, // 弹性系数
})
// 物理属性添加到世界
world.addContactMaterial(defaultContactMaterial)
// 设置所有刚体的材质为默认材质
world.defaultContactMaterial = defaultContactMaterial
// 不需要在刚体上绑定材质 全都具备默认材质的物理属性
```

### 添加力
```js
// 给刚体施加力的四种方式
// 施加一个力
sphereBody.applyForce(new CANNON.Vec3(0, 10, 0), sphereBody.position)
// 脉冲力 绕过添加力 而直接影响速度 参数与applyForce相同
sphereBody.applyImpulse(new CANNON.Vec3(0, 0, 10), sphereBody.position)
// 施加一个角力
sphereBody.applyLocalImpulse(new CANNON.Vec3(0, 0, 10), sphereBody.position)
// 施加一个旋转力
sphereBody.applyLocalTorque(new CANNON.Vec3(0, 0, 1), sphereBody.position)
```
#### 例子:施加一个力
```js
// 给一个刚体施加一个力 
sphereBody.applyLocalForce(new CANNON.Vec3(10, 0, 0), sphereBody.position) // 力的方向和力的大小 力的作用点
```
#### 例子:施加一个持续的阻力 类似于风
写在animate函数中
```js
sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position)
```

### 批量创建模型+刚体
```js
// 创建调试按钮
const defaultObj = {
    createShpere:function(){
      console.log('createShpere')
      createShpere(0.5,1,{x:Math.random()*2,y:5,z:Math.random()*2},0x00fff0)
    },
    createBox:function(){
      console.log('createBox')
      createBox({x:0,y:5,z:0})
    },
}
gui.add(defaultObj,'createShpere').name('创建球体')
gui.add(defaultObj,'createBox').name('创建盒子')



// 创建物体的数组
const objArray = []
// 创建球体
const createShpere = function(radius, mass, position, color){
    const sphereGeometry = new Three.SphereGeometry(radius, 32, 32)
    const sphereMaterial = new Three.MeshStandardMaterial({
      color:color,
    })
    const sphereMesh = new Three.Mesh(sphereGeometry, sphereMaterial)
    sphereMesh.position.copy(position)
    sphereMesh.castShadow = true;
    scene.add(sphereMesh)

    const sphereBody = new CANNON.Body({ 
      mass: mass,
      // material: defaultMaterial 此处不需要设置 因为已经设置全局
    })
    const sphere = new CANNON.Sphere(radius)
    sphereBody.addShape(sphere)
    sphereBody.position.copy(position)
    world.addBody(sphereBody)
    
    objArray.push({
      mesh:sphereMesh,
      body:sphereBody
    })
}
createShpere(0.5,1,{x:0,y:5,z:0},0x00fff0)

// 创建盒子
const createBox = function(position){
    let size = {
      x:Math.random()*2,
      y:Math.random()*2,
      z:Math.random()*2
    }
    const sphereGeometry = new Three.BoxGeometry(size.x, size.y, size.z)
    const sphereMaterial = new Three.MeshStandardMaterial({
      color:0x00fff0,
    })
    const boxMesh = new Three.Mesh(sphereGeometry, sphereMaterial)
    boxMesh.position.copy(position)
    boxMesh.castShadow = true;
    scene.add(boxMesh)

    const sphereBody = new CANNON.Body({ 
      mass: 1,
      // material: defaultMaterial 此处不需要设置 因为已经设置全局
    })
    // 此处需要注意 盒子的尺寸是 半径尺寸
    const sphere = new CANNON.Box(new CANNON.Vec3(size.x/2,size.y/2,size.z/2))
    sphereBody.addShape(sphere)
    sphereBody.position.copy(position)
    world.addBody(sphereBody)
    
    objArray.push({
      mesh:boxMesh,
      body:sphereBody
    })
}
createBox({x:Math.random()*5,y:8,z:Math.random()*5})

// ... animate函数
// 循环更新添加的模型状态
for(let item of objArray){
    item.mesh.position.copy(item.body.position)
    // 长方体需要添加选装渲染
    item.mesh.quaternion.copy(item.body.quaternion)
}
//
```
### 监听刚体的碰撞事件
```js
// 引入一个音频
const audio = new Audio(new URL('@/assets/h.mp3',import.meta.url).href)
// 添加事件监听
sphereBody.addEventListener('collide', function(e){
    console.log('collide')
    // 碰撞时播放音频
    const impactVelocity = e.contact.getImpactVelocityAlongNormal() // 获取碰撞后的速度
    if(impactVelocity > 1.5){
        audio.volume = Math.random() // 音量随机
        audio.currentTime = 0 // 音频从头开始播放
        audio.play() // 播放音频
    }
})
```

## 环境贴图
### 加载图片环境贴图
```js
const imgLoader = new Three.CubeTextureLoader();
const bg = imgLoader.load([
    new URL('@/assets/grass/color.jpg',import.meta.url).href, 
    new URL('@/assets/grass/normal.jpg',import.meta.url).href, 
    new URL('@/assets/grass/roughness.jpg',import.meta.url).href, 
    new URL('@/assets/grass/ambientOcclusion.jpg',import.meta.url).href, 
    new URL('@/assets/bricks/color.jpg',import.meta.url).href, 
    new URL('@/assets/bricks/ambientOcclusion.jpg',import.meta.url).href, 
])
scene.environment = bg // 环境
scene.background = bg // 背景
scene.backgroundBlurriness = 0.1 // 背景模糊 (0 - 1) 0是不模糊
scene.backgroundIntensity = 2 // 环境光强度
```
## 设置所有模型材质的强度
```js
const updateAllMaterials = () =>
{
    // 循环所有模型
    scene.traverse((child) =>
    {
        // 判断是否是mesh 且材质是否是MeshStandardMaterial
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            // 设置材质的环境光强度
            child.material.envMapIntensity = global.envMapIntensity
        }
    })
}
```


### 使用HDR文件添加贴图背景
更佳精细的效果 但是hdr文件会更大
```js
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
const rgbeLoader = new RGBELoader();
rgbeLoader.load(new URL('@/assets/empty_play_room_4k.hdr',import.meta.url).href, function (texture) {
    texture.mapping = Three.EquirectangularReflectionMapping; // 映射
    scene.background = texture; // 背景
    scene.environment = texture; // 环境
    scene.backgroundBlurriness = 0 // 背景模糊
    scene.backgroundIntensity = 1 // 环境光强度
});
```
```js
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
const exrLoader = new EXRLoader();
exrLoader.load(new URL('@/assets/empty_play_room_4k.exr',import.meta.url).href, function (texture) {
    texture.mapping = Three.EquirectangularReflectionMapping; // 映射
    scene.background = texture; // 背景
    scene.environment = texture; // 环境
    scene.backgroundBlurriness = 0 // 背景模糊
    scene.backgroundIntensity = 1 // 环境光强度
});
```
### 使用一张全景贴图来代替背景
```js
const textureLoader = new Three.TextureLoader()
textureLoader.load(new URL('@/assets/grass/color.jpg',import.meta.url).href, (texture) => {
    texture.mapping = Three.EquirectangularReflectionMapping // 映射
    texture.colorSpace = Three.SRGBColorSpace // 颜色空间
    scene.background = texture // 背景
    scene.environment = texture // 环境
})
```
### 添加天空盒

```js
// 引入天空盒
import { GroundedSkybox } from 'three/examples/jsm/objects/GroundedSkybox.js';

// 纹理加载器
const textureLoader = new Three.TextureLoader()
textureLoader.load(new URL('@/assets/grass/color.jpg',import.meta.url).href, (texture) => {
    texture.mapping = Three.EquirectangularReflectionMapping
    texture.colorSpace = Three.SRGBColorSpace
    scene.environment = texture // 环境
    // 添加天空盒   材质  0.01高度  10半径
    const groundedSkybox = new GroundedSkybox(texture,0.01,10)
    // 设置大小
    groundedSkybox.scale.setScalar(2)
    scene.add(groundedSkybox)
})
```
## 天空模型
```js
//地面模型
// 几何体
const groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );//材质
groundMat.color.setHSL( 0.095, 1, 0.75 );
//创建网格模型
const ground = new THREE.Mesh( groundGeo, groundMat );
ground.position.y = - 33;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;//网格模型接收阴影
scene.add( ground );
```
```js
// 天空模型
const vertexShader = `
varying vec3 vWorldPosition;
void main() {
	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
	vWorldPosition = worldPosition.xyz;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
const fragmentShader = `
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;
varying vec3 vWorldPosition;
void main() {
	float h = normalize( vWorldPosition + offset ).y;
	gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
}
`;
const uniforms = {
	'topColor': { value: new THREE.Color( 0x0077ff ) },
	'bottomColor': { value: new THREE.Color( 0xffffff ) },
	'offset': { value: 33 },
	'exponent': { value: 0.5 }
};
uniforms[ 'topColor' ].value.copy( hemiLight.color );
scene.fog.color.copy( uniforms[ 'bottomColor' ].value );
const skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
const skyMat = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	side: THREE.BackSide
} );
const sky = new THREE.Mesh( skyGeo, skyMat );
scene.add( sky );
```

## 物体反光和镜面效果
```js
// 添加一个发光圆环
const geometry = new Three.TorusGeometry( 1.5, 0.1); 
const material = new Three.MeshBasicMaterial( { color: new Three.Color(10,10,10) } ); 
const torus = new Three.Mesh( geometry, material ); 
torus.layers.enable(1); // 添加到图层  使用enable在正常场景中也可以显示
scene.add( torus ); 

// 添加一个镜面的立方体
const box = new Three.BoxGeometry(1, 1, 1)
const boxMaterial = new Three.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0, // 粗糙度
    metalness: 1, // 金属度
})
const boxMesh = new Three.Mesh(box, boxMaterial)
boxMesh.position.set(0, 0.5, 0)
scene.add(boxMesh)

// 创建一个投影渲染器
const cubeRednerTarget = new Three.WebGLCubeRenderTarget(
    256, // 像素大小 数字越大效果越好 性能消耗更大
    {
        type : Three.HalfFloatType // 半精度 float也可以 但是效果相同 性能消耗更大
    }
)
// 把渲染器渲染的纹理作为环境贴图
scene.environment = cubeRednerTarget.texture
// 创建一个立方体相机
const cubeCamera = new Three.CubeCamera(0.1, 100, cubeRednerTarget)
cubeCamera.layers.set(1) // 添加到图层
// 设置立方体相机位置与需要渲染的物体位置一致
cubeCamera.position.copy(boxMesh.position)
scene.add(cubeCamera)

```

### 渲染器设置曝光参数
```js
// 设置曝光强度
renderer.toneMappingExposure = 0.5
// 设置色调映射 demo 曝光模式
// renderer.toneMapping = Three.ReinhardToneMapping 
gui.add(renderer, 'toneMapping', {
        NoToneMapping: Three.NoToneMapping,
        LinearToneMapping: Three.LinearToneMapping,
        ReinhardToneMapping: Three.ReinhardToneMapping,
        CineonToneMapping: Three.CineonToneMapping,
        ACESFilmicToneMapping: Three.ACESFilmicToneMapping
    }
)
```

## GLSL的解释
GLSL（OpenGL Shading Language）是一种高级编程语言，专门设计用于编写运行在图形处理单元（GPU）上的程序。它是OpenGL的一部分，OpenGL是一个跨语言、跨平台的编程接口，用于渲染2D和3D矢量图形。GLSL允许开发者编写所谓的“着色器”（Shaders），这些着色器在GPU上执行，负责处理图形渲染管线中的不同阶段，如顶点着色（Vertex Shading）、片段着色（Fragment Shading）等。
### GLSL的主要特点：
- 并行性：GLSL程序在GPU上并行执行，这意味着多个顶点或片段可以同时被处理，大大提高了图形渲染的效率。
- 硬件加速：由于GLSL程序运行在GPU上，它们可以利用GPU的并行处理能力，实现比CPU上运行的软件更快的图形处理。
- 与OpenGL紧密集成：GLSL是OpenGL的一部分，因此它可以直接访问OpenGL提供的各种资源和功能，如纹理、缓冲区对象等。
- 可编程性：通过GLSL，开发者可以自定义图形渲染管线中的各个阶段，实现自定义的渲染效果，如光照、阴影、纹理映射等。
- 跨平台：由于OpenGL是一个跨平台的API，GLSL程序也可以在支持OpenGL的多种硬件和操作系统上运行。
### GLSL的基本结构：
#### GLSL程序通常包括几个部分，每个部分对应图形渲染管线中的一个阶段：
- 顶点着色器（Vertex Shader）：处理每个顶点的数据，如位置、颜色、纹理坐标等。它通常用于实现顶点变换、光照计算等。
- 片段着色器（Fragment Shader）：处理每个片段（像素的候选者）的颜色和其他属性。它通常用于实现纹理映射、光照效果、颜色混合等。
- 几何着色器（Geometry Shader，可选）：在顶点着色器之后运行，允许开发者创建或修改图元（如点、线、三角形）。
- 计算着色器（Compute Shader，较新的特性）：用于执行通用计算任务，不直接参与图形渲染，但可以利用GPU的并行处理能力进行高性能计算。
- GLSL程序通常使用类似于C的语法，但包含了一些专门用于图形处理的数据类型和函数。开发者需要熟悉OpenGL的渲染管线以及GPU的工作原理，才能有效地使用GLSL来创建复杂的图形效果。


## 着色器
需要使用到`glsl`语言编写
在计算机图形学中，顶点着色器（Vertex Shader）和片段着色器（Fragment Shader）是GPU编程中的两个核心组件，它们在图形渲染管道中扮演着至关重要的角色。以下是关于这两个着色器的详细解释：
### 顶点着色器（Vertex Shader）
顶点着色器是图形渲染管道的第一个可编程阶段。它的主要任务是对每个顶点进行处理，包括坐标变换、光照计算和其他顶点属性的计算。具体来说，顶点着色器执行以下操作：
- 坐标变换：将顶点坐标从模型空间转换到世界空间、视图空间和裁剪空间。这一过程中常用的变换矩阵包括模型矩阵、视图矩阵和投影矩阵。
- 光照计算：计算每个顶点的光照属性，如环境光、漫反射光和镜面反射光。
- 属性传递：将顶点属性（如颜色、纹理坐标、法线）传递到片段着色器，供后续处理使用。
顶点着色器处理后的顶点数据将作为后续渲染阶段（如光栅化、片段着色）的输入。

### 片段着色器（Fragment Shader）
片段着色器是图形渲染管道的最后一个可编程阶段。它的主要任务是计算每个片段（像素）的最终颜色值。具体来说，片段着色器执行以下操作：

- 颜色计算：根据顶点着色器传递过来的颜色和纹理采样，计算每个片段的颜色。
- 纹理采样：从纹理中采样颜色，并将其应用到片段上。
- 光照计算：进一步进行光照计算，以获得更加真实的光照效果。
- 特效实现：实现各种特效，如阴影、反射、折射等，以增强图像的视觉效果。
片段着色器处理后的片段数据将被合成到最终渲染的图像中。

### 两者之间的关系
- 数据传递：顶点着色器处理每个顶点的数据，并将结果（如变换后的顶点位置、颜色、纹理坐标等）传递给片段着色器。顶点着色器输出的插值变量会被片段着色器使用。
- 阶段顺序：顶点着色器在图形渲染管道的早期阶段运行，负责顶点的几何变换和属性计算；而片段着色器在后期阶段运行，负责计算顶点形成的图元（如三角形）内部每个片段的颜色。
- 并行执行：GPU通过并行执行大量顶点着色器和片段着色器来加速图形渲染。每个顶点和每个片段的处理都是独立的，这使得并行计算成为可能。

### 直接使用glsl
```js
// 顶点着色器代码
const vertexShader = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
// 片段着色器代码
const fragmentShader = `
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
        // 使用简单的颜色渐变效果，基于uv坐标
        float intensity = mix(0.0, 1.0, vUv.y);
        gl_FragColor = vec4(color * intensity, 1.0);
    }
`;
// 创建着色器材料
const material = new Three.ShaderMaterial({
    vertexShader: vertexShader, // 顶点着色器代码
    fragmentShader: fragmentShader, // 片段着色器代码
    uniforms: { // uniform变量 传递给着色器
        color: { value: new Three.Color(0xff0000) } // 红色
    }
});
// 创建一个几何体并应用材质
const geometry = new Three.BoxGeometry();
const cube = new Three.Mesh(geometry, material);
// 添加到场景中
scene.add(cube);
// 渲染场景（这部分代码通常位于动画循环中）
renderer.render(scene, camera);
```
### 引用glsl文件
用于将 GLSL 文件转换为 JavaScript 代码。它允许您在 Vue、React 或其他支持 Vite 的框架中使用 GLSL 着色
二选一即可:
- `vite-plugin-glslify` 很久没更新了
- `vite-plugin-glsl` 还在持续更新
```bash
npm install vite-plugin-glslify -d
npm install vite-plugin-glsl -d
```
安装好glsl后需要在vite.config.js中配置
```js
import glsl from 'vite-plugin-glsl'
export default defineConfig({
    plugins: [
        glsl()
    ]
})
```
### 在vue文件中引用glsl
**着色器材料中失效的属性 map alphaMap color etc 需要在glsl中处理**
```html
<script setup lang="ts">
    import vertexShader from './vertexShader.glsl'
    import fragmentShader from './fragmentShader.glsl'
    // 创建着色器材质
    const material = new Three.ShaderMaterial({
        vertexShader: vertexShader, // 顶点着色器代码
        fragmentShader: fragmentShader, // 片段着色器代码
        uniforms: { // uniform变量 传递给着色器
            color: { value: new Three.Color(0xff0000) } // 红色
        }
    });
</script>
```
### 插件
[代码插件](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)
### vertex.glsl 
```c
gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
```
- 这个表达式首先通过modelViewMatrix将物体的位置从对象空间变换到视图空间。
- 然后，通过projectionMatrix将视图空间中的位置变换到裁剪空间。
- 最终得到的gl_Position是一个四维向量，在光栅化阶段，OpenGL会使用这个向量的x, y, z分量进行透视除法（使用w分量），从而得到归一化设备坐标（Normalized Device Coordinates, NDC），这是进行光栅化和片段着色之前的一个重要步骤。
#### 常量
`常量可以不声明直接使用`
``
##### Attributes
`Attributes 主要用于顶点着色器，并且通常包含与每个顶点相关的数据，例如顶点位置、法线、纹理坐标等。在Three.js中，常见的attributes包括：`
- position：顶点的位置（通常在模型空间中）。
- normal：顶点的法线向量（用于光照计算）。
- uv：顶点的纹理坐标。
- color：顶点的颜色。
##### Uniforms
`Uniforms 是传递给着色器的常量值，它们在着色器程序执行期间不会改变，但对于每一帧或每一次绘制调用，它们的值可以从CPU端设置。在Three.js中，你可以使用许多内置的uniforms，也可以定义自己的uniforms。一些常见的内置uniforms包括：`
- projectionMatrix：投影矩阵（用于将视图空间坐标转换为裁剪空间坐标）。
- modelViewMatrix：模型视图矩阵（用于将模型空间坐标转换为视图空间坐标）。
- normalMatrix：法线矩阵（用于变换法线向量）。
- cameraPosition：相机在世界空间中的位置。
- resolution：渲染目标的分辨率（宽度和高度）。
- time：当前时间（通常用于动画效果）。

#### 变量
- uniform 接收js(uniforms)传递来的参数
- attribute 接收着色器的attribute属性
- varying 声明变量传递给片段着色器(用于从顶点着色器传递数据到片段着色器。它们在顶点着色器中被写入，并在片段着色器中被读取。Varyings在光栅化过程中会被插值，以便为每个片段生成一个值。)

#### 数据类型
- vec2 vec3 vec4 矢量类型
- mat2 mat3 mat4 矩阵类型
- float 浮点类型
- void 空类型
- bool 布尔类型
- sampler2D 纹理类型
- attribute 顶点属性

**强类型语言 类似于C预言**

```js
const loader = new Three.TextureLoader() // 纹理加载器
// 创建着色器材料
const material = new Three.ShaderMaterial({
    vertexShader: vertexShader, // 顶点着色器代码
    fragmentShader: fragmentShader, // 片段着色器代码
    uniforms: {
        color: { value: new Three.Color(0xff00ff) },
        uFren: { value: 2 }, // sin频率
        uTime: { value: 0 }, // 传递时间变量
        uTexture: { value: loader.load(new URL('@/assets/us.jpg', import.meta.url).href) } // 加载纹理
    }
});
```
`顶点着色器代码 vertex.glsl`
```c
uniform vec3 color;
uniform float uFren;
uniform float uTime;
attribute float aRandom;
varying vec2 vuv;
varying float z;
void main() {
    z = sin(position.x * uFren + uTime) * 0.3;
    z += sin(position.y * uFren + uTime) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y, z, 1.0);
    vuv = uv;
}
```
`片段着色器代码 fragment.glsl`
```c
uniform vec3 color;
uniform sampler2D uTexture;
varying vec2 vuv;
varying float z;
void main() {
    gl_FragColor = vec4(color , 1.0); // 使用颜色和透明度
    vec4 texColor = texture2D(uTexture, vuv); // 使用纹理 加载纹理
    texColor.rgb *= z * 1.0 + 1.0; // 设置亮度   -0.3 < z < 0.3
    gl_FragColor = texColor; 
}
```

#### fragment 片段着色器 例子

- mod(x, y) 返回 x / y 的余数
- step(a, b) 返回 a < b ? 1.0 : 0.0
- clamp(a, b, c) 返回 max(a, min(b, c))
- max(a,b) 返回最大值
- min(a,b) 返回最小值
- abs(a) 返回绝对值
- length(vuv) 返回向量长度
- distance(vuv,vec2(0.0,0.0)) 返回两点距离
- atan(vuv.x,vuv.y) 返回反正切值
- mix(a,b,c) 混合两种颜色 a第一种 b第二种 c渲染的向量位置 

##### 公用部分
```c
// 常量
#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
// 返回一个 0 ~ 1 之间的随机数(伪随机)
float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
// 旋转坐标系 (原来的坐标系,旋转角度π=180°,旋转中心vec2(0.5,0.5))
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}


vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}
```
#### 使用demo
![https://cdn.wdtwo.com/glsl/images/1.png](demo)
```c
// Pattern 1
gl_FragColor = vec4(vUv, 1.0, 1.0);
```
![https://cdn.wdtwo.com/glsl/images/2.png](demo)
```c
// Pattern 2
gl_FragColor = vec4(vUv, 0.0, 1.0);
```
![https://cdn.wdtwo.com/glsl/images/3.png](demo)
```c
// Pattern 3
float strength = vUv.x;
```
![https://cdn.wdtwo.com/glsl/images/4.png](demo)
```c
// Pattern 4
float strength = vUv.y;
```
![https://cdn.wdtwo.com/glsl/images/5.png](demo)
```c
// Pattern 5
float strength = 1.0 - vUv.y;
```
![https://cdn.wdtwo.com/glsl/images/6.png](demo)
```c
// Pattern 6
float strength = vUv.y * 10.0;
```
![https://cdn.wdtwo.com/glsl/images/7.png](demo)
```c
// Pattern 7
float strength = mod(vUv.y * 10.0, 1.0);
```
![https://cdn.wdtwo.com/glsl/images/8.png](demo)
```c
// Pattern 8
float strength = mod(vUv.y * 10.0, 1.0);
strength = step(0.5, strength);
```
![https://cdn.wdtwo.com/glsl/images/9.png](demo)
```c
// Pattern 9
float strength = mod(vUv.y * 10.0, 1.0);
strength = step(0.8, strength);
```
![https://cdn.wdtwo.com/glsl/images/10.png](demo)
```c
// Pattern 10
float strength = mod(vUv.x * 10.0, 1.0);
strength = step(0.8, strength);
```
![https://cdn.wdtwo.com/glsl/images/11.png](demo)
```c
// Pattern 11
float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
strength += step(0.8, mod(vUv.y * 10.0, 1.0));
strength = clamp(strength, 0.0, 1.0);
```
![https://cdn.wdtwo.com/glsl/images/12.png](demo)
```c
// Pattern 12
float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
```
![https://cdn.wdtwo.com/glsl/images/13.png](demo)
```c
// Pattern 13
float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
```
![https://cdn.wdtwo.com/glsl/images/14.png](demo)
```c
// Pattern 14
float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
float strength = barX + barY;
strength = clamp(strength, 0.0, 1.0);
```
![https://cdn.wdtwo.com/glsl/images/15.png](demo)
```c
// Pattern 15
float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
float strength = barX + barY;
strength = clamp(strength, 0.0, 1.0);
```
![https://cdn.wdtwo.com/glsl/images/16.png](demo)
```c
// Pattern 16
float strength = abs(vUv.x - 0.5);
```
![https://cdn.wdtwo.com/glsl/images/17.png](demo)
```c
// Pattern 17
float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
```
![https://cdn.wdtwo.com/glsl/images/18.png](demo)
```c
// Pattern 18
float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
```
![https://cdn.wdtwo.com/glsl/images/19.png](demo)
```c
// Pattern 19
float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
```
![https://cdn.wdtwo.com/glsl/images/20.png](demo)
```c
// Pattern 20
float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
```
![https://cdn.wdtwo.com/glsl/images/21.png](demo)
```c
// Pattern 21
float strength = floor(vUv.x * 10.0) / 10.0;
```
![https://cdn.wdtwo.com/glsl/images/22.png](demo)
```c
// Pattern 22
float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;
```
![https://cdn.wdtwo.com/glsl/images/23.png](demo)
```c
// Pattern 23
float strength = random(vUv);
```
![https://cdn.wdtwo.com/glsl/images/24.png](demo)
```c
// Pattern 24
vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
float strength = random(gridUv);
```
![https://cdn.wdtwo.com/glsl/images/25.png](demo)
```c
// Pattern 25
vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0);
float strength = random(gridUv);
```
![https://cdn.wdtwo.com/glsl/images/26.png](demo)
```c
// Pattern 26
float strength = length(vUv);
```
![https://cdn.wdtwo.com/glsl/images/27.png](demo)
```c
// Pattern 27
float strength = distance(vUv, vec2(0.5));
```
![https://cdn.wdtwo.com/glsl/images/28.png](demo)
```c
// Pattern 28
float strength = 1.0 - distance(vUv, vec2(0.5));
```
![https://cdn.wdtwo.com/glsl/images/29.png](demo)
```c
// Pattern 29
float strength = 0.015 / (distance(vUv, vec2(0.5)));
```
![https://cdn.wdtwo.com/glsl/images/30.png](demo)
```c
// Pattern 30
float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
```
![https://cdn.wdtwo.com/glsl/images/31.png](demo)
```c
// Pattern 31
float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
```
![https://cdn.wdtwo.com/glsl/images/32.png](demo)
```c
// Pattern 32
vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
strength *= 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
```
![https://cdn.wdtwo.com/glsl/images/33.png](demo)
```c
// Pattern 33
float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);
```
![https://cdn.wdtwo.com/glsl/images/34.png](demo)
```c
// Pattern 34
float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
```
![https://cdn.wdtwo.com/glsl/images/35.png](demo)
```c
// Pattern 35
float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
```
![https://cdn.wdtwo.com/glsl/images/36.png](demo)
```c
// Pattern 36
float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
```
![https://cdn.wdtwo.com/glsl/images/37.png](demo)
```c
// Pattern 37
vec2 wavedUv = vec2(
    vUv.x,
    vUv.y + sin(vUv.x * 30.0) * 0.1
);
float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
```
![https://cdn.wdtwo.com/glsl/images/38.png](demo)
```c
// Pattern 38
vec2 wavedUv = vec2(
    vUv.x + sin(vUv.y * 30.0) * 0.1,
    vUv.y + sin(vUv.x * 30.0) * 0.1
);
float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
```
![https://cdn.wdtwo.com/glsl/images/39.png](demo)
```c
// Pattern 39
vec2 wavedUv = vec2(
    vUv.x + sin(vUv.y * 100.0) * 0.1,
    vUv.y + sin(vUv.x * 100.0) * 0.1
);
float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
```
![https://cdn.wdtwo.com/glsl/images/40.png](demo)
```c
// Pattern 40
float angle = atan(vUv.x, vUv.y);
float strength = angle;
```
![https://cdn.wdtwo.com/glsl/images/41.png](demo)
```c
// Pattern 41
float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
float strength = angle;
```
![https://cdn.wdtwo.com/glsl/images/42.png](demo)
```c
// Pattern 42
float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
float strength = angle;
```
![https://cdn.wdtwo.com/glsl/images/43.png](demo)
```c
// Pattern 43
float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
float strength = mod(angle * 20.0, 1.0);
```
![https://cdn.wdtwo.com/glsl/images/44.png](demo)
```c
// Pattern 44
float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
float strength = sin(angle * 100.0);
```
![https://cdn.wdtwo.com/glsl/images/45.png](demo)
```c
// Pattern 45
float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
float radius = 0.25 + sin(angle * 100.0) * 0.02;
float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));
```
![https://cdn.wdtwo.com/glsl/images/46.png](demo)
```c
// Pattern 46
float strength = cnoise(vUv * 10.0);
```
![https://cdn.wdtwo.com/glsl/images/47.png](demo)
```c
// Pattern 47
float strength = step(0.0, cnoise(vUv * 10.0));
```
![https://cdn.wdtwo.com/glsl/images/48.png](demo)
```c
// Pattern 48
float strength = 1.0 - abs(cnoise(vUv * 10.0));
```
![https://cdn.wdtwo.com/glsl/images/49.png](demo)
```c
// Pattern 49
float strength = sin(cnoise(vUv * 10.0) * 20.0);
```
![https://cdn.wdtwo.com/glsl/images/50.png](demo)
```c
// Pattern 50
float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));
```
```c
gl_FragColor = vec4(vec3(strength), 1.0);
```
```c
// Final color
vec3 blackColor = vec3(0.0);
vec3 uvColor = vec3(vUv, 1.0);
vec3 mixedColor = mix(blackColor, uvColor, strength);
gl_FragColor = vec4(mixedColor, 1.0);
```


## 11添加2d标签
`<div :ref='index' :id='index'>标注</div>`
```js
//tag.vue
import {CSS2DObject} from 'three/examples/jsm/renderers/CSS2DObject.js'
import {scene} from './three/index.js'

mounted(){
	var div = this.$refs[this.index]
	var label = new CSS2DObject(div)
	div.style.pointerEvents = 'none'//防止html标签遮挡三维场景
	label.position.set(this.x,this.y,this.z)
	scene.add(label)
}
```
```js
//CSS2DRenderer.js
import {CSS2DRenderder} from 'three/examples/jsm/renderers/CSS2DRenderder'

var CSS2LabelRenderder = new CSS2DRenderder()
CSS2LabelRenderder.setSize(500,500)
CSS2LabelRenderder.domElement.style.position = 'absolute'
CSS2LabelRenderder.domElement.style.left = '0px'
CSS2LabelRenderder.domElement.style.top = '0px'
CSS2LabelRenderder.domElement.style.pointerEvents = 'none'
document.body.appendChild(CSS2LabelRenderder.domElement)
export {CSS2LabelRenderer}
//index.js
import {CSS2LabelRenderer} from 'CSS2DRenderer.js'
render.render(scene,camera)
CSS2LabelRenderer.render(scene,camera)
```