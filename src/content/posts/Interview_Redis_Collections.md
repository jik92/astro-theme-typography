---
title: Redis Collections
pubDate: 2024-1-1
categories: [ '面试','redis' ]
description: ''
---

# 简介

kv 数据库， 单线程高并发，支持集群，可以实现队列，事务场景，有原子cas 类实现计数。
有几个概念，数据库，表

优点

- 支持5种数据类型string、hash、list、set、zset
- 高性能 8万/s TPS
- 集群 一致性hash的集群分布，支持从复制的高可用方案
- 持久化机制 AOF、RDB、混合模式（优先AOF恢复）
- 数据压缩支持 LZF、Snappy

### 延时队列

```bash
lpush mq 'topic' 'xxx'
lpop mq 'topic'

zadd currentTimeMillis() + 5000, orderId

while (true){
  zrangebyscore key, currentTimeMillis
  if (reuslt.length==0){
    done; break;
  }else{
    if(zrem key,result >0){
      handle()
    }
  }
}
```

### 常见数据集

* Hash（哈希）、String（字符串） 缓存对象、常规计数、分布式锁、session共享
* List（列表）
    * 双向列表 消息队列 相关命令：lpush lpop lrpop BRPOPLPUSH
    * 压缩列表（listpack）
        * 缓存对象 HMSET uid:1 name Tom age 15
        * 购物车
            * HSET cart:{用户id} {商品id} 1；
            * HINCRBY cart:{用户id} {商品id} 1；
            * HLEN cart:{用户id}；
            * HDEL cart:{用户id} {商品id}；HGETALL cart:{用户id}

* Set（集合）2^32-1
    * 点赞 SADD article:1 uid:1；SREM article:1 uid:1；SMEMBERS article:1；SCARD article:1；SISMEMBER article:1 uid:1
    * 共同关注好友 SADD uid:1 5 6 7 8 9;SINTER uid:1 uid:2;SISMEMBER uid:1 5;
    * 抽奖 SADD lucky Tom Jerry John Sean Marry Lindy Sary Mark;SRANDMEMBER lucky 1;SPOP lucky 1;
