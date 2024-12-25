---
title: git常用命令
date: 2023-03-05 18:45:24
image: https://cdn.wdtwo.com/anzhiyu/github456456.webp
category: 
- 前端
tags: 
- git
---

Git 常用命令速查表

## 查看版本号
```bash
git --version #查看版本号
```
## 设置用户信息
```bash
git config --global user.name "admin" # 配用户名
git config --global user.password "admin" # 配置密码
git config --global user.email "xxx@xxx.com" #配置邮件
```
## 查看当前用户的信息
```bash
git config --global --list
```
## 初始化本地版本库
```bash
git init #初始化本地版本库
```
## 创建版本库

```bash
git clone 'https://github.com/flower-corp/rosedb.git' #克隆远程版本库
git clone 'https://github.com/flower-corp/rosedb.git' test #克隆远程版本库并命名为test

git add xyz #添加xyz版本管理
git add . #添加当前子目录下所有更改过的文件至index
git commit -m 'xxx' # 提交并填写注释
git commit --amend -m 'xxx' #合并上一次提交（用于反复修改）
git commit -am 'xxx' # 将add和commit 合并为一步

git push test main:master # 推送本地分支main到线上分支master
git push test master # 如果本地分支和线上分支名字相同则可以省略:master

git push test # 如果本地分支和线上分支已经建立跟踪 则可以省略分支名称master
git push -u test master # 自动将本地分支与远程分支建立跟踪
```

## 修改和提交
```bash
git status #查看当前版本状态(是否修改)
git diff  #查看变更内容
git mv xyz abc  #文件改名
git rm xxx  #删除文件
git rm -r * # 删除文件和文件夹下面的所有文件
git rm --cached <file>  #停止跟踪文件但不删除
git commit -m "message"  #提交所有更新过的文件
git commit --amend  #修改最后一次提交
```

## 查看提交历史
```bash
git log #查看提交历史
git log -p <file> #查看指定文件的提交历史
git blame <file> #以列表方式查看指定文件的提交历史

```

## 撤消

```bash
git reset --hard HEAD  #撤消工作目录中所有未提交文件的修改内容  可以解决线上线下不同步问题
git checkout HEAD <file> #撤消指定的未提交文件的修改内容
git revert <commit>  #撤消指定的提交

```

## 分支与标签

```bash
git branch -vv # 用来检测是否建立跟踪   如果显示[remote/origin/branch-name]表示本地分支与远程分支建立跟踪关系,如果类似branch-name 1235534 [origin/remote-branch]则表示本地分支已经配置了上游分支
git branch --set-upstream-to=origin/main master # 将本地分支master与origin库的main分支建立跟踪 亲测失败
git branch  #显示所有本地分支
git branch -a #显示所有分支
git branch -r #显示所有原创分支
git branch <new-branch> #创建新分支
git branch -d <branch>  #删除本地分支

git chechout v2.0 # 检出版本2.0
git checkout <branch/tag>   #切换到指定分支或标签


git tag #列出所有本地标签
git tag<tagname>    #基于最新提交创建标签
git tag-d <tagname> #删除标签

```

## 合并与衍合
```bash
git merge origin master #合并指定分支到当前分支
git rebase <branch> #衍合指定分支到当前分支
```

## 远程操作
```bash
git remote -v #查看远程版本库信息
git remote show <remote> #查看指定远程版本库信息
git remote add <remote> <url> #添加远程版本库
git fetch <remote> #从远程库获取代码
git pull <remote> <branch> #下载代码及快速合并
git push <remote> <branch> #上传代码及快速合并
git push <remote> :<branch/tag-name> #删除远程分支或标签
git push --tags #上传所有标签

git stash # 暂存当前修改，将所有至为HEAD状态
git stash list # 查看所有暂存

git grep "delete from" # 文件中搜索文本"delete from"

```
## 设置代理访问
```bash
git config --global http.proxy 'http://127.0.0.1:1080'
git config --global https.proxy 'http://127.0.0.1:1080'

# 删除代理
git config --global --unset http.proxy
git config --global --unset https.proxy

npm config delete proxy

# 查看配置
git config --list
```
直接编辑配置文件
```bash
git config --global --edit

# 内容
[http]
proxy = http://127.0.0.1:1080
[https]
proxy = http://127.0.0.1:1080
```

## 每次都要登录的情况配置
在项目根目录下
```bash
git config --global credential.helper store
git config --global credential.username ""
git config --global credential.password ""
git config --global credential.email "@ethank.com"
```

## 忽略文件 .gitignore
```bash
*.png
```
