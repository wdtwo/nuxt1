---
title: threejs着色器-01汹涌的大海
published: 2024-11-21
description: ''
image: https://cdn.wdtwo.com/anzhiyu/three.js8034685.jpg
tags: [threejs]
category: '前端'
draft: false 
---

```js
import * as Three from 'three'
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

import vertexShader from './glsl/vertex.glsl'
import fragmentShader from './glsl/fragment.glsl'

const gui = new GUI()
// 调试对象
const debugObject = {
  depthColor : 0x186691, // 深度颜色
  surfaceColor: 0x9bd8ff // 表面颜色
};

// 创建一个平面
const geometry = new Three.PlaneGeometry(2,2,1024,1024);
  
// 创建着色器材料
const material = new Three.ShaderMaterial({
    // wireframe: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uTime: { value: 0 }, // 时间
        uBigWavesElevation: { value: 0.2 }, // 大波高度
        uBigWavesFrequency: { value: new Three.Vector2(4, 1.5) }, // 大波频率
        uBigWavesSpeed: { value: 0.75 }, // 大波速度

        uSmallWavesElevation: { value: 0.15 }, // 小波高度
        uSmallWavesFrequency: { value: 3 }, // 小波频率
        uSmallWavesSpeed: { value: 0.2 }, // 小波速度
        uSmallIterations: { value: 4 }, // 小波迭代次数

        uDepthColor: { value: new Three.Color(debugObject.depthColor) }, // 深度颜色
        uSurfaceColor: { value: new Three.Color(debugObject.surfaceColor) }, // 表面颜色
        uColorOffset: { value: 0.08 }, // 颜色偏移
        uColorMultiplier: { value: 5 } // 颜色融合度(对比度)
    }
});

// debug ↓↓↓↓↓↓
gui.addColor(debugObject, 'depthColor').name('深层颜色').onChange(()=>{
    material.uniforms.uDepthColor.value.set(debugObject.depthColor)
})
gui.addColor(debugObject, 'surfaceColor').name('表面颜色').onChange(()=>{
    material.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
})

gui.add(material.uniforms.uBigWavesElevation, 'value').name("大波高度").min(0).max(1).step(0.001)
gui.add(material.uniforms.uBigWavesFrequency.value, 'x').name("大波频率x").min(0).max(10).step(0.001)
gui.add(material.uniforms.uBigWavesFrequency.value, 'y').name("大波频率y").min(0).max(10).step(0.001)
gui.add(material.uniforms.uBigWavesSpeed, 'value').name("大波速度").min(0).max(4).step(0.001)

gui.add(material.uniforms.uSmallWavesElevation, 'value').name("小波高度").min(0).max(1).step(0.001)
gui.add(material.uniforms.uSmallWavesFrequency, 'value').name("小波频率").min(0).max(30).step(0.001)
gui.add(material.uniforms.uSmallWavesSpeed, 'value').name("小波速度").min(0).max(4).step(0.001)
gui.add(material.uniforms.uSmallIterations, 'value').name("小波迭代次数").min(0).max(5).step(1)

gui.add(material.uniforms.uColorOffset, 'value').name("颜色偏移").min(0).max(1).step(0.001)
gui.add(material.uniforms.uColorMultiplier, 'value').name("颜色融合度").min(0).max(10).step(0.001)
// debug ↑↑↑↑↑↑

// 创建网格
const cube = new Three.Mesh(geometry, material);
cube.rotation.x = -Math.PI / 2

// 添加到场景中
scene.add(cube);

// tick ↓↓↓↓↓↓
const clock = new Three.Clock()
  let endTime = 0
  var stats = new Stats();
  stats.showPanel( 0 );
  function animate() {
    let time = clock.getElapsedTime()
    stats.begin();
    // 传入时间
    material.uniforms.uTime.value = time
    renderer.render(scene, camera)
    endTime = time
    stats.end();
    requestAnimationFrame( animate );
}
requestAnimationFrame( animate );
// tick ↑↑↑↑↑↑
// 改变窗口大小时重新设置相机
window.onresize = function(){
    pos.width = window.innerWidth
    pos.height = window.innerHeight
    camera.aspect = pos.width / pos.height // 设置相机纵横比
    camera.updateProjectionMatrix() // 更新相机矩阵
    renderer.setSize(pos.width, pos.height) // 设置渲染器尺寸
    renderer.setPixelRatio(window.devicePixelRatio) // 设置像素比
}

```

### 顶点着色器 vertex.glsl 
```c
// 参数
uniform float uTime;
uniform float uBigWavesElevation; // 大波高度
uniform vec2 uBigWavesFrequency; // 大波频率
uniform float uBigWavesSpeed; // 大波速度

uniform float uSmallWavesElevation; // 小波高度
uniform float uSmallWavesFrequency; // 小波频率
uniform float uSmallWavesSpeed;  // 小波速度
uniform float uSmallIterations; // 小波迭代次数

varying float vElevation; // 波面高度

// 引用的插件 ↓↓↓↓↓↓
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}
float cnoise(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}
// 引用的插件 ↑↑↑↑↑

void main() {
    // modelMatrix 模型矩阵, viewMatrix 视图矩阵, projectionMatrix 投影矩阵, position 顶点位置
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // Elevation 海拔计算
    // sin(定点的x值 * 波峰频率 + 时间 * 波速) * sin(定点的z值 * 波峰频率 + 时间 * 波速) * 波幅
    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
                      sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
                      uBigWavesElevation;

    for(float i = 1.0; i <= uSmallIterations; i++)
    {
        // 给当前顶点位置加上噪点
        elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }
     // 给当前顶点位置加上噪点后的海拔
    modelPosition.y += elevation;
    // 将顶点位置转换到视锥体空间 (视锥体空间是三维坐标系, 范围在[-1, 1]之间)
    vec4 viewPosition = viewMatrix * modelPosition;
    // 
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vElevation = elevation;
}
```
### 片段着色器 fragment.glsl
```c
// 参数
uniform vec3 uDepthColor; // 深度颜色
uniform vec3 uSurfaceColor; // 表面颜色
uniform float uColorOffset; // 颜色偏移
uniform float uColorMultiplier; // 颜色混合强度(对比度)

varying float vElevation; // 经过计算后的高度

void main() {
    // (高度 + 颜色偏移) * 对比度
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    // 混合颜色
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    gl_FragColor = vec4(color, 1.0);
}
```