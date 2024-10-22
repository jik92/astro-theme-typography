---
title: 常规面试问题的思考集
pubDate: 2024-10-22
categories: [ 'interviewer' ]
description: ''
---

# 通用问题

## 介绍几个拿的出手的项目? (15分钟)

1，在杭州光云软件做的通用日志架构查询服务
2，在上海冰洲石做数据标注业务，主要是对google patent论文库做清洗和文章NLP抽取三元组信息

## 如何做稳定性保障？（发散问题）

```markdown
# 稳定性保障策略

- **服务隔离**：通过容器化技术隔离服务，防止故障蔓延。
- **负载测试**：使用Apache JMeter等工具模拟用户访问，评估系统性能。
- **压力测试**：逐渐增加负载，测试系统在极限条件下的表现。
- **容量规划**：根据业务需求进行容量规划，确保系统应对流量变化。
- **实时监控**：使用Prometheus、Grafana监控系统运行时指标。
- **告警机制**：设置告警阈值，系统指标异常时及时告警。
- **限流**：使用Sentinel等工具设置限流策略，防止系统过载。
- **熔断**：使用Hystrix或Resilience4j实现熔断机制，防止故障蔓延。
- **本地缓存**：使用Guava Cache或Ehcache实现本地缓存。
- **分布式缓存**：使用Redis等存储全局共享数据，提升性能。
- **统一异常处理**：使用AOP统一捕获和处理服务层异常。
- **降级策略**：临时关闭非关键功能或简化复杂功能，确保核心服务稳定。
- **分布式追踪**：使用SkyWalking、Zipkin等工具实现分布式追踪。

## 参考资料

- [阿里云开发者社区](https://developer.aliyun.com/article/782540)
- [性能测试与负载均衡](https://developer.aliyun.com/article/1554956)
- [系统稳定性与高可用保障](https://zhuanlan.zhihu.com/p/579442834)
- [实时监控和警报系统](https://developer.aliyun.com/article/1558688)
- [Java应用系统稳定性方案](https://blog.csdn.net/weixin_39304656/article/details/142685720)
```

# 部分问题集合

#### Fordeal 跨境电商

1. 技术选型为什么用mysql，还能改成其他加快你的业务吗

```markdown

MySQL使用范围广，但是有出现社区闭塞没有活跃的现象，可以考虑平替MariDB或者PostgralSQL关系型数据库，或者使用更强的TiDB或者Greenplum分布式关系型数据库，如果涉及到有检索方面能力的可以改造成es和mysql同步，如果大量的宽表并没有对范式有强依赖，极端情况使用mongodb这种NoSQL数据库加强查询性能。
对于绝大多小型项目MySQL足矣，建议直接上云增强硬件和可靠性方向，不要改架构
```

2. redis持久化方案会存在什么问题? 影响你的性能吗? redis持久化方案 都有什么优缺点？

```markdown
AOF 有阻塞，当文件满要重新刷盘，但是实时性好。
缺点：文件体积大，恢复速度慢，受到IO影响
优化：

1. appendfsync:everysec
2. 设置`auto-aof-rewrite-percentage`和`auto-aof-rewrite-min-size`配置自动触发AOF文件重写，减小AOF文件体积

RDB 没有阻塞，fork快照方法更新，有幻读。
缺点：fork操作大数据集可能耗时，影响到IO
优化：

1. 使用bgsave减少阻塞
2. 可以使用混合的persist

其他优化

1. 尽量使用hash、或者避免大值的读写
2. 使用slowlog查redis的慢日志
3. linux内核侧的参数调整
```

3. ES 怎么去做索引更新的？

```markdown
es有一个全局刷新时间，未刷新前用户都是看到旧数据，可以在批量刷新数据的时候禁用refresh_time 阻止强制刷新，跑批完后再启用

1. 单个文档_update命令更新
2. 批量文档_bulk命令，要设置一个设施bluk_size

indices.memory.index_buffer_size=增加缓冲区
index.translog.durability=async 异步事务提高刷新磁盘性能
```

#### VV

1.Dubbo内部细节
https://cn.Dubbo.apache.org/zh-cn/docsv2.7/dev/implementation/

