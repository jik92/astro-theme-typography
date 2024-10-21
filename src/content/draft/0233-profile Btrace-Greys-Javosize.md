title: profile Btrace/Greys/Javosize
date: 2017/11/29 09:00:43
categories:
 - tryghost

tags:
 - 未归档 



---




# 线上排查工具使用

## Btrace

https://github.com/btraceio/btrace

## Greys
```language-bash
# 连接greys ，默认开启远程3658端口
sh greys.sh 19420@127.0.0.1:3658
# 获取当前类的实例
sc com.tech84.conf.Info
# 获取当前类的方法
sm com.tech84.conf.Info
# 监控某个方法的调用
monitor -c 5 com.tech84.Run list
# 获取请求链路信息
trace com.tech84.Run list
# 获取请求链路信息 带过滤器
ptrace com.tech84.Run list
# 查看某个方法的调用栈
stack com.tech84.Run list
# 查看某个方法调用的数据
watch -s com.tech84.Run list params[0]|returnObj
# 获取jvm信息
jvm
# 获取cpu占用最高的线程
top
# 重置所有被asm改变的类
reset
```
![20171129151195349134768.png](http://img.sandseasoft.com/20171129151195349134768.png)

## Javosize
```language-bash
## 可以查询所有接口请求的性能状况
cd apps && cat application
## 查询内存状况
cd memory && ls
## 查询死锁 和 full gc
cd problems && ls
## 查询内存消耗
cd repository && exec TOP_MEMORY_CONSUMERS 5 com.tech84.* false
## 查询执行最慢的方法
cd repository && exec FIND_SLOW_METHODS_EXECUTING_CLASS  com.tech84.* 10 10000
## 查询thread dumpp
cd threads && help
```
## 引用
https://yq.aliyun.com/articles/69520?utm_content=m_10360



