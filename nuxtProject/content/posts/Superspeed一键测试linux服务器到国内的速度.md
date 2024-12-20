---
title: Superspeed一键测试linux服务器到国内的速度
date: 2023-05-16 14:29:26
cover: https://cdn.wdtwo.com/anzhiyu/linux08350645.webp
category: [后端]
tags: [linux]
draft: false
---

Superspeed一键测试linux服务器到国内的速度
<!--more-->
### Superspeed一键测试linux服务器到国内的速度

__用 Speedtest 测试你的国外主机到国内不同省市的速度。 集成了 Speedtest 提供的电信，联通，移动线路。 一键选择，一键测试。 全面测速，添加一键全面测速功能，测试服务器到全国北方南方，电信，联通，移动的速度。__
```js
1.  使用方法
    `wget -qO- https://raw.githubusercontent.com/oooldking/script/master/superbench.sh | bash `
2. 或者
    `curl -Lso- https://raw.githubusercontent.com/oooldking/script/master/superbench.sh | bash `
```

#### 下载地址
```js
https://github.com/oooldking/script/blob/master/superbench.sh
```
[原文](https://www.oldking.net/350.html)

### 测试上传下载速度
`sudo wget https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py`
`sudo chmod 755 speedtest.py`
`./speedtest.py`
[原文](https://www.oldking.net/350.html)
```bash

wget -qO- --no-check-certificate https://raw.githubusercontent.com/oooldking/script/master/superbench.sh | bash
curl -Lso- -no-check-certificate https://raw.githubusercontent.com/oooldking/script/master/superbench.sh | bash

bash <(curl -Lso- https://git.io/superspeed)

wget -qO- bench.sh | bash
或者
curl -Lso- bench.sh | bash
或者
wget -qO- 86.re/bench.sh | bash
或者
curl -so- 86.re/bench.sh | bash

dd if=/dev/zero of=1000mb.bin bs=1000M count=1
```





