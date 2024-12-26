---
title: threejs原生学习
date: 2023-01-31 10:31:48
image: https://cdn.wdtwo.com/anzhiyu/three.js8034685.jpg
category: 
- 前端
tags: 
- js
- threejs
- Bruno Simon
---

## 01环境配置
下载 https://github.com/mrdoob/three.js
####运行环境安装
```js
npm install live-server -g
```
es5引用
```js
script src='./src/three.js'
console.log(THREE.Scene)
```
es6 module引用
```js
script type='module'
import * as THREE from './src/three.module.js'
console.log(THREE)
```

## 02创建3D场景
```js
import * as THREE from './src/three.module.js'
console.log(THREE);
//创建一个3D场景
const scene = new THREE.Scene()
//创建一个长方体
const geometry = new THREE.BoxGeometry(100,100,100)
//设置材质
const material = new THREE.MeshBasicMaterial({
	color:'ff9999',
    transparent:true,//允许透明
    opacity:0.5
})
//创建一个网格模型对象 把创建的物体和材质绑定到网格模型
const mesh = new THREE.Mesh(geometry,material)
//把网格模型添加到3D场景中
scene.add(mesh)
```

## 03渲染3D场景
渲染器renderer控制相机camera对3D场景Scene进行拍照

```js
//创建一个透视相机
let width = window.innerWidth,
height = window.innerHeight;
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
//设置相机的位置
camera.position.set(200,200,200)
//设置相机的拍摄方向
camera.lookAt(0,0,0)

//创建一个webgl渲染器
const render = new THREE.WebGLRenderer({
    alpha:true //背景透明
})
//设置渲染的宽高
renderer.setPixelRatio( window.devicePixelRatio );//像素比
renderer.setSize(width,height);//设置canvas宽高
renderer.outputEncoding = THREE.sRGBEncoding;//定义渲染器的输出编码 默认为THREE.LinearEncoding
renderer.shadowMap.enabled = true;//阴影贴图
//执行渲染
render.render(scene,camera)
//输出到页面
document.body.appendChild(render.domElement)
```

## 04添加光源

```js
//添加一个环境光 
const ambient = new THREE.AmbientLight('ff99ff',0.3)
scene.add(ambient)
//添加一个平行光
const directional = new THREE.DirectionalLight('ffffff',0.8)
scene.add(directional)
//添加一个半球光
const hemisphere = new THREE.HemisphereLight('ffffff',0.8)
scene.add(hemisphere)
//添加一个点光源
const point = new THREE.PointLight('ffffff',0.9)
//设置点光源位置
point.position.set(200,150,120)
scene.add(point)
```
### demo
```js
// 半球光
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );
//光线辅助线
const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
scene.add( hemiLightHelper );
```
```js
//平行光
const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );
//平行光辅助线
const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
scene.add( dirLightHelper );
```

## 05相机轨道控制器(改变视角)
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

## 063D坐标系等辅助方法
```js
//添加3D坐标系
const axes = new THREE.AxesHelper(120) //坐标系尺寸
scene.add(axes)

//创建一个网格模型对象 把创建的物体和材质绑定到网格模型
const mesh = new THREE.Mesh(geometry,material)
mesh.position.set(100,0,0)//设置网格模型在坐标系中的位置
mesh.rotateY(Math.PI/4)//网格模型旋转45度

//点光源辅助观察 显示点光源位置
const pointHelper = new THREE.PointLightHelper(point,10)
scene.add(pointHelper)
```

## 07动画渲染循环
```js
//html5自带功能
function renderFrame(){
    requestAnimationFrame(renderFrame)
    mesh.rotateY(0.01)
    render.render(scene,camera)
}
renderFrame()
//此处循环渲染以后 相机的change事件可以不写了
//controls.addEventListener('change',function(){
//	render.render(scene,camera)
//})
//到此处即完成了一个小型初步渲染框架
```

## 08动画渲染循环
### 添加阵列
```js
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        //创建一个网格模型对象 把创建的物体和材质绑定到网格模型
        const mesh = new THREE.Mesh(geometry,material)
        mesh.position.set(i*150,0,j*150)
        //把网格模型添加到3D场景中
        scene.add(mesh)
    }
}
```
### 改变视野位置1
```js
//改变相机视差位置 1,10000
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
//设置相机的拍摄方向
camera.lookAt(1000,0,1000)
//需要关闭相机轨道控制器 不然会被重置位置
//const controls = new OrbitControls(camera,render.domElement)
```
### 改变视野位置1
```js
//设置相机的位置
camera.position.set(1000,1000,1000)
//相机轨道控制器
const controls = new OrbitControls(camera,render.domElement)
controls.target.set(750,0,750) //内置方法会自动执行lookAt方法
controls.update()
```

