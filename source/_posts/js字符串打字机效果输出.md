---
title: js字符串打字机效果输出
date: 2023-08-04 16:17:51
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Typewriter Effect</title>
    <style>
        #typewriter {
            white-space: nowrap;
            overflow: hidden;
            border-right: .15em solid orange;
            font-size: 24px;
            font-family: monospace;
            animation: wink .4s infinite;
            position: relative;
            display: inline-block;
        }
        @keyframes wink {
            0%,100% {
                border-right-color: transparent;
            }
            50% {
                border-right-color: orange;
            }
        }
    </style>
</head>
<body>
    <div id="typewriter"></div>
    <script>

        function typewriter(id,text = "This is a typewriter effect example.",delay = 100){
            let ele = document.getElementById(id)
            let typewriterText = '';
            let charIndex = 0; //索引

            function typeNextCharacter() {
                const char = text[charIndex];
                typewriterText += char
                outputText(typewriterText)
                charIndex++;
                if (charIndex < text.length) {
                    setTimeout(typeNextCharacter, delay);
                }else{
                    console.log('输出完成');
                    setTimeout(()=>{
                        delText()
                    },2000)
                }
            }
            function delText(){
                charIndex--;
                if(charIndex >= 0){
                    typewriterText =  typewriterText.substring(0, charIndex)
                    setTimeout(delText, 25);
                    outputText(typewriterText)
                }else{
                    console.log('删除完成!');
                }
            }
            function outputText(str){
                ele.innerHTML = str
            }
            setTimeout(typeNextCharacter, delay);
        }
        //  绑定的id 输出的字符 每个字符之间的间隔时间
        typewriter('typewriter',"This is a typewriter effect example.....",100)

    </script>
</body>
</html>
```