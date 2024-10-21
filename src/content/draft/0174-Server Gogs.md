title: Server Gogs
date: 2016/12/14 15:26:05
categories:
 - tryghost

tags:
 - devops 



---

### 背景
自己的乞丐服务器装不了confluence或者gitlab，都是内存大户，看上了这个gogs，go语言内存还是控制的漂亮的，空转启动30m内存左右

### 官网
https://gogs.io/


### 安装
```language-bash
yum install git


#  Pull image from Docker Hub.
$ docker pull gogs/gogs

#  Create local directory for volume.
$ mkdir -p /var/gogs

#  Use `docker run` for the first time.
$ docker run --name=gogs -p 10022:22 -p 10080:3000 -v /var/gogs:/data gogs/gogs

#  Use `docker start` if you have stopped it.
$ docker start gogs
```
PS 新版本有 bug，换0.9.9可以



