---
title: hexo设置静态文件目录
date: 2023-07-26 17:33:00
cover: https://cdn.wdtwo.com/anzhiyu/hexo4567567.png
category: [其他]
tags:  [Hexo]
draft: false
---

在`_config.yml`文件修改后，一定要执行一下hexo clean，不然skip_render可能不会生效。
在`source`目录下新建一个文件夹"demo"
通过在`_config.yml`设置`skip_render`
1.单个文件夹下全部文件：
`skip_render: demo/*`
2.单个文件夹下指定类型文件：
`skip_render: demo/*.html`
3.单个文件夹下全部文件以及子目录:
`skip_render: demo/**`
4.多个文件夹以及各种复杂情况：
```bash
skip_render:
    - 'demo/*.html'
    - 'demo/**'
```