title: Distributed Queue RabbitMQ
date: 2017/11/05 08:26:04
categories:
 - tryghost

tags:
 - 未归档 



---

默认账号
guest guest


client 5672
web 15672 

4369 (epmd), 25672 (Erlang distribution)
5672, 5671 (AMQP 0-9-1 without and with TLS)
15672 (if management plugin is enabled)
61613, 61614 (if STOMP is enabled)
1883, 8883 (if MQTT is enabled)
 

一键docker启动
```language-bash
docker run -d --name rabbitmq --publish 5671:5671 \
 --publish 5672:5672 --publish 4369:4369 --publish 25672:25672 --publish 15671:15671 --publish 15672:15672 \
rabbitmq:management
```
http://127.0.0.1:15672/# /



