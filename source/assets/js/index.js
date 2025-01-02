import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;
let gameBoard = [];
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
let currentPiece;
let currentPiecePosition = { x: 0, y: 0 };
let gameOver = false;
let score = 0;

// 方块形状定义
const SHAPES = {
    I: [
        [1, 1, 1, 1]
    ],
    O: [
        [1, 1],
        [1, 1]
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1]
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0]
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1]
    ],
    J: [
        [1, 0, 0],
        [1, 1, 1]
    ],
    L: [
        [0, 0, 1],
        [1, 1, 1]
    ]
};

// 方块颜色
const COLORS = {
    I: 0x00f0f0,
    O: 0xf0f000,
    T: 0xa000f0,
    S: 0x00f000,
    Z: 0xf00000,
    J: 0x0000f0,
    L: 0xf0a000
};

init();
animate();

function init() {
    // 初始化场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x999999);
    const box = document.getElementById('canvas');
    // 初始化相机
    camera = new THREE.PerspectiveCamera(75, box.offsetWidth / box.offsetHeight, 0.1, 1000);
    camera.position.set(5, 20, 20);
    camera.lookAt(5, 10, 0);

    // 初始化渲染器
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setSize(box.offsetWidth, box.offsetHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // 初始化游戏板
    initGameBoard();

    // 创建新方块
    spawnNewPiece();

    // 添加键盘控制
    document.addEventListener('keydown', handleKeyPress);

    // 开始游戏循环
    setInterval(gameLoop, 1000);
}

function initGameBoard() {
    // 初始化游戏板数组
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        gameBoard[y] = [];
        for (let x = 0; x < BOARD_WIDTH; x++) {
            gameBoard[y][x] = null;
        }
    }

    // 创建游戏板边界
    const boardGeometry = new THREE.BoxGeometry(BOARD_WIDTH + 2, BOARD_HEIGHT + 2, 1);
    const boardMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        transparent: true,
        opacity: 0.3
    });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.set(BOARD_WIDTH / 2 - 0.5, BOARD_HEIGHT / 2 - 0.5, -0.5);
    scene.add(board);
}

function spawnNewPiece() {
    const shapes = Object.keys(SHAPES);
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    currentPiece = {
        shape: SHAPES[randomShape],
        color: COLORS[randomShape]
    };
    currentPiecePosition = {
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(currentPiece.shape[0].length / 2),
        y: BOARD_HEIGHT - currentPiece.shape.length
    };

    if (!canMoveTo(currentPiecePosition.x, currentPiecePosition.y)) {
        gameOver = true;
        alert('Game Over! Score: ' + score);
    }
}

function createBlock(color) {
    const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const material = new THREE.MeshStandardMaterial({ color: color });
    return new THREE.Mesh(geometry, material);
}

function updateBoard() {
    // 清除所有现有方块
    scene.children = scene.children.filter(child => !(child instanceof THREE.Mesh) || child.userData.isBoard);

    // 绘制固定的方块
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (gameBoard[y][x]) {
                const block = createBlock(gameBoard[y][x]);
                block.position.set(x, y, 0);
                scene.add(block);
            }
        }
    }

    // 绘制当前移动的方块
    if (currentPiece) {
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    const block = createBlock(currentPiece.color);
                    block.position.set(
                        currentPiecePosition.x + x,
                        currentPiecePosition.y + y,
                        0
                    );
                    scene.add(block);
                }
            }
        }
    }
}

function canMoveTo(newX, newY) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                const boardX = newX + x;
                const boardY = newY + y;

                if (boardX < 0 || boardX >= BOARD_WIDTH || 
                    boardY < 0 || boardY >= BOARD_HEIGHT ||
                    gameBoard[boardY][boardX]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function rotatePiece() {
    const rotated = [];
    for (let x = 0; x < currentPiece.shape[0].length; x++) {
        rotated[x] = [];
        for (let y = currentPiece.shape.length - 1; y >= 0; y--) {
            rotated[x].push(currentPiece.shape[y][x]);
        }
    }
    
    const oldShape = currentPiece.shape;
    currentPiece.shape = rotated;
    
    if (!canMoveTo(currentPiecePosition.x, currentPiecePosition.y)) {
        currentPiece.shape = oldShape;
    }
}

function handleKeyPress(event) {
    if (gameOver) return;

    switch (event.key) {
        case 'ArrowLeft':
            if (canMoveTo(currentPiecePosition.x - 1, currentPiecePosition.y)) {
                currentPiecePosition.x--;
            }
            break;
        case 'ArrowRight':
            if (canMoveTo(currentPiecePosition.x + 1, currentPiecePosition.y)) {
                currentPiecePosition.x++;
            }
            break;
        case 'ArrowDown':
            if (canMoveTo(currentPiecePosition.x, currentPiecePosition.y - 1)) {
                currentPiecePosition.y--;
            }
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
    }
    updateBoard();
}

function checkLines() {
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        let complete = true;
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (!gameBoard[y][x]) {
                complete = false;
                break;
            }
        }
        if (complete) {
            // 移除完整的行
            for (let y2 = y; y2 < BOARD_HEIGHT - 1; y2++) {
                gameBoard[y2] = [...gameBoard[y2 + 1]];
            }
            gameBoard[BOARD_HEIGHT - 1] = new Array(BOARD_WIDTH).fill(null);
            score += 100;
            updateScore();
        }
    }
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function gameLoop() {
    if (gameOver) return;

    if (canMoveTo(currentPiecePosition.x, currentPiecePosition.y - 1)) {
        currentPiecePosition.y--;
    } else {
        // 固定当前方块
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    gameBoard[currentPiecePosition.y + y][currentPiecePosition.x + x] = currentPiece.color;
                }
            }
        }

        checkLines();
        spawnNewPiece();
    }
    updateBoard();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.renderAsync(scene, camera);
}

// 添加分数显示
const scoreDiv = document.createElement('div');
scoreDiv.id = 'score';
scoreDiv.style.position = 'absolute';
scoreDiv.style.top = '20px';
scoreDiv.style.left = '20px';
scoreDiv.style.color = 'white';
scoreDiv.style.fontSize = '24px';
document.body.appendChild(scoreDiv);
updateScore();