### 09vue引用
```js
//安装
npm install three@0.133.0 --save
//引用
//index.js
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
export {render}
//页面引入
import {render} from './three/index.js'
//html
<div ref='webgl'></div>
mounted(){
	this.$refs.webgl.appendChild(render.domElement)
}
```

## 10vue与three交互
```js
//index.js导出网格模型
export {render,mesh}

//page.vue
import {mesh} from './three/index.js'
methods:{
	click(){
		mesh.material.color.set(0xffff00)
	}
}
```

## 11添加2d标签
```js
//tag.vue
<div :ref='index' :id='index'>标注</div>

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

## 12显示帧率
```js
import Stats from './src/stats.module.js'
const stats = new Stats();
document.body.appendChild(stats.dom)

function renderFrame(){
    requestAnimationFrame(renderFrame)
    stats.update()
    renderer.render(scene,camera)
}
renderFrame()
```

## 13球体贴图
```js
var mesh = null;
function initContent() {
//读取图片
    let texture = new THREE.TextureLoader().load('./smworld.png');
    创建球体
    const geometry = new THREE.SphereGeometry( 15, 32, 16 );
    //设置图片为材质
    let sphereMaterial = new THREE.MeshBasicMaterial({map: texture});
    //创建网格
    mesh = new THREE.Mesh( geometry, sphereMaterial );
    scene.add( mesh );
}
initContent()
//添加旋转动画
function renderFrame(){
    requestAnimationFrame(renderFrame)
    if(mesh){
    	mesh.rotateY(0.003)
    }
    stats.update()
    renderer.render(scene,camera)
}
renderFrame()
```

## 14画线
```js
//画线
function drawLine(){
    //创建实线
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    //直线点参数 ↓↓↓↓↓
    var points = [];
        points.push( new THREE.Vector3( -50, 0, 0 ) );
        points.push( new THREE.Vector3( 0, 50, 0 ) );
        points.push( new THREE.Vector3( 10, 0, 0 ) );
    //直线点参数 ↑↑↑↑↑

    //曲线点参数 ↓↓↓↓↓
    // 三维样条曲线 Catmull-Rom算法
    var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(50, 20, 90),
        new THREE.Vector3(100, 40, 40),
        new THREE.Vector3(0, 0, 0)
    ]);
    //曲线点参数 ↑↑↑↑↑

    //三点贝塞尔曲线 p1起点p3终点p2控制点 ↓↓↓↓↓
    var p1 = new THREE.Vector3(-80, 0, 0);
    var p2 = new THREE.Vector3(20, 100, 0);
    var p3 = new THREE.Vector3(80, 0, 0);
    var curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);
    //三点贝塞尔曲线 ↑↑↑↑↑

    //四点贝塞尔曲线 p1起点p4终点p2p3控制点 ↓↓↓↓↓
    var p1 = new THREE.Vector3(-80, 0, 0);
    var p2 = new THREE.Vector3(-40, 100, 0);
    var p3 = new THREE.Vector3(40, 100, 0);
    var p4 = new THREE.Vector3(80, 0, 0);
    var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
    //四点贝塞尔曲线 ↑↑↑↑↑

    //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
    var points = curve.getPoints(100); //分段数100，返回101个顶点 分段数越多越平滑 越少越尖锐
    //显示线段
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add(line)
}
drawLine()
```

## 15模型添加动画
```js
//引入模型
import {GLTFLoader} from './src/GLTFLoader.js'

const loader = new GLTFLoader();
let mixers;
loader.load( './models/Parrot.glb', function ( gltf ) {
    mesh = gltf.scene
    mesh.scale.set(0.1,0.1,0.1)
    mesh.position.set(0,0,0)
    scene.add( gltf.scene );
    
    
    //动画混合器
    const mixer = new THREE.AnimationMixer( mesh );
    console.log(gltf);
    mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
    mixers = mixer //把动画对象暴露到全局
} );
//在渲染函数中获取当前时间
const clock = new THREE.Clock();
const render = () => {
    if(mixers){
        const delta = clock.getDelta();
        mixers.update( delta );
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
requestAnimationFrame(render);
```

## 16天空模型
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

## 17添加音频
```js
//添加音频
function addAudio(){
    const listener = new THREE.AudioListener()
    camera.add(listener)
    const sound = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load('./media/多远都要在一起.m4a',function(buffer){
        console.log(buffer);
        sound.setBuffer(buffer)
        sound.setLoop(true)
        sound.setVolume(.5)
        sound.play()
    })
}
addAudio()
```
