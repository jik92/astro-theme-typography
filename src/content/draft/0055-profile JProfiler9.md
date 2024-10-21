title: profile JProfiler9
date: 2015/11/23 02:00:52
categories:
 - tryghost

tags:
 - manage 
 - java 



---

# 官网

jprofiler9新版，支持remote ssh tunnel，跳版机...JVM界的idea
[www.ej-technologies.com/products/jprofiler/overview.html
]()

## 破解:
key L-Larry_Lau@163.com# 36573-fdkscp15axjj6# 25257

## 使用
下载两份包，一份 gui，一份 linux agent

### gui 相关

 * session->ide integrations
 * telemetries->各种监控面板，可以添加自定义 MBeans
 * live memory->实时看内存使用状态
 * cpu views->实时看 cpu 使用状态，可以看方法调用时间 trace
 * heap walker->根据dump整体分析一个 heap 的内容，这里可以对 hprof快照分析
 * threas/monitoers、locks
 * databases->连接池状态，slow sqls
 * MBeans->查看、添加自定义 beans

比较有用的功能

 * remote ssh profiling
 * live memory all objects aggregations level by packages
 * javascrtipt XHR
 * databases jdbc hotspots
 * class loaders
 * MBeans-> java.lang.*

学会查看cpu 占用百分比，找出性能瓶颈，根据28定律优化到最佳。
内存问题查看class cpu profile，很多时候 cglib 不会造成内存泄露，但是 load 过高，内存自然无法释放。找出 io、net io、cpu 、sql的瓶颈尝试优化。

### agent
相关教程

http://blog.ej-technologies.com/2015/11/remote-profiling-through-ssh-tunnel.html

 1. agent.tar.gz upload 到 servers
 2. 执行./bin/jpenable会自动找到需要监听的 jvms 开启端口
 2. ssh remote views, gui settings




