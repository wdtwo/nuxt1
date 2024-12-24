---
title: css3动画
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/css3345636.jpg
category: 前端
tags: [css]
draft: false
---
animation
<!--more-->
#### 属性animation
| 属性 | 描述 |
| - | - | - |
| @keyframes | 规定动画 |
| animation  | 所有动画属性的简写属性，除了animation-play-state属性 |
| animation-name | 规定 @keyframes 动画的名称 |
|  animation-duration | 规定动画完成一个周期所花费的秒或毫秒。默认是0 |
| animation-timing-function | 规定动画的速度曲线。默认是"ease"  |
| animation-delay | 规定动画何时开始。默认是0 |
| animation-iteration-count | 规定动画被播放的次数。默认是 1。 (infinite永远) |
|  animation-direction | 规定动画是否在下一周期逆向地播放。默认是 "normal" |
| animation-play-state | 规定动画是否正在运行或暂停。默认是 "running"。(paused指定暂停动画) |

#### 语法
`animation-timing-function: value;`

| 值 | 描述 |
| - | - |
| linear  | 动画从头到尾的速度是相同的 |
| ease  | 默认。动画以低速开始，然后加快，在结束前变慢 |
| ease-in  | 动画以低速开始 |
| ease-out  | 动画以低速结束 |
| ease-in-out  | 动画以低速开始和结束 |
| cubic-bezier(n,n,n,n)  | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值 |
`animation-direction`

| 值 | 描述 |
| - | - |
| normal  | 默认值。动画按正常播放 |
| reverse  | 动画反向播放 |
| alternate  | 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放 |
| alternate-reverse  | 动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放 |
| initial  | 设置该属性为它的默认值。请参阅 initial |
| inherit  | 从父元素继承该属性。请参阅 inherit |

### 2D 转换方法
| 属性 | 描述 |
| - | - | - |
| transform | 适用于2D或3D转换的元素 |
| transform-origin | 允许您更改转化元素位置 |
#### 2D 转换方法
| 属性值 | 描述 |
| - | - |
| matrix(n,n,n,n,n,n)  | 定义 2D 转换，使用六个值的矩阵 |
| translate(x,y)  | 定义 2D 转换，沿着 X 和 Y 轴移动元素 |
| translateX(n)  | 定义 2D 转换，沿着 X 轴移动元素 |
| translateY(n)  | 定义 2D 转换，沿着 Y 轴移动元素 |
| scale(x,y)  | 定义 2D 缩放转换，改变元素的宽度和高度 |
| scaleX(n)  | 定义 2D 缩放转换，改变元素的宽度 |
| scaleY(n)  | 定义 2D 缩放转换，改变元素的高度 |
| rotate(angle)  | 定义 2D 旋转，在参数中规定角度 |
| skew(x-angle,y-angle)  | 定义 2D 倾斜转换，沿着 X 和 Y 轴 |
| skewX(angle)  | 定义 2D 倾斜转换，沿着 X 轴 |
| skewY(angle)  | 定义 2D 倾斜转换，沿着 Y 轴 |
### 3D 转换方法
#### 转换属性

| 属性 | 描述 |
| - | - |
| none | 定义不进行转换 |
| transform  | 向元素应用 2D 或 3D 转换 |
| transform-origin  | 允许你改变被转换元素的位置 |
| transform-style  | 规定被嵌套元素如何在 3D 空间中显示 |
| perspective  | 规定 3D 元素的透视效果 |
| perspective-origin  | 规定 3D 元素的底部位置 |
| backface-visibility  | 定义元素在不面对屏幕时是否可见 |
#### 3D 转换方法
| 属性值 | 描述 |
| - | - |
| matrix(n,n,n,n,n,n) | 定义 2D 转换，使用六个值的矩阵 |
| matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) | 定义 3D 转换，使用 16 个值的 4x4 矩阵 |
| translate(x,y) | 定义 2D 转换 |
| translate3d(x,y,z) | 定义 3D 转换 |
| translateX(x) |定义转换，只是用 X 轴的值 |
| translateY(y) | 定义转换，只是用 Y 轴的值 |
| translateZ(z) | 定义 3D 转换，只是用 Z 轴的值 |
| scale(x,y) | 定义 2D 缩放转换 |
| scale3d(x,y,z) | 定义 3D 缩放转换 |
| scaleX(x) | 通过设置 X 轴的值来定义缩放转换 |
| scaleY(y) | 通过设置 Y 轴的值来定义缩放转换 |
| scaleZ(z) | 通过设置 Z 轴的值来定义 3D 缩放转换 |
| rotate(angle) | 定义 2D 旋转，在参数中规定角度 |
| rotate3d(x,y,z,angle) | 定义 3D 旋转 |
| rotateX(angle) | 定义沿着 X 轴的 3D 旋转 |
| rotateY(angle) | 定义沿着 Y 轴的 3D 旋转 |
| rotateZ(angle) | 定义沿着 Z 轴的 3D 旋转 |
| skew(x-angle,y-angle) | 定义沿着 X 和 Y 轴的 2D 倾斜转换 |
| skewX(angle) | 定义沿着 X 轴的 2D 倾斜转换 |
| skewY(angle) | 定义沿着 Y 轴的 2D 倾斜转换 |
| perspective(n) | 为 3D 转换元素定义透视视图 |
