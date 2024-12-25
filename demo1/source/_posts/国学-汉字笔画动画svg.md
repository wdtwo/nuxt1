---
title: 汉字笔画动画svg
date: 2023-05-12 16:58:19
image: https://cdn.wdtwo.com/anzhiyu/hanzi79760456.webp
category: 
- 其他
tags: 
- 国学
---

[原文包地址](https://hanziwriter.org/cn)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>练字格子</title>
    <style>
        div {
            width: 50px;
        }
    </style>
</head>
<body>
    <h1>动画</h1>
    <div>
        <div id="character-target-div"></div>
        <div id="character-target2-div"></div>
        <div id="target"></div>
        <hr>
        <button id="animate-button">动画</button>
        <button id="animate-button2">连续动画</button>
    </div>
    <h1>按笔画填写</h1>
    <div>
        <div id="ceshi"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/hanzi-writer@3.0/dist/hanzi-writer.min.js"></script>
    <script>

    var writer = HanziWriter.create('character-target-div', '我', {
        //基本配置
        width: 100,
        height: 100,
        padding: 5,
        //填充颜色
        strokeColor: '#EE00FF', // pink
        //偏旁部首颜色
        radicalColor: '#168F16', // green
        //是否显示底色
        showOutline: true,
        //笔画填写速度
        strokeAnimationSpeed: 1, // 5x normal speed
        //每个笔画中间的间隔时间
        delayBetweenStrokes: 10, // milliseconds
        //无限循环每次的间隔
        //delayBetweenLoops: 3000
        showCharacter: false,
    });
    document.getElementById('animate-button').addEventListener('click', function() {
        //激活动画
        //writer.animateCharacter();
        //激活无限循环动画
        writer.loopCharacterAnimation();
    });

    var char2 = HanziWriter.create('character-target2-div', '爽', {
        width: 100,
        height: 100,
        padding: 5,
        showCharacter: false
    });
    //连续动画
    function chainAnimations() {
        writer.hideCharacter();
        char2.hideCharacter();
        //回调函数
        writer.animateCharacter({
            onComplete: function() {
                setTimeout(function() {
                    char2.animateCharacter();
                }, 1000);
            }
        });
    }
    document.getElementById('animate-button2').addEventListener('click', chainAnimations);

    //测试
    var ceshi = HanziWriter.create('ceshi', '测', {
        width: 150,
        height: 150,
        showCharacter: false,
        padding: 5,
        //是否显示底色
        showOutline: false,
        //错几次开始有提示 false禁用
        showHintAfterMisses: 3,
        //完成后闪烁
        highlightOnComplete: false,
    });
    ceshi.quiz({
        //完成百分比调用
        onMistake: function(strokeData) {
            console.log(strokeData);
        },
        onCorrectStroke: function(strokeData) {
            console.log(strokeData);
        },
        onComplete: function(summaryData) {
            console.log(summaryData);
        }
    });
    </script>
</body>
</html>
```
```js
//其他方法
//除了动画和测验的核心功能，还提供了其他方法来控制汉字的渲染。
writer.setCharacter(newCharacter) //加载一个新的汉字并渲染.
writer.showCharacter() //显示当前隐藏的汉字。
writer.hideCharacter() //隐藏当前显示的汉字。
writer.showOutline() //显示当前隐藏汉字的轮廓。
writer.hideOutline() //隐藏当前汉字显示的轮廓。
writer.updateColor(colorName, newValue) //更改任何颜色选项的值。 例如: writer.updateColor('strokeColor', '#AA12CD')
writer.cancelQuiz() //立即取消当前运行的测验
```

## 高级用法
#### 加载汉字数据
[笔画动画加载库](https://github.com/chanind/hanzi-writer-data/tree/master/data)
```js
var writer = HanziWriter.create('target', '我', {
  charDataLoader: function(char, onComplete) {
    $.getJSON("/my/server/" + char + ".json", function(charData) {
      onComplete(charData);
    });
  }
});
        
```

原生汉字转svg
```js
HanziWriter.loadCharacterData('六').then(function(charData) {
  var target = document.getElementById('target');
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.width = '150px';
  svg.style.height = '150px';
  target.appendChild(svg);
  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  // set the transform property on the g element so the character renders at 150x150
  var transformData = HanziWriter.getScalingTransform(150, 150);
  group.setAttributeNS(null, 'transform', transformData.transform);
  svg.appendChild(group);

  charData.strokes.forEach(function(strokePath) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'd', strokePath);
    // style the character paths
    path.style.fill = '#555';
    group.appendChild(path);
  });
});
```
把字按照笔画顺序分解成步骤
```js
function renderFanningStrokes(target, strokes) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.width = '75px';
  svg.style.height = '75px';
  svg.style.border = '1px solid #EEE'
  svg.style.marginRight = '3px'
  target.appendChild(svg);
  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  // set the transform property on the g element so the character renders at 75x75
  var transformData = HanziWriter.getScalingTransform(75, 75);
  group.setAttributeNS(null, 'transform', transformData.transform);
  svg.appendChild(group);

  strokes.forEach(function(strokePath) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'd', strokePath);
    // style the character paths
    path.style.fill = '#555';
    group.appendChild(path);
  });
}

HanziWriter.loadCharacterData('是').then(function(charData) {
  var target = document.getElementById('target');
  for (var i = 0; i < charData.strokes.length; i++) {
    var strokesPortion = charData.strokes.slice(0, i + 1);
    renderFanningStrokes(target, strokesPortion);
  }
});
```
