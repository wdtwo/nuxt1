---
title: request请求数据乱码
date: 2023-05-15 10:33:00
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: [前端]
tags: [node]
draft: false
---

1. 设置 `encoding` 属性为 'utf8'
2. 设置响应头的 `Accept-Encoding` 字段为 'utf-8'
3. 使用第三方库 `iconv-lite` 进行编码转换

<!--more-->
```js
const request = require('request');
const options = {
  url: 'http://example.com',
  encoding: 'utf8' // 设置编码方式为 'utf8'
};
request(options, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(body); // 这里的 body 应该显示中文正常
  }
});
```

```js
const request = require('request');
const options = {
  url: 'http://example.com',
  headers: {
    'Accept-Encoding': 'utf-8' // 指定接受的编码方式为 'utf-8'
  }
};
request(options, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(body); // 这里的 body 应该显示中文正常
  }
});
```

```bash
npm install iconv-lite
```
```js
const request = require('request');
const iconv = require('iconv-lite');
const options = {
  url: 'http://example.com',
  encoding: null // 设置 encoding 为 null，以获取原始的字节数据
};
request(options, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const decodedBody = iconv.decode(body, 'utf8'); // 使用 iconv 进行编码转换
    console.log(decodedBody); // 这里的 decodedBody 应该显示中文正常
  }
});
```

## 小说阅读gb2312转换为utf-8
```js
const axios = require('axios');
const cheerio = require('cheerio');
const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const iconv = require('iconv-lite');  
const https = require('https');  
const app = new Koa();
const router = new Router();

// 设置静态文件目录
const staticPath = path.join(__dirname, 'public');
app.use(serve(staticPath));
app.use(bodyParser());

router.post('/getPages', async (ctx) => {
  // 目标网站的URL
  const body = ctx.request.body;
  if (body && body.url) {
    // 使用axios发送HTTP请求获取HTML内容
    // 构造请求头部信息
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
      'cookie':"cf_chl_3=37be84a8cd3c263;cf_clearance=6ttfCy6FiTwm.O.u_kvRO8fYwGCk63azSaZBhbp6y50-1710649771-1.0.1.1-x6tbLBsxcDRpH6c12E1UEMMD9GLIPNiNevlcazAjNgFRQEL0IMHpSL_cTVzNoFDX1VR6aq78iGfQt.dTnUW8rg;"
        
    };
    await axios.get(body.url, {  
      headers: headers,
      // httpsAgent: new https.Agent({  
      //     // rejectUnauthorized: false // 禁用证书验证  
      // })  
      responseType: 'arraybuffer' // 指定响应类型为arraybuffer
    }).then(response => {
      const html = iconv.decode(response.data, 'gb2312');
      const $ = cheerio.load(html);
      let next = ""
      let prev = ""
      let content = ""
      let title = ""
      // 获取标题
      title = $('.chaptertitle').html()
      // 获取正文
      for(let i = 0;i < $('#content p').length;i++){
        // 过滤广告标签
        if(!($('#content p').eq(i).attr('style')|| $('#content p').eq(i).attr('class'))){
          content += $('#content p').eq(i).html()
        }
      }
      // 上一页 下一页链接
      prev = `https://www.feisxs.com/Html/44069/${$('#prev').attr('href')}`
      next = `https://www.feisxs.com/Html/44069/${$('#next').attr('href')}`
      // 打印标题
      ctx.body =  {
        title,
        content,
        next,
        prev
      }
    }).catch((error) => {  
      ctx.status = 300; // Bad Request
      ctx.body = error;
    });
  } else {
    ctx.status = 400; // Bad Request
    ctx.body = '获取数据出错';
  }
});
// 使用路由中间件
app.use(router.routes());
// 处理不存在的路由
app.use((ctx) => {
    ctx.status = 400;
    ctx.body = 'Bad Request';
});
// 使用路由
app.use(router.allowedMethods());
// 监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`应用运行在 http://localhost:${port}`);
});
```