```markdown
1. 核心组件 Registry/Provider/Consumer/Monitor
2. 实现细节：通过（Service/reference）Config解析URL格式作为数据通讯，从 DubboProtocl 传输到 RegisteryProtocl，数据拦截通过Filter
   链式整合，当收到一个请求，会找到对应的exporter，然后通过invoker（AbstractProxyInvoker ）调用
3. SPI扩展，是一种JAVA 官方库的扩展实现
```

2.Dubbo是怎么做流控的 流控的几个算法

```markdown
流控算法

* 自适应限流 HeuristicSmoothingFlowControl/AutoConcurrencyLimier
* P2C算法 connections/load to choice smallest

限流其他限制

* 熔断机制 失败次数超过阈值，Sentinel、Hystrix、Resilience4J
* 服务降级 直接不可用 `@DubboReference(mock = "return null")`
```

3.讲讲Dubbo通信协议netty 如何解决粘包问题

```markdown
1. FixedLengthFrameDecoder 固定长度补齐
2. DelimiterBasedFrameDecoder 分割符识别
3. LengthFieldBasedFrameDecoder 标记长度 （推荐）
4. 自定义协议和编码器
5. 使用Netty的编码器和解码器，例如，`LineBasedFrameDecoder`会自动以行为单位处理消息，而`DelimiterBasedFrameDecoder`
   可以根据自定义的分隔符来分割消息
```

4.Dubbo有哪些序列化 都有什么区别?

```markdown
除了RMI以外，Dubbo官方提供很多的案例

1. Hssian 稳
2. FST/Kryo 快
3. Fastjson/Gson JSON 可读性跨语言
4. Protobuf 跨语言，压缩高效
```

5.让你设计序列化 你会从哪几个方面去思考?

```markdown
速度/性能/IO效率
```

7.redis string zset 底层数据结构是怎么实现的 优缺点

```markdown
String 内存结构
len/free/buff[]
优点：1.内存不用重新分配 2.二进制安全 3.缓冲区溢出保护

Zset底层数据结构

* ziplist 修改成本高，结构紧凑，节省内存
* skiplist 查询速度快，占用内存多
```

9.jdk1.7 1.8的区别 hashmap 为什么方法区改成metaspace

```markdown
避免固定PermGen GC爆炸，减少GC活动，使用非堆内存

Metaspace 使用 Native Memory，自动扩展，当classloader被回收直接清空，减少内存溢出风险
```

#### 有赞一面

2.缓存穿透,缓存雪崩问题

```markdown
缓存穿透 1.增加校验 2.对空值缓存 3. 布隆过滤器
缓存雪崩 1.分化过期时间 2.提前预热缓存 3.多级缓存 4.redis高可用
缓存击穿 1.加锁等待 2.永不过期，异步方式更新数据
```

3.消息队列遇到的问题：消息顺序消费 消息可靠性保障 消息幂等

```markdown
1. 保障 partition 中可以顺序消费，业务层面序列号和时间戳来保证消息正确
2. 可靠性用集群保证，通过kafka的ack机制来保证callback，用副本和重试来增加鲁棒性，保证消息被正确消费然后提交callback
3. 消息幂等，额外数据库存储 offset id，消费完同步状态
```

5.MySQL索引的树结构

```markdown
B/B+ 树:所有数据在叶子，非叶子阶段更多关键字，适合page存储
联合索引AB，前序命中规则，即 A命中 B命中，AB命中，BA不会命中
```

7.讲讲回表查询 什么情况下会走会表查询

```markdown
避免全表扫描和差的索引列，优先命中性能高的列，使用covering index组合索引来优先命中
```

10.MySQL如何避免死锁问题

```markdown
多个事务交叉获取锁

1. 索引减少冲突，加速查询
2. 保证加锁顺序一致
3. 减少事务锁定时间
4. 减少并发
5. 表锁直接代替行锁
6. 锁定更小的范围
7. 分批提交
8. 设置不同的事务级别
9. 加锁操作select for update 
```

#### 滴滴一面

1.分流算法(30%流量 或者 30%用户群体)

```markdown
取模
```

3.分库分表

```markdown
垂直分表
水平分表 用户ID 订单ID
时间分表
MySQL hash分区
```

5.RocketMQ的优点，怎么达到那么快？

```markdown
高性能和低延迟: CommitLog 顺序读写、零拷贝
消息可靠性保障: 容灾、多种消息模式
```

7.RocketMQ消息丢失的情况

