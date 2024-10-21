title: NameServer-Zookeepr相关
date: 2016/01/07 07:30:28
categories:
 - tryghost

tags:
 - store 



---

zookeeper
http://zookeeper.apache.org
分布式文件系统，数据一致性,名空间管理

curator
http://curator.apache.org/
客户端，断线重连，队列，文件存储， 选举算法常见的算法 case 都有一套常见的 api 使用

exhibitor
https://github.com/Netflix/exhibitor
监控系统， 一般使用 superivor 守护进程就好了

etcd、Consul


disconf 的配置中心方案
https://github.com/knightliao/disconf


Zoo 使用
```language-bash
telnet 0.0.0.0 2181

conf

```



