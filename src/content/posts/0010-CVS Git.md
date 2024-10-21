---
title: CVS Git 1
pubDate: 2014-12-24
categories: [ 'git' ]
description: ''
---

SourceTree
git

> 非常好的版本控制系统

![](http://img.sandseasoft.com/image/7/6f/60376e015ea1836d1fc152594e99a.png)

#### 必装软件

SourceTree by Bitbucket

#### 基本命令

```
git clone
git pull
git push
git commit
git branch
git submoudule
git flow
```

#### 子模块相关操作

.gitmodules

```
[submodule "dmj-web/dmj-web-trades/src/main/webapp/fedev"]
	path = dmj-web/dmj-web-trades/src/main/webapp/fedev
	url = git@git.superboss.cc:dmj/dmj-frontend.git
[submodule "dmj-web/dmj-web-trades/src/main/webapp/fedevkm"]
	path = dmj-web/dmj-web-trades/src/main/webapp/fedevkm
	url = git@git.superboss.cc:dmj/dmj-frontend-km.git

```

初始化一个带有 submodule 的 repository

```linux
git clone --recursive /path/to/repos/foo.git
```

```linux
git submodule 
git submodule init
git submodule update  # 慎用, 会更新掉本地的修改信息, 如果要进行修改提交, 进去具体的 module 进行 commin push 操作
git submodule foreach git pull origin master
```

#### 基本原理

一共有两个远程仓库origin/master分别在远程和本地, 也就是说所有的branch/trunk都会有两份备份,在提交orgin的时候要保证本地版本是最新的.

也就是说基本操作流程无外乎:

1. pull一下master and megre or resolve comflict
2. master get branch
3. edit branch
4. 如果未完成, commit branch 到 orgin<br/>
   如果完成, check master, megre branch into..and resolve comflict
5. commit master

> 就像大树的根一样, 所有的分支最后都汇流到主干上.

常用的标记有3种

<table>
 <tr> <td> tag </td> <td>稳定的大版本</td><td>2.0.0</td> </tr>
  <tr> <td> branch </td> <td>开发版的分支</td><td>1.9.1_20141224_1</td></tr>
   <tr> <td> trunk </td> <td>主干</td><td> 1.9.0</td> </tr>
    <tr> <td> hotfix </td> <td>补丁</td><td> 1.9.1</td> </tr>
</table>

#### .gitignore

```
##   配置语法：
# 　 以斜杠“/”开头表示目录；
# 　 以星号“*”通配多个字符；
# 　 以问号“?”通配单个字符
# 　 以方括号“[]”包含单个字符的匹配列表；
## 　以叹号“!”表示不忽略(跟踪)匹配到的文件或目录；

# exp

.idea/*
*.iml
```

[这里](https://github.com/github/gitignore)有几乎所有的.ignore文件配置清单/idea plugin

#### 进阶Git Flow

http://www.ituring.com.cn/article/56870

#### 书籍

https://github.com/progit/progit
https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md

#### github克隆平台

https://github.com/gitlabhq/gitlabhq

#### 工作总结

开一个dev分支，进行开发， 然后切到Master先fetch然后megre，最后commit到远程 orgin/master

```language-bash
git checkout -b snapshot --track origin/snapshot
git branch -vv   # 映射分支版本
git branch -v    # 所有分支版本
git fetch origin # 更新远程分支
git status       # check local files status
git add .        # add all files
git commit -m "" # commit
git pull origin snapshot 
git push origin snapshot

git config core.ignorecase false # 关闭忽略大小写变更
git rm --cached logs/xx.log
git reset --hard # 重置最近一次 git pull
git clean -f     # clean untracked file
git reflog master# check recet 5 operating record
ls | xargs -P10 -I{} git -C {} pull
```

> http://justcoding.iteye.com/blog/1830388

```language-bash
git reset --hard # 重置最近一次 git pull
git push -f origin master
```

如果使用cygwin的话， 使用ssh证书之前需要执行操作

```language-bash
eval `ssh-agent`
ssh-add ~/.ssh/rsa
```



