---
title: plyr.js视频流媒体HLS m3u8格式加密视频开发
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: [前端]
tags: [js,video]
draft: false
---
FFmpeg
<!--more-->
## 视频格式转换

`FFmpeg`
[download](http://www.ffmpeg.org/download.html)

[参考技术贴](https://www.jianshu.com/p/1579e716daed)

[官方演示](https://github.com/skyjilygao/demo-m3u8)

## 转换命令
```bash
ffmpeg -i video2.mp4 -c:v libx264 -hls_time 60 -hls_list_size 0 -c:a aac -strict -2 -f hls t/video2.m3u8
```
## 命令简单解释下：
1. -hls_time 60: 设置每片的长度，我这里是60秒，为一个片段。
2. -hls_list_size 0:设置播放列表保存的最多条目，我这里设置为0会保存有所片信息，默认值为5

## 前端代码

[参考技术贴](https://blog.csdn.net/chuxuan0215/article/details/90759669)

## video.js
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8 />
  <title>MP4ToM3U8</title>
  <link href="https://unpkg.com/video.js/dist/video-js.css" rel="stylesheet">
  <script src="https://unpkg.com/video.js/dist/video.js"></script>
  <script src="https://unpkg.com/videojs-contrib-hls/dist/videojs-contrib-hls.js"></script>
</head>
<body>
	<h1>播放</h1>
    <video id="my_video_1" class="video-js vjs-default-skin" controls preload="auto"
           data-setup='{}'>
      <source src="http://localhost:8080/t/video2.m3u8" type="application/x-mpegURL">
      <!-- video.js给的示例 -->
      <!--<source src="http://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8" type="application/x-mpegURL">-->
    </video>
</body>
</html>
```

## plyr
```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="plyr/plyr.css">
    <script src="plyr/plyr.min.js"></script>
    <script src="https://cdn.rawgit.com/video-dev/hls.js/18bb552/dist/hls.min.js"></script>
</head>
<body>
    <div class="container">
        <video controls crossorigin playsinline poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png"></video>
    </div>
    <script src="https://cdn.rawgit.com/video-dev/hls.js/18bb552/dist/hls.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const source = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
            const video = document.querySelector('video');
            const player = new Plyr(video, {
                captions: {active: true, update: true, language: 'en'}
            });

            if (!Hls.isSupported()) {
                video.src = source;
            } else {
                const hls = new Hls();
                hls.loadSource(source);
                hls.attachMedia(video);
                window.hls = hls;
                player.on('languagechange', () => {
                    setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
                });
            }
            window.player = player;
        });
    </script>
</body>
</html>
```

## php文件 暂时可以不用
```php
<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/plain');

    $file = 'ts/demo.m3u8';
    $str = file_get_contents($file);
    die($str);
    //http://localhost:8822/blob/demo.php
    //http://localhost:8822/blob/ts/demo.m3u8
   
?>
```

## 静态使用demo
```html 
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="author" content="GaryWang">
    <meta name='renderer' content='webkit'>
    <meta http-equiv='X-UA-Compatible' content='IE=Edge,chrome=1'>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title></title>
    <link rel="stylesheet" href="https://cdn.plyr.io/3.6.12/plyr.css" />
</head>
<body>
    <section class="wrap">
        <article>
            <video id="player" playsinline controls autoplay="autoplay" style="width: 100%;">
            </video>
        </article>
        <section class="list">
            <div>
                阅兵1
            </div>
            <div>
                阅兵2
            </div>
            <div>
                阅兵3
            </div>
            <div>
                阅兵4
            </div>
        </section>
    </section>
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="https://cdn.plyr.io/3.6.12/plyr.polyfilled.js"></script>
    <script type="text/javascript">
        var player = new Plyr('#player');
        function play(n) {
            // 配置播放源
            player.source = {
                type: 'video',
                title: 'title',
                sources: [
                    {
                        src: `./media/video${n}.mp4`,
                        type: 'video/mp4',
                        size: 720,
                    }
                ]
            }
        }
        play(0)
        // 切换播放源
        $('.list div').click(function(){
            var index = $(this).index();
            play(index)
        })
    </script>
</body>
</html>
```

### 加载ts视频
```php
<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: text/plain');
    $file = 'ts/demo.m3u8';
    $str = file_get_contents($file);
    die($str);
    //http://localhost:8822/blob/demo.php
    //http://localhost:8822/blob/ts/demo.m3u8
?>
```
```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.plyr.io/3.5.6/plyr.css" />
    <script src="https://cdn.plyr.io/3.5.6/plyr.js"></script>
    <script src="https://cdn.rawgit.com/video-dev/hls.js/18bb552/dist/hls.min.js"></script>
</head>
<body>
    <div class="container">
        <video controls crossorigin playsinline poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png"></video>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const source = './demo.php';
            const video = document.querySelector('video');
            const player = new Plyr(video, {
                captions: {active: true, update: true, language: 'en'}
            });
            if (!Hls.isSupported()) {
                video.src = source;
            } else {
                const hls = new Hls();
                hls.loadSource(source);
                hls.attachMedia(video);
                window.hls = hls;
                player.on('languagechange', () => {
                    setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
                });
            }
            window.player = player;
        });
    </script>
</body>
</html>
```








