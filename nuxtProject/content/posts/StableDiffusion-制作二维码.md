---
title: StableDiffusion-制作二维码
date: 2023-07-21 08:49:21
cover: https://cdn.wdtwo.com/anzhiyu/00413.jpg
category: [其他]
tags: [StableDiffusion]
draft: false
---

[模型包](https://civitai.com/models/7371)
[vae](https://huggingface.co/WarriorMama777/OrangeMixs/blob/main/VAEs/orangemix.vae.pt)

[thinkdiffusion教程](https://learn.thinkdiffusion.com/creating-qr-codes-with-controlnet/)

[QRBTF]([QRBTF](https://qrbtf.com/))
[二维码制作文档](https://antfu.me/posts/ai-qrcode-101)
[ControlNet-v1-1模型下载s](https://huggingface.co/lllyasviel/ControlNet-v1-1/tree/main)
[生成二维码](https://quickqr.art/)
[二维码工具包](https://qrcode.antfu.me/)
[二维码制作教程](https://learn.thinkdiffusion.com/creating-qr-codes-with-controlnet/#step-2-create-art-for-combining-with-the-qr-code)

<!--more-->

## 首先生成一张图片 text2img

```bash
(1) 模型 revAnimated_v122
(2) 采样方法 DPM++ 2S a Karras
(3) 采样步数 20
(4) 尺寸 768 x 768
(5) 提示词相关性CFG 11
```
### 正面提示词
```bash
futobot, cyborg, ((masterpiece),(best quality),(ultra-detailed), (full body:1.2), 1 female, solo, hood up, upper body, mask, 1 girl, female focus, black gloves, cloak, long sleeves
```
### 负面提示词
```bash
paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans, nsfw, nipples, (((necklace))), (worst quality, low quality:1.2), watermark, username, signature, text, multiple breasts, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, bad feet, single color, ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), (((tranny))), (((trans))), (((trannsexual))), (hermaphrodite), extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), (((disfigured))), (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), (missing legs), (((extra arms))), (((extra legs))), mutated hands,(fused fingers), (too many fingers), (((long neck))), (bad body perspect:1.1)
```

## 生成以后点图生图
`提示词不变`
```bash
(1) 采样模型 DPM++ 2S a Karras,
(2) 采样步数 60
(3) 尺寸 768 x 768
(4) 提示词相关性 11
(5) 重绘幅度And a Denoising strength as 1.0
```
#### controlnet1
- 用原图 识别身体姿势
- 像素优化

```
Control Type
openpose
预处理器
openpose_full
模型
control_sd15_openpose

Control Weight
0.4
Starting Control Step
0
Ending Control Step
1

Control Mode
Balanced
画面缩放模式
Resize and Fill
```

#### controlnet2
- 用二维码
- 像素优化

```
Control Type
Tile
预处理器
tile_resample
模型
control_v11f1e_sd15_tile

Control Weight
0.8
Starting Control Step
0.2
Ending Control Step
1

Control Mode
Balanced
画面缩放模式
Resize and Fill
```

## 更大的自由度

### 正面提示词
```bash
Lady gaga in the style of Alberto Seveso, 8k, ultra detailed, (masterpiece:1.5)
```
### 负面提示词
```bash
blurry, lowres, text, nsfw
```
#### controlnet1
```
上传二维码

预处理器 
inpaint_global_harmonious
模型
control_v1p_sd15_brightness
Control weight
0.35
```
#### controlnet2
```
上传二维码

预处理器
inpaint_global_harmonious
模型
control_v11f1e_sd15_tile
Control Weight
0.5
starting Control Step
0.35
ending control step
0.70
```

## 其他text2img demo

### 狮子
#### 正面提示词
```
Full Photo shot of a lion, Yoji Shinkawa style, Jean-baptiste Monge, general plan, central composition, entirely on a sheet, Ink painting, expressive painting, watercolor, bold brushstrokes, Concept art, orange, (purple:1.2), gray and white, stylize, intricate detail, 8k, transparent background, (white background:1.4), 3D vector
```
#### 负面提示词
```
Watermark, Text, censored, deformed, bad anatomy, disfigured
```
### 城市
#### 正面提示词
```
8k, RAW photo, best quality, (masterpiece:1.2), (realistic, photo-realistic:1.37), octane render, ultra high res, ultra-detailed , professional lighting, photon mapping, radiosity, physically-based rendering, ue5, ((island sanctuary)), ((ancient fallen kingdom)), ((drowned city))
```
#### 负面提示词
```
cartoon, painting, illustration, (worst quality, low quality, normal quality:2), nsfw
```



