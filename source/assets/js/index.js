import * as Three from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
let camera, scene, renderer, controls;
const canvas = document.getElementById('canvas')

// 设置容器宽高
const pos = {
    width:canvas.offsetWidth,
    height:canvas.offsetHeight
}
// 创建一个场景  参数可选可不选
scene = new Three.Scene({
    antialias:true, // 抗锯齿
    powerPreference:'high-performance', // 性能优先
    alpha:true, // 不透明
    stencil:true, // 深度测试
    preserveDrawingBuffer:true, // 保留缓冲区
})

// 添加坐标系
const axesHelper = new Three.AxesHelper(5)
scene.add(axesHelper)

// 创建一个立方体
const geometry = new Three.BoxGeometry(3, 3, 3)
// 创建一个材质 opacity透明度 transparent是否透明 wireframe: true 是否显示线框
const material = new Three.MeshBasicMaterial({color: 0x0000ff,opacity:0.8,transparent:true})
// 创建一个网格模型 把材质和几何体绑定到一起
const mesh = new Three.Mesh(geometry, material)
// 设置模型的位置
mesh.position.set(0, 0, 0)
// 把模型添加到场景中
scene.add(mesh)
// 创建一个透视相机
camera = new Three.PerspectiveCamera(45, pos.width / pos.height, 0.1, 1000)
// 设置相机位置
camera.position.set(5, 5, 20)
// 把相机添加到场景中
scene.add(camera)

renderer = new Three.WebGPURenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( pos.width, pos.height );

canvas.appendChild( renderer.domElement );
 // compute texture
 renderer.renderAsync( scene, camera );
 // 添加背景
 renderer.setClearColor( 0xefefef, 1 );

// 创建一个控制器
controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 1 // 最小距离
controls.maxDistance = 50 // 最大距离
controls.enableDamping = true // 开启惯性
// 限制相机旋转角度 
// x轴的旋转角度 上下视角限制
controls.minPolarAngle = 0; // 俯视视角
controls.maxPolarAngle = Math.PI / 2; // 90度 正视视角
// y轴的旋转角度 左右视角限制
controls.minAzimuthAngle = -Infinity; // 左视 参数和x轴的参数相反
controls.maxAzimuthAngle = Infinity; // 右视

// 需要在window.requestAnimationFrame()中添加代码
function animate(){
    renderer.renderAsync(scene, camera)
    controls.update()
    window.requestAnimationFrame(animate)
}
animate()


// 全屏渲染 改变窗口大小时重新设置相机
window.onresize = function(){
    pos.width = window.innerWidth
    pos.height = window.innerHeight
    camera.aspect = pos.width / pos.height // 设置相机纵横比
    camera.updateProjectionMatrix() // 更新相机矩阵
    renderer.setSize(pos.width, pos.height) // 设置渲染器尺寸
    renderer.setPixelRatio(window.devicePixelRatio) // 设置像素比
    renderer.outputEncoding = Three.sRGBEncoding; //定义渲染器的输出编码 默认为THREE.LinearEncoding
    renderer.shadowMap.enabled = true;//阴影贴图
}
