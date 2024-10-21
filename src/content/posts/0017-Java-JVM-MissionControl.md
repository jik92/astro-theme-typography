---
title: Java-JVM/MissionControl
pubDate: 2014-12-31
categories: [ 'java' ]
description: ''
---

# 查看 jvm 常用的命令

* ps -ef| grep name （查询进程 pid）
* netstate -tupln (查询端口占用)
* jinfo  <pid> -lmvV（查询所有环境变量）
  ![](http://pic002.cnblogs.com/images/2012/422908/2012073109465349.jpg)

# 调整 jvm 参数

```language-bash
# 生产模式
-server 
# 堆空间，这两个相同
-Xms1024M
-Xmx1024M
# (S0+S1+Eden)：Old，默认1
-XX:NewRatio=1 
# (S0+S1)：Eden，默认 8
-XX:SurvivorRatio
# 年轻带大小，可以不设置
-XX:NewSize
# 永久带大小，这里理论256M
-XX:PermSize
-XX:MaxPermSize
```

一份 G1的样例

```language-bash
-Xms1536m 
-Xmx1536m 
-XX:MaxPermSize=256m 
-XX:PermSize=300m 
-XX:+UseG1GC 
-XX:MaxGCPauseMillis=2000 
-XX:G1HeapRegionSize=8 
-XX:G1ReservePercent=15 
-XX:NewRatio=3 
-XX:SurvivorRatio=5 
-XX:+AggressiveOpts 
-XX:+UseFastAccessorMethods 
-XX:+UseBiasedLocking 
-XX:+UseCompressedOops 
-XX:+HeapDumpOnOutOfMemoryError 
-server 
-verbose:gc 
-XX:+PrintGCTimeStamps 
-XX:+PrintGCDetails 
-XX:+PrintTenuringDistribution 
-Xloggc:logs/gc.log
```

http://blog.csdn.net/imzoer/article/details/8036699
http://www.blogjava.net/dongbule/archive/2011/08/21/356987.html
http://www.cnblogs.com/lingiu/p/3866559.html
http://iamzhongyong.iteye.com/blog/1333100
http://www.cnblogs.com/lingiu/p/3866559.html

# 查看运行时命令

* java –verbose:[gc|class]
* jmap -heap pid (直接查看堆)
* jmap -histo:live 15304 |more > histo.log （查看 heap 内存, 触发gc）
* jmap -permstat 15304 > permstat.log（查看 no-heap 内存，较慢, stop the world!）
* jmap -dump:format=b,file=mem.hprof <pid> （打印整个内存快照，分析，stop the world!）
* jstat -gcutil pid frequency (实时打印 gc 情况，单位内存所占百分比%)
* jstat -[gccapacity|gcpermcapacity] pid frequency （单位次数）
* jstat -class 21806 （类加载数量，所占PermGen空间信息）

# 关于内存设置

* Heap size的值，其初始空间(即-Xms)是物理内存的1/64，最大空间(-Xmx)是物理内存的1/4。
* gc一天最好不要超过48次，full GC频率 平均大约半小时1次
* 如果你发现每次GC后，Heap的剩余空间会是总空间的50%，这表示你的Heap处于健康状态。
* 许多Server端的Java程序每次GC后最好能有65%的剩余空间。
* Server端JVM最好将-Xms和-Xmx设为相同值。
* 最好让-Xmn值约等于-Xmx的1/3
* 每10到20秒间运行一次GC，每次在半秒之内完成
* -Xmn12m young代大小，sun推荐整个heap的3/8，太大会减少old的大小，引发较频繁 的major gc
* -XX:+CMSClassUnloadingEnabled 允许perm区不够引发full gc时perm区的类卸载
* java的内存=堆内存（Xmx）+ 方法区内存（MaxPermSize）+ 栈内存（Xss,包括虚拟机栈和本地方法栈）*线程数 + NIO direct memory +
  socket缓存区（receive37KB，send25KB）+ JNI代码 + 虚拟机和GC本身
* Minor GC执行的很快（小于50ms）
* Minor GC执行的并不频繁（大概10秒一次）
* Full GC执行的很快（小于1s）
* Full GC执行的并不频繁（10分钟一次）

# 查看 CPU 占用最高的线程

* 一般的 jps -Vv 查找当前 pid
* top -H -p pid 找到cpu 消费最高的线程的 pid
* jstack -p pid |grep 线程 pid 转16进制
* https://github.com/jik1992/fork-jcpu.sh

# 关于 PermGen OOM

1. pg 一般128-256m 之间已经完全够用，oom 导致可能由于过多的加载类，此类原因调大 PermGen 大小即可，后续趋于稳定。
2. 还有一种可能DelegatingClassLoader不会回收，由于本地反射使用不当。或者YGC过于频繁,导致无法进入Perm空间的回收事件。
3. 这里打开 verbose:class 发现一个问题，大量的通过 cglib 生成重复的对象，这些 class 加载是要吃 PermGen 的，基本上就是
   ibaties 中使用到，所以内存问题基本确定在 batchinsert 的使用。优化使用事务，取消 ibaties 原型标签。

![](http://img.sandseasoft.com/image/d/1a/7ef151c4e7a932447d9e087cce1ca.png)

# 远程监控VisualVM

PS, 两边版本一致。

## 远程安装 jstatd

vim jstatd.policy

```language-java
grant codebase "file:${java.home}/../lib/tools.jar" {
   permission java.security.AllPermission;
};
```

```language-bash
nohup ./jstatd -J-Djava.security.policy=jstatd.policy -J-Djava.rmi.server.hostname=<外网 IP> &
```

最后进VisualVM直接add remote jstatd address

## tomcat 挂载 JMX

```language-bash
JAVA_OPTS='-Dcom.sun.management.jmxremote.port=8099 
-Dcom.sun.management.jmxremote.ssl=false 
-Dcom.sun.management.jmxremote.authenticate=false 
-Djava.rmi.server.hostname=<外网 IP>' 
```

最后进VisualVM直接add remote JMX address

PS 最后发现 Java8里面的 MissionControl 是可以兼容上面的方案的 :)

![](http://img.sandseasoft.com/image/2/02/d487d0df49431b94cfb24836f6713.png)

# MAT

启动8G内存

```language-bash
open -a MemoryAnalyzer --args -vmargs -Xmx8g
```

# 文章收集

[Jstat](http://docs.oracle.com/javase/1.5.0/docs/tooldocs/share/jstat.html# gcutil_option)

[G1 GC实践](http://zhaoyanblog.com/?s=G1%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E5%99%A8)



