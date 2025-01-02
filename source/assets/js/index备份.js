import * as THREE from 'three';
import WebGPU from 'three/addons/capabilities/WebGPU.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
let camera, scene, renderer, controls;
const canvas = document.getElementById('canvas');

init();

function init() {
    // 判断是否支持WebGPU
    if ( WebGPU.isAvailable() === false ) {
        canvas.appendChild( WebGPU.getErrorMessage() );
        throw new Error( 'No WebGPU support' );
    }
    // 创建场景
    scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera( 45, aspect, 0.1, 1000 );
    camera.position.x = 20;
    camera.position.y = 20;
    camera.position.z = 20;
    camera.lookAt( 0, 0, 0 );

    const material = new THREE.MeshStandardMaterial( { 
        color: 0xfff537,
        roughness: 0.5, // 粗糙度
        metalness: 0.5, // 金属度
        reflectivity: 0.5, // 反射率
     } );
    for(let i = 0; i < 1000; i++){
        const size = Math.random() * 0.1;
        const cube = new THREE.Mesh( new THREE.BoxGeometry( size, size, size ), material );
        cube.position.x = Math.random() * 10 - 5;
        cube.position.y = Math.random() * 10 - 5;
        cube.position.z = Math.random() * 10 - 5;
        cube.colorSpace = THREE.SRGBColorSpace;
        scene.add( cube );
    }
    // 添加一个环境光
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8 );
    scene.add( ambientLight );
    // 添加一个平行光
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 5, 3, 2.7 );
    // 添加阴影
    directionalLight.castShadow = true;
    scene.add( directionalLight );
    
    renderer = new THREE.WebGPURenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
    
    // 添加坐标辅助
    const axesHelper = new THREE.AxesHelper( 3 );
    scene.add( axesHelper );

    canvas.appendChild( renderer.domElement );
    // compute texture
    renderer.renderAsync( scene, camera );
    // 添加背景
    renderer.setClearColor( 0xdfdfdf, 1 );
    // window.addEventListener( 'resize', onWindowResize );

    // 创建并配置 OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果
    controls.dampingFactor = 0.05; // 设置阻尼系数
    controls.screenSpacePanning = false; // 禁用屏幕空间平移
    controls.minDistance = 1; // 最小缩放距离
    controls.maxDistance = 20; // 最大缩放距离
    controls.maxPolarAngle = Math.PI / 2; // 限制垂直旋转角度

    // 添加动画循环
    animate();
}
// function onWindowResize() {
//     renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
//     const aspect = window.innerWidth / window.innerHeight;
//     const frustumHeight = camera.top - camera.bottom;
//     camera.left = - frustumHeight * aspect / 2;
//     camera.right = frustumHeight * aspect / 2;
//     camera.updateProjectionMatrix();
//     render();
// }
// render();
// function render() {
//     renderer.renderAsync( scene, camera );
// }

function animate() {
    requestAnimationFrame(animate);
    camera.position.x = 10 * Math.sin(Date.now() / 10000);
    camera.position.z = 10 * Math.cos(Date.now() / 10000);
    controls.update(); // 更新控制器
    renderer.renderAsync(scene, camera);
}
