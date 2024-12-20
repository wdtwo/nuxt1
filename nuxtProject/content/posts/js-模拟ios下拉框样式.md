---
title: js模拟ios下拉框样式
date: 2023-05-31 09:52:31
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---
模拟ios下拉框样式
<!--more-->

[文档](https://www.pengwf.com/iosselect/index.html)
[仓库地址](https://github.com/zhoushengmufc/iosselect)

```html
<div class="pc-box">                     
    <input type="hidden" name="bank_id" id="bankId" value="">                     
    <span id="showBank">点击这里选择银行</span>  
</div>  
```
```js
var data = [
    {'id': '10001', 'value': '<b>工商银行</b><i>ICBC</i>'},
    {'id': '10002', 'value': '<b>农业银行</b><i>ABC</i>'},
];
var showBankDom = document.querySelector('#showBank');
var bankIdDom = document.querySelector('#bankId');
showBankDom.addEventListener('click', function () {
    var bankId = showBankDom.dataset['id'];
    var bankName = showBankDom.dataset['value'];

    var bankSelect = new IosSelect(1, 
        [data],
        {
            container: '.container',
            title: '银行卡选择',
            itemHeight: 50,
            itemShowCount: 3,
            oneLevelId: bankId,
            callback: function (selectOneObj) {
                bankIdDom.value = selectOneObj.id;
                showBankDom.innerHTML = selectOneObj.value;
                showBankDom.dataset['id'] = selectOneObj.id;
                showBankDom.dataset['value'] = selectOneObj.value;
            }
    });
});
```


