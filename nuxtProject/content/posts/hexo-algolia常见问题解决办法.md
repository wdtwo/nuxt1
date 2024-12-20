---

title: algolia常见问题解决办法
date: 2023-01-12 19:01:04
cover: https://cdn.wdtwo.com/anzhiyu/hexo4567567.png
category: [其他]
tags: [Hexo]
draft: false
---

- 报错：`Usage: hexo <command>`
- 报错：Please set an HEXO_ALGOLIA_INDEXING_KEY environment variable to enable content indexing.
- 报错：Method not allowed with this referer

<!--more-->

```bash
# _config.yml
# 搜索
algolia:
    applicationID: 'applicationID'
    apiKey: 'apiKey'
    indexName: 'hexo'
    adminApiKey: 'adminApiKey'
    chunkSize: 5000
    
aomori_search_algolia: true
```


## hexo algolia常见问题解决办法

```bash 
hexo algolia
```
### 报错`Usage: hexo <command>`
```bash
Usage: hexo <command>

Commands:
  clean     Remove generated files and cache.  config    Get or set configurations.  deploy    Deploy your website.  generate  Generate static files.  help      Get help on a command.  init      Create a new Hexo folder.  list      List the information of the site  migrate   Migrate your site from other system to Hexo.  new       Create a new post.  publish   Moves a draft post from _drafts 
to _posts folder.  render    Render files with renderer plugins.  server    Start the server.  version   Display version information.
Global Options:
  --config  Specify config file instead of using _config.yml  --cwd     Specify the CWD  --debug   Display all verbose messages in the terminal  --draft   Display draft posts  --safe    Disable all plugins and scripts  --silent  Hide output on console
For more help, you can use 'hexo help [command]' for the detailed information
or you can check the docs: http://hexo.io/docs/
```
原因：未安装`hexo algolia`插件
解决办法1：在hexo 项目根目录执行npm安装命令
```bash
npm install hexo-algolia --save
```
### 报错：Please set an HEXO_ALGOLIA_INDEXING_KEY environment variable to enable content indexing.

```bash
ERROR [hexo-algolia] Please set an `HEXO_ALGOLIA_INDEXING_KEY` environment variable to enable content indexing.
ERROR >> Read https://npmjs.com/hexo-algolia#api-key for more informations.
```
原因：需要将API密钥添加到系统环境变量
解决办法1：执行export设置环境变量命令
```bash
export HEXO_ALGOLIA_INDEXING_KEY=AdminAPIKey
```
上述命令直接在windows cmd或powershell中执行会报错，需要在git bash中执行,不需要重启电脑，但该方法设置的环境变量为临时变量，重启会失效

解决办法2：
右键点击我的电脑 > 属性 > 高级系统设置 > 环境变量
在用户变量中点击新建，添加环境变量，变量名为`HEXO_ALGOLIA_INDEXING_KEY` 值为 `Algolia admin key` ， 添加后点击确认，重启电脑后新增的环境变量生效(添加到系统变量中也是可以的)
环境变量设置成功后，执行hexo algolia 即可生成索引文件

### 报错：Method not allowed with this referer

```bash
INFO  [hexo-algolia] Testing HEXO_ALGOLIA_INDEXING_KEY permissions.
INFO  Start processing
INFO  [hexo-algolia] 47 records to index (post, page).
INFO  [hexo-algolia] Indexing chunk 1 of 1 (47 records)
ERROR [hexo-algolia] Method not allowed with this referer
INFO  [hexo-algolia] Indexing done.
```
原因：使用了查询API key环境变量中设置的密钥需要为Admin KEY

解决办法：
登录Algolia官网，进入api key控制台

复制Admin API Key 修改环境变量`HEXO_ALGOLIA_INDEXING_KEY`的值为该`API Key`即可
PS：__config.yml文件中配置的API密钥为搜索密钥(`Search-Only API Key`)，请注意区分



