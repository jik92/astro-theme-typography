title: Store Hbase/Phoenix
date: 2017/01/09 09:47:24
categories:
 - tryghost

tags:
 - store 
 - devops 



---

## 背景
![](http://img.sandseasoft.com/image/8/27/e8ceb60d99b8c659065515c9a01c4.png)

基于HDFS的NoSQL数据库
```language-base
# 启动 16010 端口
export JAVA_HOME=xxxx
./bin/hbase start
```

## 最佳实践
挂载Phoenix，用Squirrel GUI进行GUI查询

To install a pre-built phoenix, use these directions:

* Download and expand the latest phoenix-[version]-bin.tar.
* Add the phoenix-[version]-server.jar to the classpath of all HBase region server and master and remove any previous version. An easy way to do this is to copy it into the HBase lib directory (use phoenix-core-[version].jar for Phoenix 3.x)
* Restart HBase.
* Add the phoenix-[version]-client.jar to the classpath of any Phoenix client.


```language-bash
# loading Data
./sqlline.py localhost ../examples/stock_symbol.sql
.psql.py localhost ../examples/web_stat.sql ../examples/web_stat.csv ../examples/web_stat_queries.sql

# query Data
./sqlline.py localhost
!tables
!exit

select * from xx;
```
Squirrel使用，增加一个Driver，增加一个Ailaes
## 引用
http://hbase.apache.org/
http://phoenix.apache.org/
http://phoenix.apache.org/installation.html
http://www.squirrelsql.org/
http://www.cnblogs.com/yyhh/p/6106472.html










