---
title: controlnet模型下载
date: 2023-04-10
cover: https://cdn.wdtwo.com/anzhiyu/00413.jpg
category: [其他]
tags: [AI]
draft: false
---

- controlnet插件安装
- controlnet模型下载

<!--more-->

# controlnet插件安装

[下载地址](https://github.com/Mikubill/sd-webui-controlnet)
下载解压后放在`extensions`文件夹下
下载模型
[模型官网下载](https://huggingface.co/lllyasviel/ControlNet/tree/main/models)
下载后放在`\extensions\sd-webui-controlnet\models`文件夹下

完成后重启ui



| 模型名称 | 模型描述 |
| ---- | ---- |
| control_sd15_canny.pth | 适用于给线稿上色，或将图片转化为线搞后重新上色，比较适合人物。 |
| control_sd15_depth.pth | 创造具有景深的中间图，建筑人物皆可使用。
Stability的模型64×64深度，ControlNet模型可生成512×512深度图。 |
| control_sd15_hed.pth | 提取的图像目标边界将保留更多细节，此模型适合重新着色和风格化。 |
| control_sd15_mlsd.pth | 该模型基本不能识别人物的，但非常适合建筑生成，根据底图或自行手绘的线稿去生成中间图，然后再生成图片。 |
| control_sd15_normal.pth | 根据底图生成类似法线贴图的中间图，并用此中间图生成建模效果图。
此方法适用于人物建模和建筑建模，但更适合人物建模。 |
| control_sd15_openpose.pth | 根据图片生成动作骨骼中间图，然后生成图片，使用真人图片是最合适的，因为模型库使用的真人素材。 |
| control_sd15_scribble.pth | 使用人类涂鸦控制SD。该模型使用边界边缘进行训练，具有非常强大的数据增强功能，以模拟类似于人类绘制的边界线。 |
| control_sd15_seg.pth | 使用语义分割来控制SD，协议是ADE20k。
现在您需要输入图像，然后一个名为Uniformer的模型将为您检测分割。 |


参考描述
以后关于模型的描述为官方描述【机器翻译】，可供参考。
ControlNet/models/control_sd15_canny.pth
ControlNet+SD1.5 模型，用于使用精明边缘检测来控制 SD。
ControlNet/models/control_sd15_depth.pth
ControlNet+SD1.5模型使用Midas深度估计来控制SD。
ControlNet/models/control_sd15_hed.pth
ControlNet+SD1.5 型号使用 HED 边缘检测（软边缘）控制 SD。
ControlNet/models/control_sd15_mlsd.pth
ControlNet+SD1.5模型使用M-LSD线检测来控制SD（也可以与传统的Hough变换一起使用）。
ControlNet/models/control_sd15_normal.pth
ControlNet+SD1.5 模型使用法线贴图控制 SD。最好使用该 Gradio 应用程序生成的法线贴图。只要方向正确，其他法线贴图也可以工作（左边看红色，右边看蓝色，上看绿色，下看紫色）。
ControlNet/models/control_sd15_openpose.pth
ControlNet+SD1.5 模型，使用 OpenPose 姿势检测控制 SD。直接操纵姿势骨架也应该有效。
ControlNet/models/control_sd15_scribble.pth
ControlNet+SD1.5模型使用人类涂鸦控制SD。该模型使用边界边缘进行训练，具有非常强大的数据增强功能，以模拟类似于人类绘制的边界线。
ControlNet/models/control_sd15_seg.pth
ControlNet+SD1.5模型使用语义分割来控制SD。协议是ADE20k。
ControlNet/annotator/ckpts/body_pose_model.pth
第三方模型：Openpose的姿势检测模型。
ControlNet/annotator/ckpts/hand_pose_model.pth
第三方模型：Openpose的手部检测模型。
ControlNet/annotator/ckpts/dpt_hybrid-midas-501f0c75.pt
第三方模型：迈达斯深度估计模型。
ControlNet/annotator/ckpts/mlsd_large_512_fp32.pth
第三方模型：M-LSD检测模型。
ControlNet/annotator/ckpts/mlsd_tiny_512_fp32.pth
第三方模型：M-LSD的另一个较小的检测模型（我们不使用这个）。
ControlNet/annotator/ckpts/network-bsds500.pth
第三方模型：霍尔效应器件边界检测。
ControlNet/annotator/ckpts/upernet_global_small.pth
第三方模型：Uniformer 语义分割。