* Zset（有序集合）skiplist、listpack
    * 排行榜
        * ZADD user:xiaolin:ranking 200 arcticle:1；设置赞数
        * ZINCRBY user:xiaolin:ranking 1 arcticle:4；新增一个赞
        * ZSCORE user:xiaolin:ranking arcticle:4；查看某赞数
        * ZREVRANGE user:xiaolin:ranking 0 2 WITHSCORES；获取赞数最多的文章
        * ZRANGEBYSCORE user:xiaolin:ranking 100 200 WITHSCORES；获取100-200赞文章
        * ZREVRANK 获取指定人的排名
    * 电话排序
        * ZADD phone 0 13100111100 0 13110114300 0 13132110901
        * ZRANGEBYLEX phone - +
        * ZRANGEBYLEX phone [132 (133

* BitMap（2.2 版新增）底层String实现的，二值状态统计
    * 签到
        * SETBIT uid:sign:100:202206 2 1
        * GETBIT uid:sign:100:202206 2
        * BITCOUNT uid:sign:100:202206
        * BITPOS uid:sign:100:202206 1 首次打卡时间
    * 判断用户登录状态
        * SETBIT login_status 10086 1
        * GETBIT login_status 10086
        * SETBIT login_status 10086 0
        * 统计签到用户总数 BITOP AND destmap bitmap:01 bitmap:02 bitmap:03；BITCOUNT destmap

* HyperLogLog（2.8 版新增）不精确去重计数、非常省空间
    * UV计数
        * PFADD page1:uv user1 user2 user3 user4 user5
        * PFCOUNT page1:uv

* GEO（3.2 版新增）
    * 滴滴叫车
        * GEOADD cars:locations 116.034579 39.030452 33
        * GEORADIUS cars:locations 116.054579 39.030452 5 km ASC COUNT 10

* Stream（5.0 版新增）完美地实现消息队列，它支持消息的持久化、支持自动生成全局唯一 ID、支持 ack 确认消息的模式、支持消费组模式等
    * 消息队列
        * XADD mymq * name xiaolin；返货一个全局ID
        * XREAD BLOCK 10000 STREAMS mymq $
        * XGROUP CREATE mymq group1 0-0
        * XREADGROUP GROUP group1 consumer1 STREAMS mymq

### 持久化实现

* AOF appendfsync:always|everysec|no(取决于fsync()的触发时机))
* RDB (copy-on-write)
* 混合持久 aof-use-rdb-preamble yes
* 检查最后一次 latest_fork_usec info中的耗时

### 功能

* TTL
* 内存淘汰 LRU LFU

### 缓存篇

如何保障缓存和数据库不一致问题

* 不更新缓存，而是删除缓存中的数据。然后，到读取缓存时，发现缓存中没了数据之后，再从数据库中读取数据，更新到缓存中。
* 延迟双删
* binlog中间件（Canal中间件）

### Redis 提高写性能至百万级别

* 批处理
    * pipeline
    * MSET/HMSET 命令
* 数据分片
    * 集群分散写入
* 使用Lua脚本
    * 将多个操作组成一个原子操作
* 异步加载

# 以下旧文堆叠

## 工具

### GUI

https://github.com/uglide/RedisDesktopManager

### 运维命令

```language-bash
redis-cli shutdown
nohup redis-server ./redis.conf  -p 3388 >/dev/null 2>&1 &

vim redis.conf
daemonize yes
requirepass myRedis  
## 其他可选的配置
pidfile
port
bind
logfile
loglevel


src/redis-cli -h  127.0.0.1 -p 6379 -a MiPOnylRdJzTsmhu

```

### cli 监控

https://github.com/facebookarchive/redis-faina

```language-bash
redis-cli -p 6379 -h x.x.x.x MONITOR | head -n 10 | ./redis-faina.py 
```

## 客户端

### jedis

pom.xml

```language-xml
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>2.7.3</version>
        </dependency>
```

使用

```language-java

public class TaskPushTask implements TaskExecute {

  final Logger logger = LoggerFactory.getLogger(TaskPushTask.class);

  JedisPool pool = ApplicationEngine.getBean(JedisPool.class);

  private String method;
  private String userId;

  public TaskPushTask(String method, String userId) {
    this.method = method;
    this.userId = userId;
  }

  @Override
  public void execute() throws SysException {
    Jedis jedis = pool.getResource();
    try {
      jedis.publish(method, userId);
    } catch (Exception e) {
      logger.error("推送消息失败", e);
    } finally {
      pool.returnBrokenResource(jedis);
    }
  }
}



```

# 快速安装

```language-bash
docker run -p 6379:6379 -v $PWD/data:/data  -d redis redis-server --appendonly yes --requirepass xxxxx

```

```language-xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


    <!-- redis连接池的配置 -->
    <bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig">
        <property name="maxTotal" value="${redis.pool.maxActive}"/>
        <property name="maxIdle" value="${redis.pool.maxIdle}"/>
        <property name="minIdle" value="${redis.pool.maxWait}"/>
        <property name="testOnBorrow" value="${redis.pool.testOnBorrow}"/>
        <property name="testOnReturn" value="${redis.pool.testOnReturn}"/>
    </bean>

    <!-- redis的连接池pool，不是必选项：timeout/password  -->
    <bean id="jedisPool" class="redis.clients.jedis.JedisPool">
        <constructor-arg index="0" ref="jedisPoolConfig"/>
        <constructor-arg index="1" value="${redis.host}"/>
        <constructor-arg index="2" value="${redis.port}" type="int"/>
        <constructor-arg index="3" value="${redis.timeout}" type="int"/>
        <constructor-arg index="4" value="${redis.password}"/>
    </bean>


</beans>
```

subpub 模型实现
http://guosxu.iteye.com/blog/977382

# 常见命令

* CRUD SET/GET/DEL/EXISTS/decr/incr/mget
* 清空数据库 flushdb、flushall
* 队列 lpush、lrange、blpop、llen
* 集合 sadd、zadd
* 订阅模型 SUBSCRIBE、PSUBSCRIBE
* 事务 MULTI/EXEC
* 登陆 AUTH "password"、CONFIG get/set requirepass 、PING
* 备份 BGSAVE、恢复 CONFIG get dir查找目录，然后直接覆盖 dump.rdb
* 最大连接数 config get/set maxclients

```language-bash
  redis-server --maxclients 100000
```

# telnet 命令

```language-bash
telnet 0.0.0.0  6379
# 状态
info
# 关机
SHUTDOWN
# 退出
QUIT
# 返回数据库总数
DBSIZE
# 清空当前数据库的所有键
FLUSHDB
# 清空所有数据库中的所有键
FLUSHALL
# 异步保存
BGSAVE、SAVE
# 实时输出请求
MONITOR
```

# 配置

```language-bash
# 查询配置文件位置
ps -aux |grep redis
# 默认位置
/etc/redis.conf
/usr/local/redis
./redis -c redis.conf
```

# 使用 redis 作为session 整合 spring

```language-xml
    <!--session redis-->
    <bean class="org.springframework.session.data.redis.config.annotation.web.http.RedisHttpSessionConfiguration"/>
    <bean class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
        <property name="hostName" value="${redis.host}"/>
        <property name="port" value="6380"/>
        <property name="password" value="${redis.password}"/>
    </bean>
```

```language-xml
            <!--共享会话-->
            <dependency>
                <groupId>org.springframework.session</groupId>
                <artifactId>spring-session</artifactId>
                <version>1.0.2.RELEASE</version>
            </dependency>

            <dependency>
                <groupId>org.springframework.data</groupId>
                <artifactId>spring-data-redis</artifactId>
                <version>1.6.0.RELEASE</version>
            </dependency>

```

参考文章

* http://www.infoq.com/cn/articles/tq-redis-memory-usage-optimization-storage/
* http://www.cnblogs.com/wenanry/archive/2012/02/26/2368398.html
* http://redis.io/
* http://doc.redisfans.com/
* http://www.infoq.com/cn/articles/architecture-practice-01-redis?utm_source=infoq&utm_medium=popular_widget&utm_campaign=popular_content_list&utm_content=homepage
* https://redis.io/documentation
