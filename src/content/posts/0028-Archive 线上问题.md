---
title: Archive 线上问题
pubDate: 2015-04-15
categories: [ 'manage' ]
description: ''
---

### 基本流程
![](http://img.sandseasoft.com/image/b/39/6f77930084ecd65ccea488a8d8ce5.png)

>
BUG/故障/优化/需求

#### JVM 内存泄露
 * 临时解决:重启服务器
 * 排查方法:查看 jvm 日志
 * 事故原因:spring 委派@resource 过多存储在Perm, 导致频繁 FGC, 最终 oom
 * 事后解决:扩充perm区 至 256m

##### Solr 内存泄露
 * 临时解决:重启solr
 * 排查方法:查看 solr 日志
 * 事故原因:
  1. solr 订单过多
  2. 出现错误的query 语句对全表扫描,  Integer.Max
 * 事后解决: 
  1. 迁移3个月外的订单
  2. 扩容 jvm 内存

##### ECS 异常
 * 临时解决:
 * 排查方法: 查看 聚石塔ECS 服务器状态
 * 事故原因:IOPS封顶, 由于高读写导致, 主要由于 slowsql
 * 事后解决: 
  1. 升级 iops 扩容包,临时扩容, 高峰过后再升级 ECS
  2. 优化 slowsql, 减少未走索引的链接 explain
 * 备注:
  1. 默认中等机型1200/店长用4000/最高6000
  2. iops 达到80%需要注意, 当系统响应慢时用户越点越多,容易雪崩
  3. 压力过大可以[服务降级]或者[用户限流]
  4. 配合鹰眼监控服务器状态,聚石塔短信通知

##### mysql连接数
 * 临时解决:重启 tomcat, 释放 mysql 链接
 * 排查方法:查看 show processlist, 查看连接数情况
 * 事故原因:slowsql(未走索引全表扫描,导致连接不释放,iops 异常,系统雪崩)
 * 事后解决:鹰眼排查, 对未走对应索引和子查询语句 进行FORCE INDEX,修改,拆分操作
 * 备注:
 ```
SELECT * from information_schema.`PROCESSLIST`  where  COMMAND !='Sleep' and TIME >0
 ```

##### 线上系统出现 dev 版本
 * 临时解决:重新打包发布版本
 * 排查方法:线上测试
 * 事故原因:没有按照正确的操作流程上线版本
 * 事后解决:规范发布流程, 发布线上后要回归测试, 及时回滚
 
##### 线上系统 进程无故结束
 * 临时解决: 远程重启线上服务器
 * 排查方法: linux 内核日志
 * 事故原因: 不明
 * 事后解决: 升级 jdk1.6_24 and later/线上事故跟踪统计
 * 备注:
![](http://img.sandseasoft.com/image/d/6b/bf63729aa0b292c8cc6414eb5bae1.png)
![](http://img.sandseasoft.com/image/1/cc/9b2a671647afe00ffcfcb48c768a8.png)




