---
title: pug模板使用
date: 2023-08-02 10:57:55
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: [前端]
tags: [node]
draft: false
---

[官网文档]('https://www.pugjs.cn/api/getting-started.html')  

<!--more-->

一种nodejs的模板引擎,来自于`jade`的升级.

## 语法
### 属性
```pug
a(href="baidu.com") 百度
a(class='button' href='baidu.com') 百度
a(class='button', href='baidu.com') 百度
```
>>
```html
<a href="baidu.com">百度</a>
<a class="button" href="baidu.com">百度</a>
<a class="button" href="baidu.com">百度</a>
```
js表达式
```pug
- var authenticated = true
body(class=authenticated ? 'authed' : 'anon')
```
>>
```html
<body class="authed"></body>
```
多行属性
```pug
input(
  type='checkbox'
  name='agreement'
  checked
)
```
>>
```html
<input type="checkbox" name="agreement" checked="checked" />
```
json
```pug
input(data-json=`
  {
    "非常": "长的",
    "数据": true
  }
`)
```
>>
```html
<input data-json="
  {
    &quot;非常&quot;: &quot;长的&quot;,
    &quot;数据&quot;: true
  }
" />
```
某些奇怪的字符需要用单引号或者双引号括起来
```pug
//- 在这种情况下，`(click)` 会被当作函数调用而不是
//- 属性名称，这会导致一些稀奇古怪的错误。
div(class='div-class', (click)='play()')
div(class='div-class' '(click)'='play()')
```
>>
```html
<div class="div-class" (click)="play()"></div>
<div class="div-class" (click)="play()"></div>
```
嵌入属性
```pug
- var url = 'pug-test.html';
a(href='/' + url) 链接
- url = 'https://example.com/'
a(href=url) 另一个链接

- var btnType = 'info'
- var btnSize = 'lg'
button(type='button' class='btn btn-' + btnType + ' btn-' + btnSize)
button(type='button' class=`btn btn-${btnType} btn-${btnSize}`)
```
>>
```html
<a href="/pug-test.html">链接</a>
<a href="https://example.com/">另一个链接</a>

<button class="btn btn-info btn-lg" type="button"></button>
<button class="btn btn-info btn-lg" type="button"></button>
```
不转义的属性
```pug
div(escaped="<code>")
div(unescaped!="<code>")
```
>>
```html
<div escaped="&lt;code&gt;"></div>
<div unescaped="<code>"></div>
```
布尔值
```pug
input(type='checkbox' checked)
input(type='checkbox' checked=true)
input(type='checkbox' checked=false)
input(type='checkbox' checked=true.toString())
```
>>
```html
<input type="checkbox" checked="checked" />
<input type="checkbox" checked="checked" />
<input type="checkbox" />
<input type="checkbox" checked="true" />
```
添加doctype html后不会映射属性
```pug
doctype html
input(type='checkbox' checked=true && 'checked')
```
>>
```html
<!DOCTYPE html>
<input type="checkbox" checked="checked">
```
样式属性
```pug
a(style={color: 'red', background: 'green'})
```
>>
```html
<a style="color:red;background:green;"></a>
```
类属性
```pug
- var classes = ['foo', 'bar', 'baz']
a(class=classes)
a.bang(class=classes class=['bing'])
```
>>
```html
<a class="foo bar baz"></a>
<a class="bang foo bar baz bing"></a>
```
类名映射为true或false
```pug
- var currentUrl = '/about'
a(class={active: currentUrl === '/'} href='/') Home
a(class={active: currentUrl === '/about'} href='/about') About
```
>>
```html
<a href="/">Home</a>
<a class="active" href="/about">About</a>
```
类的字面值
```pug
a.button
.content
```
>>
```html
<a class="button"></a>
<div class="content"></div>
```
ID的字面量
```pug
a#main-link
#content
```
>>
```html
<a id="main-link"></a>
<div id="content"></div>
```
&attributes 语法可以将一个对象转化为一个元素的属性列表
```pug
div#foo(data-bar="foo")&attributes({'data-foo': 'bar'})
```
>>
```html
<div id="foo" data-bar="foo" data-foo="bar"></div>
```
```pug
- var attributes = {};
- attributes.class = 'baz';
div#foo(data-bar="foo")&attributes(attributes)
```
>>
```html
<div class="baz" id="foo" data-bar="foo"></div>
```

### 分支条件

```pug
- var friends = 10
case friends
  when 0
    p 您没有朋友
  when 1
    p 您有一个朋友
  default
    p 您有 #{friends} 个朋友
```
>>
```html
<p>您有 10 个朋友</p>
```

