title: NoSQl Redis 4.0
date: 2015/12/17 08:54:25
categories:
 - tryghost

tags:
 - store 



---

# 简介
kv 数据库， 单线程高并发，支持集群，可以实现队列，事务场景，有原子cas 类实现计数。
有几个概念，数据库，表

场景

- 缓存-分布式缓存  
- 会话-分布式会话
- 队列 -消息队列
- 广播-订阅通知模型
- 原子性操作-分布式锁、防超卖

优点

- 支持5种数据类型string、hash、list、set、zset
- 高性能 8万/s  TPS
- 集群 一致性hash的集群分布，支持从复制的高可用方案 
- 持久化机制  AOF、RDB 



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
 * CRUD  SET/GET/DEL/EXISTS/decr/incr/mget
 * 清空数据库 flushdb、flushall
 * 队列  lpush、lrange、blpop、llen
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



