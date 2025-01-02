import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;
let track, train;
let cameraTarget = new THREE.Vector3();
let isRiding = false;
const trainSpeed = 1.2;
let progress = 0;

init();
animate();

function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // 天空蓝
    const box = document.getElementById('canvas');
    const pos = {
        width: box.offsetWidth,
        height: box.offsetHeight,
    }
    // 创建相机
    camera = new THREE.PerspectiveCamera(45, pos.width / pos.height, 0.1, 1000);
    camera.position.set(0, 10, 20);

    // 创建渲染器
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setSize(pos.width, pos.height);
    document.getElementById('canvas').appendChild(renderer.domElement);

    // 添加坐标
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 添加环境光和平行光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // 创建地面
    createGround();
    // 创建轨道
    createTrack();
    // 创建小车
    createTrain();

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 添加开始按钮
    createStartButton();

    // 添加窗口大小调整监听
    window.addEventListener('resize', onWindowResize, false);
}

function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x338B22,
        roughness: .2,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
}

function createTrack() {
    // 创建更复杂的轨道点
    const trackPoints = [];
    for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
        const x = 30 * Math.cos(t);
        const z = 30 * Math.sin(t);
        // 更复杂的高度变化
        const y = 8 + 
                 5 * Math.sin(3 * t) + // 基础起伏
                 3 * Math.cos(5 * t) + // 添加更多波动
                 2 * Math.sin(7 * t);  // 添加细节变化
        
        // 添加螺旋效果
        const spiral = t * 0.5;
        trackPoints.push(new THREE.Vector3(
            x + 5 * Math.cos(spiral),
            y,
            z + 5 * Math.sin(spiral)
        ));
    }

    // 创建平滑的曲线
    const curve = new THREE.CatmullRomCurve3(trackPoints, true);
    
    // 创建轨道几何体 - 增加细分数以使曲线更平滑
    const trackGeometry = new THREE.TubeGeometry(curve, 200, 0.3, 12, true);
    const trackMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x808080,
        metalness: 0.8,
        roughness: 0.3
    });
    track = new THREE.Mesh(trackGeometry, trackMaterial);
    scene.add(track);

    // 添加支柱
    createTrackSupports(curve);
}

// 添加轨道支柱
function createTrackSupports(curve) {
    const numSupports = 24; // 支柱数量
    
    for (let i = 0; i < numSupports; i++) {
        const t = i / numSupports;
        const point = curve.getPointAt(t);
        
        // 创建支柱
        const pillarGeometry = new THREE.CylinderGeometry(0.2, 0.2, point.y, 8);
        const pillarMaterial = new THREE.MeshStandardMaterial({
            color: 0x505050,
            metalness: 0.7,
            roughness: 0.4
        });
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        
        // 设置支柱位置
        pillar.position.set(point.x, point.y / 2, point.z);
        scene.add(pillar);
    }
}

function createTrain() {
    // 创建小车体
    const trainGeometry = new THREE.BoxGeometry(2, 1, 1);
    const trainMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000,
        metalness: 0.6,
        roughness: 0.4
    });
    train = new THREE.Mesh(trainGeometry, trainMaterial);
    scene.add(train);
}

function createStartButton() {
    const button = document.createElement('button');
    button.textContent = '开始乘坐';
    button.className = 'ride-button';
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .ride-button {
            position: absolute;
            top: 80px;
            left: 20px;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            background: linear-gradient(45deg, #FF416C, #FF4B2B);
            border: none;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            font-family: 'Arial', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
            overflow: hidden;
            z-index: 1000;
        }

        .ride-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            background: linear-gradient(45deg, #FF4B2B, #FF416C);
        }

        .ride-button:active {
            transform: translateY(1px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .ride-button.riding {
            background: linear-gradient(45deg, #00b09b, #96c93d);
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .ride-button:not(:hover) {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
    
    button.addEventListener('click', () => {
        isRiding = !isRiding;
        button.textContent = isRiding ? '停止乘坐' : '开始乘坐';
        button.classList.toggle('riding');
    });
    
    document.body.appendChild(button);
}

function updateTrain() {
    if (!isRiding) return;

    // 更新进度 - 调整速度
    progress += trainSpeed * 0.001;
    if (progress > 1) progress = 0;

    // 获取当前位置和方向
    const point = track.geometry.parameters.path.getPointAt(progress);
    const tangent = track.geometry.parameters.path.getTangentAt(progress);

    // 更新小车位置
    train.position.copy(point);

    // 计算小车朝向，添加倾斜效果
    const up = new THREE.Vector3(0, 1, 0);
    const axis = new THREE.Vector3().crossVectors(up, tangent).normalize();
    const radians = Math.acos(up.dot(tangent));
    train.quaternion.setFromAxisAngle(axis, radians);

    // 更新相机位置，调整视角
    if (isRiding) {
        const cameraOffset = new THREE.Vector3(
            -tangent.x * 5,
            2,
            -tangent.z * 5
        );
        camera.position.copy(point).add(cameraOffset);
        cameraTarget.copy(point).add(tangent.multiplyScalar(5));
        camera.lookAt(cameraTarget);
    }
}

function onWindowResize() {
    camera.aspect = pos.width / pos.height;
    camera.updateProjectionMatrix();
    renderer.setSize(pos.width, pos.height);
}

function animate() {
    requestAnimationFrame(animate);
    updateTrain();
    renderer.renderAsync(scene, camera);
}