```pug
- var friends = 0
case friends
  when 0 //串联
  when 1
    p 您的朋友很少
  when 2
    - break  // 可以直接范围
  default
    p 您有 #{friends} 个朋友
```
>>
```html
<p>您的朋友很少</p>
```
块展开
```pug
- var friends = 1
case friends
  when 0: p 您没有朋友
  when 1: p 您有一个朋友
  default: p 您有 #{friends} 个朋友
```
>>
```html
<p>您有一个朋友</p>
```

### 代码 code

不输出的代码
```pug
- for (var x = 0; x < 3; x++)
  li item
```
>>
```html
<li>item</li>
<li>item</li>
<li>item</li>
```

```pug
- var list = ["Uno", "Dos", "Tres"]
each item in list
  li= item
```
>>
```html
<li>Uno</li>
<li>Dos</li>
<li>Tres</li>
```
带输出的代码
```pug
p = '这个代码被 <转义> 了！'
```
```html
<p>这个代码被 &lt;转义&gt; 了！</p>
```
不转义
```pug
p!= '这段文字' + ' <strong>没有</strong> 被转义！'
```
```html
<p>这段文字 <strong>没有</strong> 被转义！</p>
```
### 注释
```pug
// demo1
//- demo2
//-
    块注释
//
```
```html
<!-- 一些内容-->
""
<!-- 
    块注释
-->
```
条件注释
```pug
doctype html

<!--[if IE 8]>
<html lang="en" class="lt-ie9">
<![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->

body
  p Supporting old web browsers is a pain.
</html>
```
```html
<!DOCTYPE html>
<!--[if IE 8]>
<html lang="en" class="lt-ie9">
<![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->
<body>
  <p>Supporting old web browsers is a pain.</p>
</body>

</html>
```

### 条件判断

```pug
- var user = { description: 'foo bar baz' }
- var authorised = false
#user
  if user.description
    h2.green user.description
  else if authorised
    h2.blue 用户没有添加描述。
  else
    h2.red 描述
```
```html
<div id="user">
  <h2 class="green">foo bar baz</h2>
</div>
```
反义版本
```pug
unless user.isAnonymous
  p 您已经以 #{user.name} 的身份登录。
```
等价
```pug
if !user.isAnonymous
  p 您已经以 #{user.name} 的身份登录。
```
### Doctype

```pug
doctype html
```
```html
<!DOCTYPE html>
```
其他看不常用看官网

### 过滤器
没用上暂时没看

### 包含 include

```pug
//- index.pug
doctype html
html
  include includes/head.pug
  body
    h1 我的网站
    p 欢迎来到我这简陋得不能再简陋的网站。
    include includes/foot.pug
```
```pug
//- includes/head.pug
head
  title 我的网站
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')
```
```pug
//- includes/foot.pug
footer#footer
  p Copyright (c) foobar
```
```html
<!DOCTYPE html>
<html>
<head>
  <title>我的网站</title>
  <script src="/javascripts/jquery.js"></script>
  <script src="/javascripts/app.js"></script>
</head>
<body>
  <h1>我的网站</h1>
  <p>欢迎来到我这简陋得不能再简陋的网站。</p>
  <footer id="footer">
    <p>Copyright (c) foobar</p>
  </footer>
</body>
</html>
```
包含纯文本
如果不是pug则只会当文本引入
```pug
//- index.pug
doctype html
html
  head
    style
      include style.css
  body
    h1 我的网站
    p 欢迎来到我这简陋得不能再简陋的网站。
    script
      include script.js
```
```css
/* style.css */
h1 {
  color: red;
}
```

```js
// script.js
console.log('真了不起！');
```
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* style.css */
    h1 {
      color: red;
    }
  </style>
</head>
<body>
  <h1>我的网站</h1>
  <p>欢迎来到我这简陋得不能再简陋的网站。</p>
  <script>
    // script.js
    console.log('真了不起！');
  </script>
</body>
</html>
```
使用过滤器包含文本
没看

### 集成与扩展
`block`和`extends`进行继承.
`block`可以被子模板覆盖替换.过程是递归的.
```pug
//- layout.pug
html
  head
    title 我的站点 - #{title}
    block scripts
      script(src='/jquery.js')
  body
    block content
    block foot
      #footer
        p 一些页脚的内容
```
```pug
//- page-a.pug
extends layout.pug

block scripts
  script(src='/jquery.js')
  script(src='/pets.js')

block content
  h1= title
  - var pets = ['猫', '狗']
  each petName in pets
    include pet.pug
```
```pug
//- pet.pug
p= petName
```

```pug
//- sub-layout.pug
extends layout.pug

block content
  .sidebar
    block sidebar
      p 什么都没有
  .primary
    block primary
      p 什么都没有
