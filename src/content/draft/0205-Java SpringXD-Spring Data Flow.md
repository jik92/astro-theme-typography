title: Java SpringXD/Spring Data Flow
date: 2017/10/17 01:53:38
categories:
 - tryghost

tags:
 - 未归档 



---

```
SpringDataFlow 是 XD的重构版本，相对而言XD是一个平台，DataFlow更像是一个框架，都是对ETL业务处理场景产生的中间件。
```
https://docs.spring.io/spring-xd/docs/1.3.1.RELEASE/reference/html/

```
Usage:
 To start XD single node (runs in foreground):
     xd-singlenode

 To start XD admin and container separately (all run in foreground):
     brew update && brew install redis
     brew install zookeeper
     redis-server
     hsqldb-server
     zkServer start
     xd-admin
     xd-container

 Start XD Shell:
     xd-shell

 Create your first stream by typing following in xd shell:
     xd:> stream create --definition "time | log" --name ticktock

 Documentation:
    http://docs.spring.io/spring-xd/docs/1.3.1.RELEASE/reference/html/
```



