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

```sql
CREATE TABLE [IF NOT EXISTS] [db_name.]table_name(
    name1 type [DEFAULT|MATERIALIZED|ALIAS expr],
    name2 type [DEFAULT|MATERIALIZED|ALIAS expr],
    ......
) ENGINE = MergeTree()
# 分区，比如时间分区
[PARTITION BY expr]
# 排序 
ORDER BY expr
# 主键生成一级索引
[PRIMARY KEY expr]
[SAMPLE BY expr]
[SETTINGS name1=value1, name2=value2, ......]
```

# 概念

* MergeTree 主键索引、数据分区、数据副本和数据采样等基本能力
    * ReplacingMergeTree 具有删除重复数据的特性
    * SummingMergeTree 按照排序键自动聚合数据
    * Aggregating
    * Collapsing
    * VersionedCollapsing
    * Graphite
* Replicated* 支持数据副本

# 性能优化

* 补充 “[跳数索引](https://clickhouse.com/docs/zh/guides/improving-query-performance/skipping-indexes)
  ”,skiplist和oolmfliter
* 主键稀疏索引

# 参考文章

* MQ、Redis 存储快、查询快，能做到10亿级别数据 group_by 秒出结果，压根就不用流式计算去实时聚类了，端监控，就是监控app端的闪退，性能，收集打点这些。
* https://clickhouse.tech/docs/zh/
* https://www.cnblogs.com/traditional/p/15218743.html