```

```pug
//- page-b.pug
extends sub-layout.pug

block content
  .sidebar
    block sidebar
      p 什么都没有
  .primary
    block primary
      p 什么都没有
```
块内容的添补
`prepend`向头部添加
`append`向尾部添加
```pug
//- layout.pug
html
  head
    block head
      script(src='/vendor/jquery.js')
      script(src='/vendor/caustic.js')
  body
    block content
```
```pug
//- page.pug
extends layout.pug

block append head
  script(src='/vendor/three.js')
  script(src='/game.js')
```
`block append` `block prepend`中`block`可以省略
```pug
//- page.pug
extends layout

append head
  script(src='/vendor/three.js')
  script(src='/game.js')
```
值得注意的是，在扩展模板中，顶级元素（没有缩进的一级）只能是带名字的块，或者是混入的定义。理解这一点非常重要，因为父模板定义了整个页面的总体布局和结构，而扩展的模板只能为其特定的块添补或者替换内容。不妨假设我们创建了一个子模板，尝试在已有的块之外再添加内容。很明显，Pug 将没法知道这个内容最终应该在页面的何处出现。

### 嵌入

```pug
- var title = "On Dogs: Man's Best Friend";
- var author = "enlore";
- var theGreat = "<span>转义!</span>";

h1= title
p #{author} 笔下源于真情的创作。
p 这是安全的：#{theGreat}
```
```html
<h1>On Dogs: Man's Best Friend</h1>
<p>enlore 笔下源于真情的创作。</p>
<p>这是安全的：&lt;span&gt;转义!&lt;/span&gt;</p>
```
```pug
- var msg = "not my inside voice";
p This is #{msg.toUpperCase()}
```
```html
<p>This is NOT MY INSIDE VOICE</p>
```
自动不转义
```pug
p 不要转义 #{'}'}！
```
```html
<p>不要转义 }！</p>
```
手动转义
```pug
p Escaping works with \#{interpolation}
p Interpolation works with #{'#{interpolation}'} too!
```
```html
<p>Escaping works with #{interpolation}</p>
<p>Interpolation works with #{interpolation} too!</p>
```
字符串嵌入不转义
```pug
- var riskyBusiness = "<em>我希望通过外籍教师 Peter 找一位英语笔友。</em>";
.quote
  p 李华：!{riskyBusiness}
```
```html
<div class="quote">
  <p>李华：<em>我希望通过外籍教师 Peter 找一位英语笔友。</em></p>
</div>
```
标签嵌入
```pug
p.
  这是一个很长很长而且还很无聊的段落，还没有结束，是的，非常非常地长。
  突然出现了一个 #[strong 充满力量感的单词]，这确实让人难以 #[em 忽视]。
p.
  使用带属性的嵌入标签的例子：
  #[q(lang="es") ¡Hola Mundo!]
```
```html
<p>这是一个很长很长而且还很无聊的段落，还没有结束，是的，非常非常地长。
  突然出现了一个 <strong>充满力量感的单词</strong>，这确实让人难以 <em>忽视</em>。</p>
<p>使用带属性的嵌入标签的例子：
  <q lang="es">¡Hola Mundo!</q></p>
```
空格的调整
```pug
p
  | 如果我不用嵌入功能来书写，一些标签比如
  strong strong
  | 和
  em em
  | 可能会产生意外的结果。
p.
  如果用了嵌入，在 #[strong strong] 和 #[em em] 旁的空格就会让我舒服多了。
```
```html
<p>如果我不用嵌入功能来书写，一些标签比如<strong>strong</strong>和<em>em</em>可能会产生意外的结果。</p>
<p>如果用了嵌入，在 <strong>strong</strong> 和 <em>em</em> 旁的空格就会让我舒服多了。</p>
```

### 迭代
也可以使用for作为each 二者相等
```pug
ul
  each val in [1, 2, 3]
    li= val
```
```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```
在迭代中获得索引
```pug
ul
    //- 也可以是键值{1:'一',2:'二',3:'三'}
  each val, index in ['〇', '一', '二'] 
    li= index + ': ' + val
```
```html
<ul>
  <li>0: 〇</li>
  <li>1: 一</li>
  <li>2: 二</li>
</ul>
```
添加else
```pug
- var values = [];
ul
  each val in values
    li= val
  else
    li 没有内容
```
while循环
```pug
- var n = 0;
ul
  while n < 4
    li= n++
```

### 混入
混入是一种允许您在 Pug 中重复使用一整个代码块的方法。
```pug
//- 定义
mixin list
  ul
    li foo
    li bar
    li baz
