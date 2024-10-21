title: SQL Guide
date: 2017/01/11 15:15:30
categories:
 - tryghost

tags:
 - store 



---

# 历史
* 文档型数据库->关系型数据库(SQL92)
* Db2 Orcale SyBase SQLServer
* PostgreSQL MySQL 
* mariaDB SQLite
* greenplum
 
# 概念
* mysql ->  数据库操作系统+ 数据库（表）
* 关系 笛卡尔乘积的子集
* 关系代数表达式  并(∪)、差(-)、笛卡尔积(×)、投影(σ)、选择(π)
* 主码、候选码 PK
* 主属性、非主属性
* 范式 NF
![20180625152986120135524.png](http://img.sandseasoft.com/20180625152986120135524.png)
![20180630153033611581177.png](http://img.sandseasoft.com/20180630153033611581177.png)

# 算法
* 排序算法
* 连接算法
 * 循环嵌套算法
 * 哈希连接算法
 * 排序合并算法
* 聚组算法
* 去重算法

## 数据库操作系统
ACID（Atomicity/Consistency/Isolation/Durability)

1.DML column->update /insert /delete
2.DDL table->create/drop/alter/desc
3.DCL ACL-> grant
4.DQL query->select from group by 
5.DTL transaction -> set autocommit=0; commit; rollback;

## 数据库（表）
database -> table -> column -> index （Btree+）

# 范式
* 一范式  必有主码，数据唯一性 去除重复数据
* 二范式  去除部分依赖
* 三范式  去除传递依赖

一般数据库做到二范式足以，优秀的数据库应该在低冗余，部分特殊场景可以通过冗余数据提升查询能力

# 函数
* 聚合函数 sum/count/avg
* 内嵌函数 dateformat(now(),"%Y-%m-%d")
* DQL语法 group by having xxx>0 limit 0,100

# 周边 
navicat for premium
# 学习书籍
* 数据库系统概论
* 数据库系统基础课程
* 数据库系统实现
#  参考
https://blog.csdn.net/liujiangce/article/details/80119795
https://blog.csdn.net/u011467176/article/details/52578295




