---
title: lora模型下载与安装
date: 2023-02-17 14:48:24
image: https://cdn.wdtwo.com/anzhiyu/00413.jpg
category: 
- 其他
tags: 
- StableDiffusion
---

lora模型下载与安装

- install时间过长可能是网络问题 可以选择手动下载

运行模型后点击 扩展 -> 可用 -> 加载自 -> `Allows the Web UI to use networks (LoRA) trained by their scripts to generate images.` -> install

下载好后 在已安装选项中出现 `sd-webui-additional-newworks`
点击应用并重启页面
重启后顶部出现 `additional newworks` 选项卡

在 `additional newworks` 中选择模型后的刷新按钮 出现模型链接
在文生图中打开底部additional newworks 
model中选择lora模型weight设置采用比例
如果没有则点击底部refresh models刷新

1. 访问地址 [访问地址](https://civitai.com/)
2. 选择`LORA`标签
3. 找一个喜欢的模型下载(.pt)
4. 放到这个目录下 stable-diffusion-webui -> models -> Lora
5. 在stableDiffusion中先选择模型
6. 点击设置,找到模型的VAE,选择下载的模型(.pt) 点保存设置
7. 输入完咒语以后点击生成按钮下面的粉色按钮,选择lora标签,再选择使用的模型文件


