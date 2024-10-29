---
title: Java Stack 总结
pubDate: 2024-1-1
categories: [ '面试','JAVA' ]
description: ''
---

# Java 基础

## 计算机基础

* copy-on-write 用户态/系统态 fork()/exec()
* compare and swap

# Java 新特性

# JUC

* volatile
    * 保证可见性
    * 禁止指令重排序（happen-befored）

* synchronized
    * 对象头 Mark World：HashCode、分代年龄、锁标志位信息；Klass Point 存储对象所映射的实列
    * 字节码中的表述是 monitorrecord monitorexit
    * 锁膨胀 无锁-偏向锁-轻量锁（自旋锁）-重锁
    * 内存模型 happens-before

* volatile 和 synchronized 解决ACID问题，double check lock
* 基础工具
    * AbstractQueuedSynchronizer
    * ReentrantLock
* 并发工具
    * CountDownLatch N个线程到达屏障，则执行
    * CyclicBarrier 所有线程到达屏障，则执行
    * Semaphore （红绿灯模型）
    * Exchanger 线程数据传输
* 并发容器
    * ConcurrentHashMap、ConcurrentLinkedQueue、ConcurrentSkipListMap
* 阻塞队列
    * ArrayBlockingQueue
    * PriorityBlockingQueue
    * DelayQueue
    * SynchronousQueue
    * LinkedTransferQueue
    * LinkedBlockingDeque
* 线程池
    * ReentrantLock 锁
    * ThreadLocal 本地线程保存值，或者线程池值的传递
    * TreadPoolExecutor:
        * 基础参数：
            * corePoolSize、maximumPoolSize`(核心线程数 = CPU核数 * CPU 目标使用率 * （1 + 线程等待耗时 /
          线程计算耗时）)`、keepAliveTime、unit、workQueue
        * 常用线程池
            * SingleThreadPool
            * FixedThreadPool
            * CachedThreadPool
            * ScheduledThreadPoolExecutor
        * 拒绝策略
            * AbortPolicy 异常
            * CallerRunsPolicy 等待
            * DiscardPolicy 抛弃当前任务
            * DiscardOldestPolicy 抛弃最后一个任务
        * 监控
            * 线程池活跃度告警。活跃度 = activeCount / maximumPoolSize
            * 队列容量告警。容量使用率 = queueSize / queueCapacity
            * 拒绝策略告警。当触发拒绝策略时，会进行告警。
            * 任务执行超时告警。重写 ThreadPoolExecutor 的 afterExecute() 和 beforeExecute()
              ，根据当前时间和开始时间的差值算出任务执行时长，超过配置的阈值会触发告警。
            * 任务排队超时告警。重写 ThreadPoolExecutor 的 beforeExecute()，记录提交任务时时间，根据当前时间和提交时间的差值算出任务排队时长，超过配置的阈值会触发告警
        * 框架
            * [dynamictp](https://dynamictp.cn/guide/use/quick-start.html)
    * Fork/Join 无锁编程框架，使用原子操作和内存屏障，用于计算密集型任务、大数据处理、递归算法
    * CompletableFuture
* 并发框架
    * [Disruptor](https://github.com/LMAX-Exchange/disruptor)

```java
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> {
            System.out.println("do something....");
            return "result";
        }, executorService);
 
        //等待子任务执行完成
        System.out.println("结果->" + cf.get());

```

# JMM 模型

![img.png](../../assets/JMM.png)
![img.png](../../assets/JMM_1.png)
![img.png](../../assets/JMM_2.png)
![img.png](../../assets/JMM_3.png)

* 方法区：存储了每一个类的结构信息，如运行时常量池、字段和方法数据、构造方法和普通方法的字节码内容。
* 堆：几乎所有的对象实例以及数组都在这里分配内存。这是 Java 内存管理的主要区域。
* 栈：每一个线程有一个私有的栈，每一次方法调用都会创建一个新的栈帧，用于存储局部变量、操作数栈、动态链接、方法出口等信息。所有的栈帧都是在方法调用和方法执行完成之后创建和销毁的。
* 本地方法栈：与栈类似，不过本地方法栈为 JVM 使用到的 native 方法服务。
* 程序计数器：每个线程都有一个独立的程序计数器，用于指示当前线程执行到了字节码的哪一行。

# JVM dump 方法

参考 https://ifeve.com/%e7%94%b1jdk-bug%e5%bc%95%e5%8f%91%e7%9a%84%e7%ba%bf%e4%b8%8aoom

```bash
yum install -y gdb
ulimit -c unlimited
gcore 100 -o core
jmap -dump:format=b,file=heap.hprof `which java` core.100
```

* [Btrace](https://github.com/btraceio/btrace) 使用
* [arthas](https://github.com/alibaba/arthas) 使用

# JVM 优化

* 标记-复制 标记-清除
    * Marking Reachable Objects
    * Removing Unused Objects Mark、Sweep、Compact、Copy
* 四种GC（MinorGC、FullGC）
    * Serial GC 单核GC
    * Parallel GC 4-8核心使用、有卡顿、小型多核机器性能比G1要好、清理老年代和Metaspace
    * G1 垃圾最多的小堆会被优先收集
        * Evacuation
        * Concurrent Marking
            * Initial Mark
            * Root Region Scan
            * Concurrent Mark
            * Remark
            * Cleanup
        * Evacuation Pause
    * ZGC
* 优化关键指标 latency、throughput、capacity

# NIO/Netty

* 阻塞、非阻塞、异步、同步
* Netty
* Disruptor

# SpringIOC

* ApplicationContext BeanFactory

## 生态工具

# 工具库

- Hutool
- Google Guava

## 负载均衡

- Nginx
- Spring Cloud Gateway

## 分布式配置中心/注册中心

- Apollo
- Nacos
- Zookeeper
- Consul

## 服务调用

- Netty/gRPC
- Dubbo
- Sentinel
- Hystrix
- Spring Cloud Alibaba

## 任务调度

- XXL-JOB
- Elastic-Job

## 缓存中间件

- Redis
- Memcached

## 数据库连接池/分布式事务

- HikariCP
- Druid
- Seata
- TCC-Transaction

## 数据库中间件

- Sharding-Sphere

## 数据库

- MariaDB
- PostgreSQL
- TiDB
- ClickHouse：

## 搜索中间件

- Lucene：
- Solr
- Elasticsearch

## 消息中间件

- Kafka
- RocketMQ
- RabbitMQ

## 分布式预警监控

- Grafana
- Zabbix
- Spring Boot Admin
- Prometheus

## 分布式链路追踪

- Pinpoint
- Zipkin
- Sky-walking

## 安全&授权

- Shiro
- Spring Security
- OAuth 2.0
- JWT

# 参考

* 对 https://www.skjava.com/java-all 大体的方向是认可的，总结做了精简，重新整理下需要的知识点会持续补充更新这个页面。
