---
title: Clickhouse Collection
pubDate: 2024-10-31
categories: [ 'db' ]
description: ''
---

# 安装

https://clickhouse.com/docs/zh/getting-started/install

# 使用

基于列式数据库，写入LSM-tree，对于只读数据的聚类写入性能很强。基本单位 MergeTree，无锁写入

* SQL like 支持 GROUP BY, ORDER BY, FROM, JOIN, IN
* 支持向量查询
* 支持近似值计算

# 性能优化

* 补充 “[跳数索引](https://clickhouse.com/docs/zh/guides/improving-query-performance/skipping-indexes)
  ”,skiplist和oolmfliter
* 主键稀疏索引

# 参考文章

* MQ、Redis 存储快、查询快，能做到10亿级别数据 group_by 秒出结果，压根就不用流式计算去实时聚类了，端监控，就是监控app端的闪退，性能，收集打点这些。
* https://clickhouse.tech/docs/zh/
* https://www.cnblogs.com/traditional/p/15218743.html
