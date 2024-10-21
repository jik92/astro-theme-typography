title: Linux supervisord
date: 2015/11/18 05:18:09
categories:
 - tryghost

tags:
 - devops 



---

## 文档

http://supervisord.org/

守护进程的一个工具，基于 psutil 包，大概原理就是扫描当前进程是否存活，死掉就执行相关命令

一个常规的后台进程开启
```language-bash
!# bin/bash
nohup ./kibana >/dev/null 2>&1 &
```


## 使用

```language-bash
##  安装
pip install supervisor
echo_supervisord_conf > /etc/supervisord.conf
##  启动 deamon
supervisord
##  后台管理
supervisorctl
supervisorctl>
##  相关命令
start stop reload update
```
## supervisord.conf

里面注释齐全，自己可以学习。
 
 * 开启 web gui
```language-python
[inet_http_server]         ; inet (TCP) server disabled by default
port=0.0.0.0:9001        ; (ip_address:port specifier, *:port for all iface)
username=user              ; (default is no username (open server))
password=123               ; (default is no password (open server))
```
 * 开启一个守护
```language-python
[program:ddd]
command=sh root/echo.sh
autorestart=true
```
![](http://img.sandseasoft.com/image/d/63/67eecb51f7eda15f9b7e09749d26e.png)



