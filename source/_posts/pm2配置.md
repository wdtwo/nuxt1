---
title: pm2配置
date: 2023-06-21 22:25:16
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- linux
- node
- pm2
---

[原文](https://www.jianshu.com/p/47259f48c153)
<!--more-->

PM2是可以用于生产环境的Nodejs的进程管理工具，并且它内置一个负载均衡。它不仅可以保证服务不会中断一直在线，并且提供0秒reload功能，还有其他一系列进程管理、监控功能。并且使用起来非常简单。pm2的官方文档已经进行详细的配置说明，在这里就不进行一一简述，主要讲的时我的koa项目怎样配合PM2进行相关管理或者说部署。PM2常用命令需要用的时候可以进行查看，没必要去背，用多就熟悉了。也可以结合在package.json里面，用自定义命令运行。我们在package.json的script配置和初始化文件ecosystem.config.js进行了多环境运行的配置，我们可以根据需要进行切换环境。

### package.json文件添加如下：
```js
"scripts": {
    "start": "node ./bin/www",
    "dev": "pm2 start ecosystem.config.js --env dev",
    "test": "pm2 start ecosystem.config.js --env test",
    "pro": "pm2 start ecosystem.config.js --env pro",
    "logs": "pm2 logs",
    "stop": "pm2 stop ecosystem.config.js"
},

//npm run start: 直接跑www文件，可用于调试
//npm run dev: 开发环境
//npm run test：测试环境
//npm run pro：生产环境
//npm run logs: 查看pm2的日志
//npm run stop： 停止pm2服务
```

### 新增ecosystem.config.js文件：
```js
module.exports = {
  apps : [{
    name: 'API',
    script: './bin/www',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch: [                           // 不用监听的文件
      'node_modules',
      'logs'
    ],
    max_memory_restart: '1G',
    env_pro: {
      "NODE_ENV": "production",
      "REMOTE_ADDR": ""
    },
    env_dev: {
      "NODE_ENV": "development",
      "REMOTE_ADDR": ""
    },
    env_test: {
      "NODE_ENV": "test",
      "REMOTE_ADDR": ""
    }
  }]
};
```

## pm2常用命令集合及配置文件说明
### 常用命令集合
```bash
pm2 start app.js              # 启动app.js应用程序
pm2 start app.js -i 4         # cluster mode 模式启动4个app.js的应用实例# 4个应用程序会自动进行负载均衡
pm2 start app.js --name="api" # 启动应用程序并命名为 "api"
pm2 start app.js --watch      # 当文件变化时自动重启应用
pm2 start script.sh           # 启动 bash 脚本
pm2 list                      # 列表 PM2 启动的所有的应用程序
pm2 monit                     # 显示每个应用程序的CPU和内存占用情况
pm2 show [app-name]           # 显示应用程序的所有信息
pm2 logs                      # 显示所有应用程序的日志
pm2 logs [app-name]           # 显示指定应用程序的日志
pm2 flush
pm2 stop all                  # 停止所有的应用程序
pm2 stop 0                    # 停止 id为 0的指定应用程序
pm2 restart all               # 重启所有应用
pm2 reload all                # 重启 cluster mode下的所有应用
pm2 gracefulReload all        # Graceful reload all apps in cluster mode
pm2 delete all                # 关闭并删除所有应用
pm2 delete 0                  # 删除指定应用 id 0
pm2 scale api 10              # 把名字叫api的应用扩展到10个实例
pm2 reset [app-name]          # 重置重启数量
pm2 startup                   # 创建开机自启动命令
pm2 save                      # 保存当前应用列表
pm2 resurrect                 # 重新加载保存的应用列表
pm2 update                    # Save processes, kill PM2 and restore processes
pm2 generate                  # Generate a sample json configuration file
pm2 start app.js --node-args="--max-old-space-size=1024"
pm2 start npm --name "my-nuxt" -- run start 指定参数启动
```

### 配置文件详细介绍
```js
{
    "apps": {
        "name": "wuwu",                             // 项目名          
        "script": "./bin/www",                      // 执行文件
        "cwd": "./",                                // 根目录
        "args": "",                                 // 传递给脚本的参数
        "interpreter": "",                          // 指定的脚本解释器
        "interpreter_args": "",                     // 传递给解释器的参数
        "watch": true,                              // 是否监听文件变动然后重启
        "ignore_watch": [                           // 不用监听的文件
            "node_modules",
            "logs"
        ],
        "exec_mode": "cluster_mode",                // 应用启动模式，支持fork和cluster模式
        "instances": 4,                             // 应用启动实例个数，仅在cluster模式有效 默认为fork；或者 max
        "max_memory_restart": 8,                    // 最大内存限制数，超出自动重启
        "error_file": "./logs/app-err.log",         // 错误日志文件
        "out_file": "./logs/app-out.log",           // 正常日志文件
        "merge_logs": true,                         // 设置追加日志而不是新建日志
        "log_date_format": "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
        "min_uptime": "60s",                        // 应用运行少于时间被认为是异常启动
        "max_restarts": 30,                         // 最大异常重启次数，即小于min_uptime运行时间重启次数；
        "autorestart": true,                        // 默认为true, 发生异常的情况下自动重启
        "cron_restart": "",                         // crontab时间格式重启应用，目前只支持cluster模式;
        "restart_delay": "60s"                      // 异常重启情况下，延时重启时间
        "env": {
           "NODE_ENV": "production",                // 环境参数，当前指定为生产环境 process.env.NODE_ENV
           "REMOTE_ADDR": "爱上大声地"               // process.env.REMOTE_ADDR
        },
        "env_dev": {
            "NODE_ENV": "development",              // 环境参数，当前指定为开发环境 pm2 start app.js --env_dev
            "REMOTE_ADDR": ""
        },
        "env_test": {                               // 环境参数，当前指定为测试环境 pm2 start app.js --env_test
            "NODE_ENV": "test",
            "REMOTE_ADDR": ""
        }
    }
}
```