---
title: CVS Git 2
pubDate: 2020-12-20
categories: [ 'git' ]
description: ''
---
![](http://img.sandseasoft.com/image/7/6f/60376e015ea1836d1fc152594e99a.png)

# Software
* SourceTree by Bitbucket
* Gtihub Client

# Basic Command
```
git clone xxx.git
git pull origin master
git push [-f] origin master
git commit -m "xxx"
git branch [-D]
git rebase [--abort|--continue|--skip]
git fetch xxx origin master
git checkout [-b]
git reset --hard HEAD^
```

# Principle
一共有两个远程仓库origin/master分别在远程和本地, 也就是说所有的branch/trunk都会有两份备份,在提交orgin的时候要保证本地版本是最新的.

根据Gitlab的主流程:
```shell
git checkout -b new_pr_branch
git add .
git commit -m ""
git push origin new_pr_branch

# pull for request 
# approve by auto merge
```
Gist
```shell
git checkout -b snapshot --track origin/snapshot
git branch -vv   # 映射分支版本
git branch -v    # 所有分支版本
git fetch origin # 更新远程分支
git status       # check local files status
git add .        # add all files
git commit -m "" # commit
#使用rebase方式pull优化分支历史, 拒绝auto merge 
git config branch.master.rebase true
git pull --rebase origin snapshot 
git push origin snapshot

git config core.ignorecase false # 关闭忽略大小写变更
git rm --cached logs/xx.log
git reset --hard HEAD^ # 重置最近一次 git pull
git clean -f     # clean untracked file
git reflog master# check recet 5 operating record
ls | xargs -P10 -I{} git -C {} pull
```
# Gitflow
就像大树的根一样, 所有的分支最后都汇流到主干上.

<table>
 <tr> <td> tag </td> <td>稳定的大版本</td><td>2.0.0</td> </tr>
  <tr> <td> branch </td> <td>开发版的分支</td><td>1.9.1_20141224_1</td></tr>
   <tr> <td> trunk </td> <td>主干</td><td> 1.9.0</td> </tr>
    <tr> <td> hotfix </td> <td>补丁</td><td> 1.9.1</td> </tr>
</table>

# .gitignore

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
# Tips

如果使用cygwin的话， 使用ssh证书之前需要执行操作
```shell
eval `ssh-agent`
ssh-add ~/.ssh/rsa
```

## 子模块相关操作
.gitmodules
```shell
[submodule "dmj-web/dmj-web-trades/src/main/webapp/fedev"]
	path = dmj-web/dmj-web-trades/src/main/webapp/fedev
	url = git@git.superboss.cc:dmj/dmj-frontend.git
[submodule "dmj-web/dmj-web-trades/src/main/webapp/fedevkm"]
	path = dmj-web/dmj-web-trades/src/main/webapp/fedevkm
	url = git@git.superboss.cc:dmj/dmj-frontend-km.git

```
初始化一个带有 submodule 的 repository
```shell
git clone --recursive /path/to/repos/foo.git
```
```shell
git submodule 
git submodule init
git submodule update  # 慎用, 会更新掉本地的修改信息, 如果要进行修改提交, 进去具体的 module 进行 commin push 操作
git submodule foreach git pull origin master
```
# Quote
* 进阶Git Flow http://www.ituring.com.cn/article/56870
* 书籍
 * https://github.com/progit/progit
 * https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md
* github克隆平台
 * https://github.com/gitlabhq/gitlabhq
