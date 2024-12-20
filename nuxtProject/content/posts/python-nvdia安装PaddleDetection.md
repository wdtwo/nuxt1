---
title: nvdia安装PaddleDetection
date: 2023-06-30 21:17:56
cover: https://cdn.wdtwo.com/anzhiyu/lianjie038036.jpg
category: [其他]
tags: [PaddleDetection]
draft: false
---
[英伟达cuda下载地址](https://developer.nvidia.com/cuda-toolkit-archive)

下载对应版本后先解压

精简模式下一步

同意下一步

[cudnn下载地址](https://developer.nvidia.com/rdp/cudnn-download)

目录
在这个目录下执行两个命令 都为pass则成功

```bash
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.7\extras\demo_suite

.\deviceQuery.exe
.\bandwidthTest.exe

```

或者用这个命令查看cuda版本

```js
nvcc -V
```

安装好cuda后安装paddledetection
```bash
python -m pip install paddlepaddle-gpu==2.4.2.post117 -f https://www.paddlepaddle.org.cn/whl/windows/mkl/avx/stable.html
```

```bash
python

import paddle.fluid
paddle.fluid.install_check.run_check()

```
出现`Your Paddle Fluid is installed successfully! Let's start deep Learning with Paddle Fluid now`则表示成功


下载库文件
```bash
https://github.com/PaddlePaddle/PaddleDetection
```
安装依赖库
```bash
pip install -r requirements.txt

python setup.py install

```
安装Microsoft Visual C++ 14.0 or greater is required.
```bash
https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/
```
安装cocoapi
```bash
pip install git+https://github.com/philferriere/cocoapi.git#subdirectory=PythonAPI
```
管理员权限进入
```bash
D:\github\PaddleDetection\cocoapi-master\PythonAPI>
```
执行安装
```bash
python setup.py build_ext install
```
 
安装测试
```bash
python ppdet/modeling/tests/test_architectures.py
```