```markdown
消费异步刷盘/主节点拱机/消费阶段没有消费完就已经ACK了
```

8.RocketMQ事务消息具体流程

```markdown
发送端二次确认，消费端消费完毕完成ACK回传，消息事务会发起消息回查
```

9.es和mysql数据同步如何保证

```markdown
单数据同步更新
单数据异步更新
es后台主动更新
binlog更新
```

10.mysql索引失效的情况

```markdown
计算函数，类型问题，OR条件，like字符，左前缀法则，非等，not in ,not exists, 使用limit 没有order by
```

11.慢SQL如何发现

```markdown
slowlog
jdbc中间件
apm监控
explain
```

12.如何优化慢SQL
```markdown
优化索引，减少扫查询回表，优化本身硬件能力，使用缓存
```
13.explain 关键指标
```markdown
cost key 
```
14.性能监控你都看哪些指标
```markdown
cpu idle 温度
free -m
io
network io

gc
jmm
uv/pv
tps/qps

exception
exception count
exception rate

thread count
queue length

lock
硬件健康状况 
```

#### 淘特一面

2.synchonrized的原理和升级过程3.ThreadLocal介绍和原理
4.Spring单例和多例的区别 什么时候创建 什么时候销毁
5.Spring生命周期
6.类加载的流程
7.类加载数据存在哪里 讲讲JVM方法区
8.分布式锁原理
9.线程池的用途 线程池的流转原理

#### JD一面

1.数据库锁问题 并发操作 X锁 S锁 间隙锁2.分布式锁实现原理 zk redis实现的优缺点3.线程池内部逻辑 拒绝策略
4.算法题 100个城市不同的权重 按照权重随机如何实现
5.限流实现原理
7.大量慢SQL如何优化
8.缓存穿透 缓存击穿 缓存雪崩问题
9.SQL什么时候不走索引

#### 网易二面

2.redis list
3.es底层如何查询倒排索引什么算法 复杂度
4.es如何优化
5.Dubbo spi 实现原理
6.Dubbo 整个调用流程
7.spring加载过程
8.spring事务的原理
9.filter interpret aop的执行顺序
10.aop的原理 动态代理的实现 区别
11.服务链路如何实现(elk+skywalking)
12.threadlocal 子线程问题 如何传播13.方法调用 参数传递 按值还是引用

# 软问题集合

## 为什么离职？

```markdown
公司去年10月份有财务困难，今年融资失败，9月份大规模裁员接近50%。
家庭情况，每天通勤3小时，工作比较疲劳频繁晚上凌晨要开会，或者做进度code_review
但是工作工作氛围在下降，但是公司对员工还是十分尊重，我非常感激能给我这个机会

我还是希望能进一家有稳定上升期的公司，能够有好的业务沉淀，可以持续创造价值，我希望跟聪明人一起工作。
我自己曾经校招是去杭州一家50人的创业公司，当时团队气氛非常好，公司十分开放，从老板到员工全部都很努力，也愿意加班彼此融洽。后来一直做到上市。我一直怀念在杭州工作那段日子，但是由于个人经济问题和感情问题而各种离开。
```

## 未来两年的职业规划

```markdown
1.我漂泊太久了，今年四月份徐汇区花了巨大的代价安置学区房，未来两年我希望好好补齐自己的技术短板，好好沉淀，稳定家庭和事业。
2.如果有机会我希望有时间能做一些技术分享，多社交，我懂的知识很杂，但是都很实用。
3.我不太希望晋升管理层，我看过很多简历好像人人都想当管理层，索性我就不当了，我只有一点期望，能安心写我的代码做一个纯粹的人。
```

## 你对我还有问题?

1. 公司是否提供网络，希望能用自己的设备或者大内存设备、或MacBook
2. 想了解下公司业务未来的发展方向，以及我可能未来接触到的团队是什么样的人
3. 现在公司已经在XX业务有自己的产品线了，未来还会遇到哪些挑战
4. 从你的角度看，你需要一个怎么样的研发成员，你对全栈就是技术不成熟东学学西学学是不是一种没有职业规划表现
5. 现有的商业模式已经固化，生产资料饱和，我们怎么突出重围，建立自己的壁垒
6. 目前公司的技术架构选型是怎么样的？未来是打算全部上云还是自己建立机房?
