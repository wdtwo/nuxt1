---
title: FFMPEG 视频操作
date: 2023-05-15 14:29:26
cover: https://cdn.wdtwo.com/anzhiyu/ffmpeg0860456.png
category: [后端]
tags: [ffmpeg]
draft: false
---

- FFMPEG 视频
- 新版本命令
- m3u8视频合并
- 视频格式转换
- 合并视频
- 常用命令如下
- 其他指令
- 参数说明
- 腾讯视频qlv转mp4
- 文件转换
  
<!--more-->

## FFMPEG 视频
https://teddysun.com/486.html

[ffmpeg官网](https://ffmpeg.org/download.html)
[英伟达CUDA驱动](https://developer.nvidia.com/cuda-downloads)

## 调用显卡
查询ffmpeg是否支持cuda

1. -hwaccel cuvid：指定使用cuvid硬件加速
2. -c:v h264_cuvid：使用h264_cuvid进行视频解码
3. -c:v h264_nvenc：使用h264_nvenc进行视频编码
4. -vf scale_npp=1280:-1：指定输出视频的宽高，注意，这里和软解码时使用的-vf scale=x:x不一样

```bash
ffmpeg -hwaccels
```
测试命令
```bash
ffmpeg -hwaccel cuvid -c:v h264_cuvid -i 0.mp4 -c:v h264_nvenc -y 00.mp4
```

将当前目录下的0.mp4转成00.mp4
```bash
ffmpeg -hwaccel cuvid -c:v h264_cuvid -i 0.mp4 -c:v h264_nvenc -r 15 -b 500k -y 00.mp4
```
将当前目录下的0.mp4转成00.mp4，并指定输出帧率为15（-r 15），比特率为500k（-b 500k）
```bash
ffmpeg -hwaccel cuvid -c:v h264_cuvid -i <input> -c:v h264_nvenc -b:v 2048k -vf scale_npp=1280:-1 -y <output>
```

## 无损压缩 调用显卡

- c:v hevc_nvenc 指定使用 NVIDIA 的 HEVC 硬件编码器。
- preset slow 设置编码器的预设值，控制编码速度和质量的平衡。
- b:v 0 -cq 28 设置恒定质量模式，cq 值类似于 CRF 值。
- b:a 128K 设置音频比特率。
  
```bash
# hevc_nvenc 是英伟达显卡的硬件编码器
ffmpeg -i input.mp4 -c:v hevc_nvenc -preset slow -crf 0 output.mp4
ffmpeg -i input.mp4 -c:v hevc_nvenc -preset slow -crf 28 -b:a 128K output2.mp4
```

多显卡 向不同GPU提交转码任务
显卡0
```bash
ffmpeg -hwaccel cuvid -hwaccel_device 0 -c:v h264_cuvid -i <input> -c:v h264_nvenc -b:v 2048k -vf scale_npp=1280:-1 -y <output>
```
显卡1
```bash
ffmpeg -hwaccel cuvid -hwaccel_device 1 -c:v h264_cuvid -i <input> -c:v h264_nvenc -b:v 2048k -vf scale_npp=1280:-1 -y <output>
```
说明：
-hwaccel_device N：指定某颗GPU执行转码任务，N为数字



## 视频操作

### 参数说明：

- -vcodec xvid 使用xvid压缩
- -s 320x240 指定分辨率
- -r fps 设置帧频 缺省25
- -b <比特率> 指定压缩比特

- -acodec aac 设定声音编码
- -ac <数值> 设定声道数，1就是单声道，2就是立体声
- -ar <采样率> 设定声音采样率，PSP只认24000
- -ab <比特率> 设定声音比特率
- -vol <百分比> 设定音量

- -y（覆盖输出文件

- -t duration 设置纪录时间 hh:mm:ss[.xxx]格式的记录时间也支持
- -ss position 搜索到指定的时间 [-]hh:mm:ss[.xxx]的格式也支持
- -title string 设置标题
- -author string 设置作者
- -copyright string 设置版权
- -hq 激活高质量设置

- -aspect aspect 设置横纵比 4:3 16:9 或 1.3333 1.7777
- -croptop size 设置顶部切除带大小 像素单位
- -cropbottom size -cropleft size -cropright size
- -padtop size 设置顶部补齐的大小 像素单位
- -padbottom size -padleft size -padright size -padcolor color 设置补齐条颜色(hex,6个16进制的数，红:绿:兰排列，比如 000000代表黑色)
- -bt tolerance 设置视频码率容忍度kbit/s
- -maxrate bitrate设置最大视频码率容忍度
- -minrate bitreate 设置最小视频码率容忍度
- -bufsize size 设置码率控制缓冲区大小
- -vcodec codec 强制使用codec编解码方式。 如果用copy表示原始编解码数据必须被拷贝。
- -sameq 使用同样视频质量作为源（VBR）
- -pass n 选择处理遍数（1或者2）。两遍编码非常有用。第一遍生成统计信息，第二遍生成精确的请求的码率
- -passlogfile file 选择两遍的纪录文件名为file
- -map file:stream 设置输入流映射
- -debug 打印特定调试信息

### 视频格式转换
```bash
ffmpeg -i out.ogv -vcodec h264 out.mp4
ffmpeg -i out.ogv -vcodec mpeg4 out.mp4
ffmpeg -i out.ogv -vcodec libxvid out.mp4
ffmpeg -i out.mp4 -vcodec wmv1 out.wmv
ffmpeg -i out.mp4 -vcodec wmv2 out.wmv
```

### 视频剪切
1. -ss 指定从什么时间开始
2. -t 指定需要截取多长时间
3. -i 指定输入文件
 
```bash
ffmpeg -ss 00:00:00 -t 00:00:30 -i test.mp4 -vcodec copy -acodec copy output.mp4
```

### 合并视频
```bash
//进行视频的合并
ffmpeg -f concat -i list.txt -c copy concat.mp4
```
在list.txt文件中，对要合并的视频片段进行了描述。
```txt
file 'split.mp4'
file 'split1.mp4'
```

### 帧间编码转换为帧内编码 文件会大很多
- -i 输入，后面是空格，紧跟着就是输入视频文件；
- INPUT 输入文件；
- -sameq 表示保持同样的视频质量；
- -intra， 帧内编码；
- OUTPUT 输出文件名。

```bash
ffmpeg -i ./MyVideo.mpg -sameq -intra ./temp.mpg
```
这个命令的结果文件就是./temp.mpg.这个文件的视频和./MyVideo.mpg是一样的，但是你会发现这个文件会比./MyVideo.mpg大很多倍，原因就是转换前一般采用的帧间编码，转换后变成了帧内编码。这里我们说是一般，原因是有些视频文件本身就采用了帧内编码。
经过这样的处理后，我们就可以精确的剪切视频了。

### 新版本命令
```bash
ffmpeg -i output.mp4 -strict -2  -qscale 0 -intra keyoutput.mp4
```

### m3u8视频合并
```bash
ffmpeg -i xxx.m3u8 -vcodec copy -acodec copy xxx.mp4
```

### 去掉视频中的音频
-an: 去掉音频；-vcodec:视频选项，一般后面加copy表示拷贝
```bash
ffmpeg -i input.mp4 -vcodec copy -an output.mp4
```

### 音视频合成
-y 覆盖输出文件
```bash
ffmpeg -y –i input.mp4 –i input.mp3 –vcodec copy –acodec copy output.mp4
ffmpeg -i 01v.mp4 -i 01a.m4a -c:v copy -c:a aac -strict experimental 01.mp4
```

### FFmpeg批量提取视频某一帧作为封面
```bash
ffmpeg -i input.flv -ss 00:00:02 -frames:v 1 out.png
```

### 将视频提取10帧
```bash
ffmpeg -i test.mp4 -r 10 %06d.jpg;
```

### 生产视频的每分钟的缩略图：
```bash
ffmpeg -i film.mp4 -vf fps=1/60 img%03d.jpg
```
1. 上面这个-vf fps=1/60，就是1分钟的意思，比如说视频25分钟，会生成25个jpg图片，分别是img001，img002....，
2. 当fps=1的时候：就代表每一秒截取个缩略图
3. 而fps=1/600：则代表每10分钟截取一个画面

### 另外也可以按照关键帧提取画面依次产生画面保存起来，可以按照以下的参数：

```bash
ffmpeg -skip_frame nokey -i my-film.mp4 -vsync 0 -f image2 myfilm/my-film-%06d.png
```
1. `-vsync 0` 参数避免了需要指定帧速率
2. `my-file-%06d.png` 保存的文件名字是6个数字


### 视频截图
-s 设置分辨率; -f 强迫采用格式fmt;
```bash
ffmpeg –i test.mp4 –f image2 -t 0.001 -s 320x240 image-%3d.jpg
```

### 视频分解为图片
-r 指定截屏频率
```bash
ffmpeg –i test.mp4 –r 1 –f image2 image-%3d.jpg
```

### 将图片合成视频
```bash
ffmpeg -f image2 -i image%d.jpg output.mp4
```

### 视频拼接
```bash
ffmpeg -f concat -i filelist.txt -c copy output.mp4
```

### 旋转视频
```bash
ffmpeg -i input.mp4 -vf rotate=PI/2 output.mp4
```

### 缩放视频
iw 是输入的宽度， iw/2就是一半;-1 为保持宽高比
```bash
ffmpeg -i input.mp4 -vf scale=iw/2:-1 output.mp4
```

### 视频变速
```bash
ffmpeg -i input.mp4 -filter:v setpts=0.5*PTS output.mp4
```

### 音视频同时变速，但是音视频为互倒关系
```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" output.mp4
```

### 视频添加水印
main_w-overlay_w-10 视频的宽度-水印的宽度-水印边距；
```bash
ffmpeg -i input.mp4 -i logo.jpg -filter_complex [0:v][1:v]overlay=main_w-overlay_w-10:main_h-overlay_h-10[out] -map [out] -map 0:a -codec:a copy output.mp4
```

### 视频压缩
```bash
ffmpeg -i a.mp4 -r 10 -b:a 32k 1.mp4
```

### 截取视频局部
```bash
ffmpeg -i in.mp4 -filter:v "crop=out_w:out_h:x:y" out.mp4
```

### 截取视频局部
```bash
// 截取部分视频，从[80,60]的位置开始，截取宽200，高100的视频
ffmpeg -i in.mp4 -filter:v "crop=80:60:200:100" -c:a copy out.mp4
```

### 截取右下角的四分之一
```bash
ffmpeg -i in.mp4 -filter:v "crop=in_w/2:in_h/2:in_w/2:in_h/2" -c:a copy out.mp4
```

### 截去底部40像素高度
```bash
ffmpeg -i in.mp4 -filter:v "crop=in_w:in_h-40" -c:a copy out.mp4
```

### 调整视频大小(resize)是改变视频的宽度和高度
使用-s参数实现，语法：`ffmpeg  -i  input_file  -s  wxh  output_file (wxh是宽x高，比如320x240)`
```bash
ffmpeg -i demo.mp4 -s 960x540 demo1.mp4
```

### 视频裁剪
视频裁剪使用crop视频滤镜，它可以把视频从指定的x、y位置裁剪成指定的w、h。坐标系是基于左上点开始的。
```bash
ffmpeg  -i  intput.avi  -vf  crop=iw/2:ih/2  output.avi 
```
### 视频裁剪
视频裁剪使用crop视频滤镜，它可以把视频从指定的x、y位置裁剪成指定的w、h。坐标系是基于左上点开始的。
```bash
ffmpeg -hwaccel cuda -i 输入视频.mp4 -vf "crop=宽度:高度:起始X坐标:起始Y坐标" -c:v h264_nvenc 输出视频.mp4
ffmpeg -hwaccel cuda -i intput.avi -vf crop=iw/2:ih/2 output.avi 
```

### mp4转h.264
```bash
ffmpeg -i input.mp4 -vcodec h264 output.mp4
```

### 腾讯视频qlv转mp4
```bash
copy/B 7*.tdl Video001.mp4
```

### 单个文件
```bash
ffmpeg -i "input.flv" -c copy "output.mp4"
```

### 批量转换
```bash
for %i in (*.flv) do ffmpeg -i "%i" -c copy "%~ni.mp4"
```

### 某些flv文件转换成mp4时会报错，这时可尝试以下代码
```bash
ffmpeg -i filename.flv -c:v libx264 -crf 19 -strict experimental filename.mp4
```

### flv/mp4文件的合并
```bash
ffmpeg -f concat -safe 0 -i combine.txt -c copy output.mp4
```
### combine.txt
```bash
file '文件1.mp4'
file '文件2.mp4'
file '文件3.mp4'
file '文件4.mp4'
file '文件5.mp4'
```


## 音频操作

### 音频变速
```bash
ffmpeg -i input.mp3 -filter:a atempo=2.0 output.mp3
```

### mp3剪切
```bash
ffmpeg -y -i input.wav -ss 00:00:00 -t 00:08:52 -acodec copy output_mp3.wav
```

### 提取视频中的音频
-vn: 去掉视频；-acodec: 音频选项， 一般后面加copy表示拷贝
```bash
ffmpeg -i input.mp4 -acodec copy -vn output.wma
```

### 音频转换
```bash
ffmpeg -i qishi.mp3 -acodec aac qishi.aac
ffmpeg -i qishi.acc -acodec mp3 qishi.mp3
```

### m4a添加封面
```bash
ffmpeg -i 1.m4a -i 1.png -map 0 -map 1 -c copy -disposition:v:0 attached_pic output.m4a
```


## gif操作
尽量不要使用swscale做缩放了，尽量使用ffmpeg里的avfilter的滤镜。

### 查看图片信息
```bash
ffprobe demo.gif    
```

### 将视频转为gif
```bash
ffmpeg -i input.mp4 out.gif 
```

### 将 GIF 转化为 MP4
```bash
ffmpeg -f gif -i test.gif test.mp4
# 也可以将 gif 转为其他视频格式
ffmpeg -f gif -i test.gif test.mpeg
ffmpeg -f gif -i test.gif test.mkv
```

### 转化高质量 GIF
默认转化是中等质量模式，若要转化出高质量的 gif，可以修改比特率
```bash
ffmpeg -i test.mp4 -b:v 2048k test.gif
```

### 设置截取时间
1. -ss -ss代表的是开始时间，时:分:秒.毫秒的格式，比如00:12:14.500。
2. -t是要截取的时长,单位秒
```bash
ffmpeg -i input.mp4 -ss 73.5 -t 12 out.gif
ffmpeg -i input.mp4 -ss 00:01:13.500 -t 12 out.gif
```

### 将视频转为gif
-pix_fmt 指定编码
```bash
ffmpeg -i input.mp4 -ss 0:0:30 -t 10 -s 320x240 -pix_fmt rgb24 output.gif
```

### 将视频前30帧转为gif
```bash
ffmpeg -i input.mp4 -vframes 30 -f gif output.gif
```

### gif压缩

#### 降低动图的帧率
用-r参数来降低征率，比如原始的input.mp4是30帧的，可以用-r 15来降低成15帧。
-r参数一定要放到-i参数后面，它在前在后的作用是不一样的
具体效果也是很明显的，生成的文件大小从原来的86MB下降到56MB，具体命令行如下：
```bash
ffmpeg -i input.mp4 -ss 00:01:13.500 -t 12 -r 15 out1.gif
ffmpeg -i input.gif -r 8 out1.gif
```

#### 调整画面分辨率
比如原始视频是1080p的，我们可以将其减低到480p，从而显著降低最终的gif文件大小，
这里可以使用-s参数，后面跟具体的分辨率大小比如480x272 具体命令如下：
```bash
ffmpeg -i input.mp4 -ss 00:01:13.500 -t 12 -s 480x272 out2.gif 
ffmpeg -i input.gif -s 320x180 out2.gif
```

#### -vf等比例缩放
scale后面可以指定具体的分辨率宽:高，作用同-s，也可以只指定宽或者高，
另一者用-d代替，ffmpeg就会自动缩放，保持原比例
```bash
ffmpeg -i input.mp4 -ss 00:01:13.500 -t 12 -vf "scale=480:-1" out3.gif  
```

#### 降分辨率的同时降帧率
将上面两种方式结合到一起，命令行如下：
```bash
ffmpeg -i input.mp4 -ss 00:01:13.500 -t 12 -vf "scale=480:-1" -r 15 out4.gif 
```

#### 裁剪
裁剪区域的宽度为180，高度为180，
从以左上角为原点、x轴向右偏移量为100、y轴向下偏移量为0的位置开始裁剪。
```bash
ffmpeg -i input.gif -vf "crop=180:180:100:0" output.gif
```

#### 滤镜的排列组合，实现各种各样复杂的功能
FFmpeg滤镜共包含以下3个层级：
filter -> filterchain -> filtergraph 也即 滤镜 -> 滤镜链 -> 滤镜图
多个滤镜可以串联成一条滤镜链，多条滤镜链可以组合成一个滤镜图。

1. 首先，使用split滤镜将输入流分割为两个流[main]和[tmp] (你可以理解为copy了一份)；
2. 将其中一个流[tmp]先通过crop滤镜裁剪出左半部分；
3. 将步骤2的输出再经过hflip滤镜进行水平翻转，并输出为[flip]；
4. 把步骤3的输出[flip]叠加到[main]的右半部分。
   
```bash
ffmpeg -i input.gif -vf "split[main][tmp];[tmp]crop=iw/2:ih:0:0,hflip[flip];[main][flip]overlay=W/2:0" output.gif
```

### 高质量gif优化
[原文链接](https://blog.csdn.net/qq_40212938/article/details/113060064)
整理资料
经过上面的分析，视频转gif，
考虑大小使用单一色板，这样对图片压缩好，但是相对使用色板难度较高，如果使用原图生成的色板，可能会失去部分色彩。并且要跑两次程序，一次生成色板，一次抖色。
考虑失真情况，每张图生成一个色板，这个是screentogif使用的方案。效果好，色彩优异。
综合考虑，使用rgb8的色板，进行抖色。这个方案会有噪点，但是体积控制较好，色彩比格式工厂优异

命令行指令
考虑大小版本
```bash
ffmpeg -i “H:\样本.mp4” -s 320x180 -vf “[in]scale=320x180,split[split1][split2];[split1]palettegen[pal];[split2][pal]paletteuse” H:\FFOutput\test.gif
```
注意-s的尺寸务必与scale一致，否则会造成二次损失，另外如果帧数超过300建议先生成色板再抖色编码，速度很慢

考虑色彩版本
```bash
ffmpeg -i “H:\样本.mp4” -s 320x180 -vf “[in]scale=320x180,split[split1][split2];[split1]palettegen=stats_mode=diff[pal];[split2][pal]paletteuse=new=1:diff_mode=rectangle” H:\FFOutput\test.gif
```
2021/4/7分析源码后调整因为矩阵扫描会用上一次调色板，调试板是不能变化的，修复bug问题
```bash
ffmpeg -i “H:\样本.mp4” -s 320x180 -vf “[in]scale=320x180,split[split1][split2];[split1]palettegen=stats_mode=single[pal];[split2][pal]paletteuse=new=1” H:\FFOutput\test.gif
```
注意事项 -s要与scale一致，可以超过300帧速度相对慢


#### 添加文字
```bash
ffmpeg -i input.gif -vf "drawtext=fontsize=30:text='吔屎啦你':fontcolor=white:x=25:y=100:fontfile=JingNanYuanMoTi/KNFONTYUANMO-2.otf" output.gif
```

#### 多宫格处理
1. 首先，通过-i 选项输入4张待处理的静态图素材；
2. 其次，通过-filter_complex 选项创建一个复杂滤镜；
3. 该复杂滤镜首先创建了一个360x360的空白画布，并指定输出流的标签为[base]；
4. [0:v]表示取第一个输入流(第1张静态图)，然后使用overlay滤镜，将第1张静态图叠加到左上角原点的位置(也即左上角)，并指定叠加处理输出流的标签为[tmp1]；
5. 继续使用overlay滤镜，将第2张静态图叠加到以左上角原点，x轴向右偏移量为180、y轴向下偏移量为0的位置(也即右上角)，并指定叠加处理输出流的标签为[tmp2]；
6. 继续使用overlay滤镜，将第3张静态图叠加到以左上角原点，x轴向右偏移量为0、y轴向下偏移量为180的位置(也即左下角)，并指定叠加处理输出流的标签为[tmp3]；
7. 继续使用overlay滤镜，将第4张静态图叠加到以左上角原点，x轴向右偏移量为180、y轴向下偏移量为180的位置(也即右下角)；
8. 将全部处理完成的内容输出到一个名为“output.jpg”的文件
   
```bash
ffmpeg -i 1.jpg -i 2.jpg -i 3.jpg -i 4.jpg -filter_complex "nullsrc=size=360x360[base];[base][0:v]overlay=0:0[tmp1];[tmp1][1:v]overlay=180:0[tmp2];[tmp2][2:v]overlay=0:180[tmp3];[tmp3][3:v]overlay=180:180" -frames:v 1 output.jpg
```