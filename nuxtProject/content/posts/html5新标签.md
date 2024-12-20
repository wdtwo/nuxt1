---
title: html5新标签
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: [前端]
tags: [html]
draft: false
---
- 块级标签
- 内联标签
- 代码标签
<!--more-->
## 块级标签
```html
    <abbr>定义缩写</abbr>
    <address>定义地址元素</address>
    <area>图像映射的区域</area>
    <article>文章</article>
    <aside>页面内容外的内容</aside>
    <audio src="">生意内容</audio>
    <base href="#" target="_blank">页面中所有链接的基准URL
    <bdi dir="rtl">文本的文本方向</bdi>
    <bdo dir="rtl">文本的显示方向</bdo>
    <blockquote cite="http://">
      定义长引用
    </blockquote>
    <caption>表格标题</caption>
    <cite>引用</cite>
    <col span="2">表格列的属性
    <colgroup>表格列分组</colgroup>
    <command onclick="alert('Hello World')">命令按钮只有放在menu标签内才显示</command>
    定义下拉列表
    <input id="myCar" list="cars" />
    <datalist id="cars">
        <option value="BMW">
        <option value="Ford">
        <option value="Volvo">
    </datalist>
    <details open>
        <summary>Copyright 2011.</summary>
        <p>定于元素细节</p>
    </details>
    <embed src="helloworld.swf" />外部交互内容或插件
    <form>
        <fieldset disabled form="" name="">字段集 从逻辑上将表单中的元素组合起来
            <legend>为fieldset定义标题</legend>
            Name: <input type="text" /><br />
            Email: <input type="text" /><br />

            <keygen name="security" autofoucs challenge disabled form="" keytype="">用于表单的密钥对生成器字段(私钥存储在本地,公钥发送到服务器)
        </fieldset>
    </form>
    <figure>定义媒体内容的分组,以及它们的标题
        <figcaption>用作文档中插图的图像,带有一个标题</figcaption>
        <img src="shanghai_lupu_bridge.jpg" width="350" height="234" />
    </figure>
    <footer>定义section或者page的页脚 一般该元素会包含创作者的姓名、文档的创作日期以及/或者联系信息</footer>
    <header>定义文档的页眉（介绍信息）</header>
    <hgroup>对网页或者区段(section)的标题进行组合
      <h1></h1>
      <h2></h2>
    </hgroup>
    <ins cite="URL-指向另一个文档的URL,该文档解释文本插入的原因" datetime="定义文本插入的日期和时间">文档的其余部分之外的插入文本</ins>
    用于定义客户端图像映射,图像映射是指带有可点击区域的图像
    <img src="planets.gif" alt="Planets" usemap ="#planetmap" />
    <map name="planetmap">
     <area shape ="rect" coords ="0,0,110,260" href ="sun.htm" alt="Sun" />
     <area shape ="circle" coords ="129,161,10" href ="mercur.htm" alt="Mercury" />
     <area shape ="circle" coords ="180,139,14" href ="venus.htm" alt="Venus" />
    </map>
    <menu autosubmit="true" label type="context toolbar list">定义菜单列表
        <li><input type="checkbox" />Red</li>
        <li><input type="checkbox" />blue</li>
    </menu>
    <meter value="50" min="0" max="100" high="0" low="0" optimum="200" >定义度量衡(ie不支持)</meter>
    <meter>2 out of 10</meter>
    <meter>30%</meter>
    进度条
    <progress value="0" max="100">0%</progress>
    <section>文档中的区段</section>
    <video src="videofile.ogg" autoplay poster="posterimage.jpg">
      <track kind="subtitles" src="sampleSubtitles_en.srt" srclang="en">字幕
    </video>
```
## 内联标签
```html
    <em>强调文本</em>
    <strong>重要文本</strong>
    <dfn>定义项目</dfn>
    <samp>样本文本</samp>
    <kbd>键盘文本</kbd>
    <mark>有记号的文本</mark>
    <q cite="">短引用</q>
    <time datatime="2018-02-14">定义时间和日期</time>
    <tt>打字机字体</tt>
```
## 代码标签
```html
  <code></code>
  <var>定义变量</var>
  <pre></pre>
```

























//
