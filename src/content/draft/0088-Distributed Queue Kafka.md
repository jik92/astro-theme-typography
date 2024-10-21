title: Distributed Queue Kafka
date: 2016/01/07 07:15:42
categories:
 - tryghost

tags:
 - store 



---

## 简介
* 特征吞吐量大，消息可能会重复
http://kafka.apache.org/
* 监控 JMX

## 概念
 * producer   消息的生成者，即发布消息
 * consumer   消息的消费者，即订阅消息
 * broker     节点 id
 * zookeeper  协调转发 

producers通过网络将消息发送到Kafka集群，集群向消费者提供消息
kafka对消息进行归纳，即topic，也就是说producer发布topic,consumer订阅topic

## 三种队列中间件

* kafka    scala
* rabbitMQ erlang 使用 AMQP
* activeMQ java   使用 STOMP

## 使用
首先启动一个 zk，然后再启动 kafka
```language-bash
bin/kafka-server-start.sh -daemon config/server.propties
```   

这里和 logstash 整合启动集群

```language-bash
# 创建 topic
./bin/kafka-topics.sh --zookeeper 10.2.85.26:2181 --topic "test_pretreat_res" --describe
# 写入数据
./bin/kafka-console-producer.sh --broker-list 10.2.85.26:9092 --topic test_task_oneinall_1 < /tmp/xhtest/data1.txt
# 读取数据
./bin/kafka-console-consumer.sh --topic test_task_oneinall_1 --bootstrap-server 10.2.85.26:9092 > /home/gf_stream/c.txt

```


Kafka producer的ack的3种机制：

通过初始化producer时的producerconfig可以通过配置request.required.acks不同的值来实现。
0：这意味着生产者producer不等待来自broker同步完成的确认就继续发送下一条（批）消息。
      此选项提供最低的延迟但最弱的耐久性保证，因为其没有任何确认机制。
1：这意味着producer在leader已成功收到的数据并得到确认后发送下一条消息。
     等待leader的确认后就返回，而不管partion的follower是否已经完成。
-1：这意味着producer在follower副本确认接收到数据后才算一次发送完成。
      此选项提供最好的耐久性，我们保证没有信息将丢失，只要至少一个同步副本保持存活。


producer的同步异步机制：
通过配置producer.type的值来确定是异步还是同步，默认为同步。async/sync 默认是sync。
如果设置为异步，那么提供了批量发送的功能：
当满足以下其中一个条件的时候就触发发送
batch.num.messages 异步发送 每次批量发送的条目 ；
queue.buffering.max.ms 异步发送的时候 发送时间间隔 单位是毫秒。
其次，异步发送消息的实现很简单，客户端消息发送过来以后，先放入到一个队列中然后就返回了。Producer再开启一个线程（ProducerSendThread）不断从队列中取出消息，然后调用同步发送消息的接口将消息发送给Broker。








