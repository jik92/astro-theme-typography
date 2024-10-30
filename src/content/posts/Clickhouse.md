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
# 何种数据采样
[SAMPLE BY expr]
# 
[SETTINGS name1=value1, name2=value2, ......]
```

Settings 意思

* index_granularity：对于 MergeTree 而言是一个非常重要的参数，它表示索引的粒度，默认值为 8192。所以 ClickHouse
  根据主键生成的索引实际上稀疏索引，默认情况下是每隔 8192 行数据才生成一条索引。类似于 kafka 的日志数据段，kafka
  的每个数据段是由存储实际消息的数据文件，和用于加速消息查找的索引文件组成，而 kafka 的索引文件建立的也是稀疏索引。
* min_compress_block_size：我们知道 ClickHouse 是会对数据进行压缩的，而 min_compress_block_size 表示的就是最小压缩的块大小，默认值为
  65536。
* index_granularity_bytes：在 19.11 版本之前 ClickHouse 只支持固定大小的索引间隔，由 index_granularity
  控制，但是在新版本中增加了自适应间隔大小的特性，即根据每批次写入的数据的体量大小，动态划分间隔大小。而数据的体量大小，则由
  index_granularity_bytes 参数控制的，默认为 10M，设置为 0 表示不启用自适应功能。
* enbale_mixed_granularity_parts：表示是否开启自适应索引的功能，默认是开启的。
* merge_with_ttl_timeout：从 19.6 版本开始 MergeTree 提供了数据的 TTL 功能，该部分后面详细说。
* storage_policy：从 19.15 版本开始 MergeTree 提供了多路径的存储策略，该部分同样留到后面详细说。

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
