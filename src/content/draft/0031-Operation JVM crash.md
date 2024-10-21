title: Operation JVM crash
date: 2015/05/11 19:43:23
categories:
 - tryghost

tags:
 - java 



---

# 引言
基本上， 分两块

![](http://img.sandseasoft.com/image/d/a6/77de7e70176aa7fb0a5788b26cb68.png)



#### reason
ref

 1. strong ref->no gc
 2. soft ref->cache
 3. weak ref->gc
 4. phantom ref->absultion gc

memony 
	
![](http://img.sandseasoft.com/image/1/19/d4ef9d1b34de2f20c8312653ce4b2.png)

shallow size/retained size

![](http://img.sandseasoft.com/image/0/d5/b8e7aaa7c064d0a96e8b070877c4a.png)


#### online dump
config jvm
```
# 溢出 heapdump
-XX:HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=\heap_online.bin
# 溢出 运行命令, 可以通知服务器
-XX:OnOutOfMemoryError=sh oom.sh %p /data/project/dmj-items-sync/tomcat/bin
# 查看类加载信息
-verbose
# catlina.sh 调大内存
JAVA_OPTS='-Xms128m -Xmx1536m -XX:MaxPermSize=512m -Duser.home=/data/project/xxx/'

jinfo pid
```
oom.ssh
```
jstack -F $1 >$2/`date "+%Y%m%d_%H%M%S"`_$1.stack
# 本机IP
time = `date "+%Y-%m-%d %H:%M:%S"`
localIp=`ps -ef|grep rsyn |grep address|  awk -F '='  '{print $2}'`
echo "name=$2&ip=$localIp&time=$time&pid=$1"
curl -d "name=$2&ip=$localIp&time=$time&pid=$1" "http://www.baidu.com:9685/oom.jsp"
echo `date "+%Y%m%d_%H%M%S"` $1 $2 >> oom.log
```

find pid
```
ps -ef |grep dmj-items-sync		# search pid
```
dump memony snapshot
```
jstack xxxx								# 栈空间 ,  检查现成锁
jmap -dump:format=b,file=heap.bin  pid	# 导出 dump HPROF文件
jmap -histo:live pid					# 堆空间dump/只查看存活对象

```
online 查询 gc 情况
```
jstat -gcutil 22671 1000 1000
```

文件过大分割
```
split -b 300m a.map						# 分割 map 文件
cat x* > a.map							# 合并 map 文件
```


#### 离线分析 dump

Memory Anylise
 
 1. download:http://www.eclipse.org/mat/downloads.php
 2. open dump file

jhat
```
jhat -J-Xmx512m a.map					# 分析 map http://localhost:7000
```


![](http://img.sandseasoft.com/image/2/ce/78ae16673e1ec537428cd3312c843.png)

#### referance
>http://www.oschina.net/question/129540_23220



