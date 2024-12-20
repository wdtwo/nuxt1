---
title: Hexo安装
date: 2023-01-07 09:04:55
cover: https://cdn.wdtwo.com/anzhiyu/hexo4567567.png
category: [其他]
tags:  [Hexo]
draft: false
---

快速、简洁且高效的博客框架

<!--more-->
### 一键安装脚本
```bash
https://vercel.com/new/clone?repository-url=https://github.com/EvanNotFound/vercel-hexo-template/tree/main&template=hexo
```



### 安装Hexo
```bash
npm install -g hexo-cli
# 安装完成后验证
hexo -v
```
![hexo](/src/Hexo安装/1)

### github设置
![2](/src/Hexo安装/2)
![3](/src/Hexo安装/3)

### git安装
[下载链接](https://git-scm.com/downloads)
[淘宝镜像](https://registry.npmmirror.com/binary.html?path=git-for-windows/v2.36.1.windows.1/)
```bash
git config -l  //查看所有配置
git config --system --list //查看系统配置
git config --global --list //查看用户（全局）配置

git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```
### 连接至github
`执行以下命令生成ssh公钥，此公钥用于你的计算机连接Github`
```bash
ssh-keygen -t rsa -C "你的邮箱"
```
`之后打开C盘下用户文件夹下的.ssh的文件夹，会看到 id_rsa.pub`
![](/src/Hexo安装/4.png)
`用记事本打开上述图片中的公钥（id_rsa.pub），复制里面的内容，然后开始在github中配置ssh密钥。`
将 SSH KEY 配置到 GitHub
进入github，点击右上角头像 选择settings，进入设置页后选择 SSH and GPG keys，名字随便起，公钥填到Key那一栏。
![](/src/Hexo安装/5)
![](/src/Hexo安装/6)
![](/src/Hexo安装/7)
测试连接，输入以下命令
```bash
ssh -T git@github.com
ping github.com
```
### 初始化 Hexo 项目
在目标路径（我这里选的路径为【C:/Hexo-Blog】）打开cmd命令窗口，执行hexo init初始化项目。
```bash
hexo init blog-demo(项目名)
```
![](/src/Hexo安装/8)
进入blog-demo ，输入npm i安装相关依赖。
```bash
cd blog-demo  //进入blog-demo文件夹
npm install
```
初始化项目后，blog-demo有如下结构：
![](/src/Hexo安装/9)
- 【node_modules】：依赖包
- 【scaffolds】：生成文章的一些模板
- 【source】：用来存放你的文章
- 【themes】：主题
- 【.npmignore】：发布时忽略的文件（可忽略）
- 【_config.landscape.yml】：主题的配置文件
- 【config.yml】：博客的配置文件
- 【package.json】：项目名称、描述、版本、运行和开发等信息

输入hexo server或者hexo s 启动项目

### 将静态博客挂载到 GitHub Pages

安装 hexo-deployer-git
```bash
npm install hexo-deployer-git --save
```
修改 _config.yml 文件
在blog-demo目录下的_config.yml，就是整个Hexo框架的配置文件了。可以在里面修改大部分的配置。详细可参考官方的配置描述。
修改最后一行的配置，将repository修改为你自己的github项目地址即可，还有分支要改为main代表主分支（注意缩进）。
```bash
# YAML
deploy:
  type: git
  repository: git@github.com:Fomalhaut-Blog/Fomalhaut-Blog.github.io.git
  branch: main
```
修改好配置后，运行如下命令，将代码部署到 GitHub（Hexo三连）。
```bash
# Git BASH终端
hexo clean
hexo generate
hexo deploy  
# VSCODE终端
hexo clean; 
hexo generate; 
hexo deploy  
```
- hexo clean：删除之前生成的文件，若未生成过静态文件，可忽略此命令。
- hexo generate：生成静态文章，可以用hexo g缩写
- hexo deploy：部署文章，可以用hexo d缩写
> 注意：deploy时可能要你输入 username 和 password。

如果出现Deploy done，则说明部署成功了。

### 无法连接至Github的解决方案

- 挂代理和换网络（这个就不用多说了）
- Git问题：解决“ssh:connect to host github.com port 22: Connection timed out”
这是评论区的朋友提供的，可以解决SSH连接超时等问题

### github.io配置自定义域名
![](/src/Hexo安装/10.webp)

### Vercel部署与自定义域名
`Vercel简介：vercel是一个代码托管平台，它能够托管你的静态html界面，甚至能够托管你的node.js与Python服务端脚本，是不想买服务器的懒人的福音！`
[vercel](https://vercel.com/)
首先需要一个Vercel账号，这里推荐用GitHub账户关联，这样你就可以在vercel中直接托管你的GitHub库中的项目了，实现开发部署一步到位（网络不流畅可以考虑挂梯子）。
当你用你的Github账户关联并绑定手机号登录之后，点击右上角的Add New Project创建新的项目，之后导入选项那里选择Continue with Github，这时候应该能看到你Github账号的仓库，选择你刚刚部署成功的存储静态博客的仓库<username>.github.io右边的Import选项，表示你要导入该仓库。
起一个只能有字母、数字或者或者连字符的项目名称，然后其他默认，点击Deploy，等待一分钟即可部署成功，部署成功后电极Continue to Dashboard跳转到控制面板，下图所示就是控制面板，看到就代表成功部署到了，但是我们现在还不能访问他给出的域，因为GFW最近把Vercel屏蔽了。

> 当你有了新的域名之后，需要[BlogRoot]\_config.yml文件中的url配置项为自己的新域名，这样博客的文章链接才会正确生成。

![](/src/Hexo安装/11)

### 安装主题

本教程用的 🦋 hexo-theme-butterfly 主题 v4.5.0最新版，请放心食用。

本教程用的是npm方式安装的 hexo-theme-butterfly，后续魔改时更改的文件都是【C:/Hexo-Blog/blog-demo/node_modules/hexo-theme-butterfly】文件夹中的文件。如果你是git clone克隆方式安装的主题，请在【C:/Hexo-Blog/blog-demo/themes/butterfly】文件夹下修改对应的文件。

npm安装
```bash
npm i hexo-theme-butterfly
```
> 升级方法：在博客根目录下，运行 npm update hexo-theme-butterfly。
升级前请将hexo-theme-butterfly文件夹备份，npm更新会直接覆盖成新的包。

github安装
```bash
git clone -b 4.5.0 https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```
> 升级方法：在主题目录下，运行git pull

### 应用主题
修改站点配置文件_config.yml，把主题改为butterfly
```bash
# YAML
theme: butterfly
```
如果你没有pug以及stylus的渲染器，请下载安装，这两个渲染器是Butterfly生成基础页面所需的依赖包：
```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```
为了减少升级主题后带来的不便，请使用以下方法（建议，可以不做，高度魔改的一般都不会升级主题了，不然魔改的会被覆盖掉）
把主题文件夹中的 _config.yml 复制到 Hexo 根目录里（我这里路径为【C:/Hexo-Blog/blog-demo】），同时重新命名为 _config.butterfly.yml。以后只需要在 _config.butterfly.yml进行配置即可生效。Hexo会自动合併主题中的_config.yml和 _config.butterfly.yml里的配置，如果存在同名配置，会使用_config.butterfly.yml的配置，其优先度较高。

### 基础用法说明
Front-matter 是 markdown 文件最上方以---分隔的区域，用于指定个别档案的变数。

- Page Front-matter 用于页面配置
- Post Front-matter 用于文章页配置
> 如果标注可选的参数，可根据自己需要添加，不用全部都写

Page Front-matter:
```bash 
---
title:
date:
type:
---
```
| 写法 | 解释 |
| :------| :----|
| title | 【必需】页面标题 |
| date | 【必需】页面创建日期 |
| type | 【必需】标籤、分类和友情链接三个页面需要配置 |
| updated | 【可选】页面更新日期 |
| description |【可选】页面描述  |
| keywords | 【可选】页面关键字 |
| comments | 【可选】显示页面评论模块(默认 true) |
| top_img | 【可选】页面顶部图片 |
| mathjax | 【可选】显示mathjax(当设置mathjax的per_page: false时，才需要配置，默认 false) |
| kates | 【可选】显示katex(当设置katex的per_page: false时，才需要配置，默认 false) |
| aside | 【可选】显示侧边栏 (默认 true) |
| aplayer | 【可选】在需要的页面加载aplayer的js和css,请参考文章下面的音乐 配置 |
| highlight_shrink | 【可选】配置代码框是否展开(true/false)(默认为设置中highlight_shrink的配置) |

Post Front-matter：
```bash
---
title:
date:
---
```
| 写法 | 解释 |
| :------| :----|
| title | 【必需】文章标题 |
| date	 | 【必需】文章创建日期 |
| updated	 | 【可选】文章更新日期 |
| tags | 	【可选】文章标籤 |
| categories	 | 【可选】文章分类 |
| keywords | 	【可选】文章关键字 |
| description | 	【可选】文章描述 |
| top_img | 	【可选】文章顶部图片 |
| cover | 	【可选】文章缩略图(如果没有设置top_img,文章页顶部将显示缩略图，可设为false/图片地址/留空) |
| comments | 	【可选】显示文章评论模块(默认 true) |
| toc | 	【可选】显示文章TOC(默认为设置中toc的enable配置) |
| toc_number | 	【可选】显示toc_number(默认为设置中toc的number配置) |
| toc_style_simple | 	【可选】显示 toc 简洁模式 |
| copyright | 	【可选】显示文章版权模块(默认为设置中post_copyright的enable配置) |
| copyright_author | 	【可选】文章版权模块的文章作者 |
| copyright_author_href | 	【可选】文章版权模块的文章作者链接 |
| copyright_url | 	【可选】文章版权模块的文章连结链接 |
| copyright_info | 	【可选】文章版权模块的版权声明文字 |
| mathjax | 	【可选】显示mathjax(当设置mathjax的per_page: false时，才需要配置，默认 false) |
| katex | 	【可选】显示katex(当设置katex的per_page: false时，才需要配置，默认 false) |
| aplayer | 	【可选】在需要的页面加载aplayer的js和css,请参考文章下面的音乐 配置 |
| highlight_shrink | 	【可选】配置代码框是否展开(true/false)(默认为设置中highlight_shrink的配置) |
| aside | 	【可选】显示侧边栏 (默认 true) |

> 注意：我的博客根目录路径为 【C:/Hexo-Blog/blog-demo】，下文所说的根目录都是此路径，将用[BlogRoot]代替。

#### 标签页
前往你的Hexo博客根目录，打开Git Bash执行如下命令：
```bash
hexo new page tags
```
在[BlogRoot]\source\会生成一个含有index.md文件的tags文件夹。
修改[BlogRoot]\source\tags\index.md，添加type: "tags"。
```bash
---
title: tags
date: 2022-10-28 12:00:00
type: "tags"
---
```
#### 友情链接
前往你的Hexo博客根目录，打开cmd命令窗口执行如下命令：
```bash
hexo new page link
```
在[BlogRoot]\source\会生成一个含有index.md文件的link文件夹
修改[BlogRoot]\source\link\index.md，添加type: "link"
```bash
---
title: link
date: 2022-10-28 12:00:00
type: "link"
---
```
前往[BlogRoot]\source\_data创建一个link.yml文件（如果沒有 **_data** 文件夹，请自行创建），并写入如下信息（根据你的需要写）：
```bash
- class_name: 1.技术支持
  class_desc: 本网站的搭建由以下开源作者提供技术支持
  link_list: 
    - name: Hexo 
      link: https://hexo.io/zh-cn/
      avatar: https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
      descr: 快速、简单且强大的网志框架
      siteshot: https://source.fomal.cc/siteshot/hexo.io.jpg
      
- class_name: 2.友情链接
  class_desc: 一些好朋友~~
  link_list:
    - name: Fomalhaut🥝
      link: https://fomal.cc/
      avatar: /assets/head.jpg
      descr: Future is now 🍭🍭🍭
      siteshot: https://source.fomal.cc/siteshot/www.fomal.cn.jpg
```
> class_name和class_desc支持 html 格式，如不需要，也可以留空。
#### 图库
图库页面只是普通的页面，你只需要hexo new page xxx创建你的页面就行。
然后使用外挂标签 galleryGroup，具体用法请查看对应的内容。
```bash
<div class="gallery-group-main">
{% galleryGroup '封面专区' '本站用作文章封面的图片，不保证分辨率' '/box/Gallery/photo' https://source.fomal.cc/img/default_cover_61.webp %}
{% galleryGroup '背景专区' '收藏的一些的背景与壁纸，分辨率很高' '/box/Gallery/wallpaper' https://source.fomal.cc/img/dm11.webp %}
</div>
```
#### 子页面
子页面也是普通的页面，你只需要hexo new page xxx创建你的页面就行。
然后使用标签外挂 gallery，具体用法请查看对应的内容。

```bash
{% gallery %} 
![p1]( https://source.fomal.cc/img/default_cover_1.webp ) 
![p2]( https://source.fomal.cc/img/default_cover_2.webp ) 
![p3]( https://source.fomal.cc/img/default_cover_3.webp ) 
{% endgallery %}
```
#### 404页面
主題內置了一个简单的404页面，可在设置中开放。
如需本地预览，请访问 http://localhost:4000/404.html
```bash
# A simple 404 page
error_404:
  enable: true
  subtitle: "页面沒有找到"
  background: 
```