//- 使用
+list
+list
```
```html
<ul>
  <li>foo</li>
  <li>bar</li>
  <li>baz</li>
</ul>
<ul>
  <li>foo</li>
  <li>bar</li>
  <li>baz</li>
</ul>
```
传参
```pug
mixin pet(name)
  li.pet= name
ul
  +pet("猫")
  +pet("狗")
  +pet("猪")
```
```html
<ul>
  <li class="pet">猫</li>
  <li class="pet">狗</li>
  <li class="pet">猪</li>
</ul>
```
混入的块
```pug
mixin article(title)
  .article
    .article-wrapper
      h1= title
      if block
        block
      else
        p 没有提供任何内容。
+article('Hello world')
+article('Hello world')
  p 这是我
  p 随便写的文章
```
```html
<div class="article">
  <div class="article-wrapper">
    <h1>Hello world</h1>
    <p>没有提供任何内容。</p>
  </div>
</div>
<div class="article">
  <div class="article-wrapper">
    <h1>Hello world</h1>
    <p>这是我</p>
    <p>随便写的文章</p>
  </div>
</div>
```
混入的属性
```pug
mixin link(href, name)
  //- attributes == {class: "btn"}
  a(class!=attributes.class href=href)= name

+link('/foo', 'foo')(class="btn")
```
```html
<a class="btn" href="/foo">foo</a>
```
`attributes` 里的值已经被（作为标签属性）转义了，所以您可能需要用 `!=` 的方式赋值以避免发生二次转义（详细解释可以查阅不转义的属性）。
```pug
mixin link(href, name)
  a(href=href)&attributes(attributes)= name

+link('/foo', 'foo')(class="btn")
```
```html
<a class="btn" href="/foo">foo</a>
```
`+link(class="btn")` 这种写法也是允许的，且等价于 `+link()(class="btn")`，因为 Pug 会判断括号内的内容是属性还是参数。但我们鼓励您使用后者的写法，明确地传递空的参数，确保第一对括号内始终都是参数列表。

剩余的参数
```pug
mixin list(id, ...items)
  ul(id=id)
    each item in items
      li= item

+list('my-list', 1, 2, 3, 4)
```
```html
<ul id="my-list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

### 纯文本
标签中的纯文本
```pug
p 这是一段纯洁的<em>文本</em>内容.
```
```html
<p>这是一段纯洁的<em>文本</em>内容.</p>
```
原始 HTML
```pug
<html>

body
  p 缩进 body 标签没有意义，
  p 因为 HTML 本身对空格不敏感。

</html>
```
```html
<html>
<body>
  <p>缩进 body 标签没有意义，</p>
  <p>因为 HTML 本身对空格不敏感。</p>
</body>
</html>
```
管道文本
该方法在混合纯文本和行内标签时会很有用
```pug
p
  | 管道符号总是在最开头，
  | 不算前面的缩进。
```
```html
<p>管道符号总是在最开头，
  不算前面的缩进。</p>
```
标签中的纯文本块
```pug
script.
  if (usingPug)
    console.log('这是明智的选择。')
  else
    console.log('请用 Pug。')
```
```html
<script>
  if (usingPug)
    console.log('这是明智的选择。')
  else
    console.log('请用 Pug。')
</script>
```
可以在父块内，创建一个“点”块，跟在某个标签的后面。
```pug
div
  p This text belongs to the paragraph tag.
  br
  .
    This text belongs to the div tag.
```
```html
<div>
  <p>This text belongs to the paragraph tag.</p><br />This text belongs to the div tag.
</div>
```
空格控制
```pug
a ……用一个链接结束的句子
| 。
```
```html
<a>……用一个链接结束的句子</a>。
```
添加空格
```pug
| 千万别
|
button#self-destruct 按
|
| 我！
```
```html
千万别
<button id="self-destruct">按</button>
我！
```
```pug
p.
  使用常规的标签可以让您的代码行短小精悍，
  但使用嵌入标签会使代码变得更 #[em 清晰易读]。
  ——如果您的标签和文本之间是用空格隔开的。
```
```html
<p>使用常规的标签可以让您的代码行短小精悍，
  但使用嵌入标签会使代码变得更 <em>清晰易读</em>。
  ——如果您的标签和文本之间是用空格隔开的。</p>
```
### 标签
```pug
ul
  li Item A
  li Item B
  li Item C
```
```html
<ul>
  <li>Item A</li>
  <li>Item B</li>
  <li>Item C</li>
</ul>
```
自动闭合
```pug
img
```
```html
<img />
```
块展开
```pug
a: img
```
```html
<a><img /></a>
```
自闭和标签
```pug
foo/
foo(bar='baz')/
```
```html
<foo />
<foo bar="baz" />
```