---
title: MySQL Collections
pubDate: 2024-1-1
categories: [ '面试' ,'db' ]
description: ''
---

* MYSQL 通过 redo、undo 日志实现 WAL

```
  mysql 的 WAL，大家可能都比较熟悉。mysql 通过 redo、undo 日志实现 WAL。redo log 称为重做日志，每当有操作时，在数据变更之前将操作写入 redo log，这样当发生掉电之类的情况时系统可以在重启后继续操作。undo log 称为撤销日志，当一些变更执行到一半无法完成时，可以根据撤销日志恢复到变更之间的状态。mysql 中用 redo log 来在系统 Crash 重启之类的情况时修复数据（事务的持久性），而 undo log 来保证事务的原子性。
```

# MySQL 数据结构

* 表空间由段（segment）、区（extent）、页（page）、行（row）组成。
* InnoDB 的数据是按「页」为单位来读写的，每page默认16kb，Page里面很多Row，B+树
* B+树磁盘IO性能更好，适合范围查询

## 索引使用

* 需要使用索引：唯一索引、GroupBy/OrderBy、Where中表达查询的字段、最好设置NotNull
* 不需要使用索引：WHERE条件、重复数据、经常更新
* 哪些情况不走索引：1、like 2、or 3、联合索引左匹配

## explain 关注结果

* type ALL-index-(range-ref-eq_ref-const)
* extra filesort-temporay-(index 不需要回表)

## 事务

事务维护ACID，持久性 redo-log、原子性 undo-log、隔离性 locker、一致性
![img.png](../../assets/acid.png)

* 乐观锁 update test set score = score + 1 where id = 1 and score = 0
* 悲观锁 start transaction; select * from version for update; update xxxx ; commit;

## 日志

* undo-log 回滚日志
* redo-log 重做日志（Innodb） （Write-Ahead Logging）刷完之后 buffer_pool 再 write
* binlog 归档日志 所有引擎都可以用
* 2PC prepare阶段写入 redo-log 然后 commit阶段写入binlog再更新 redo-log 状态done

# 以下旧文堆叠

#### docker quick start image

```language-bash
docker run --name mysql-demo  -e MYSQL_ROOT_PASSWORD=abcd -p 3306:3306 -d mysql
```

#### 登陆

```language-sql
mysql -h www.rds.xxx -P 3386 -u root -p  
use database;
charset utf8;
show tables;
```

#### 备份

```language-sql
# 导出
mysqldump [params] db|gip > db.sql
# 导入
source db.sql

# 导出 csv
select * from test_info   
into outfile '/tmp/test.csv'   
fields terminated by ',' optionally enclosed by '"' escaped by '"'   
lines terminated by '\r\n'; 

# 导入 csv
load data infile '/tmp/test.csv'   
into table test_info    
fields terminated by ','  optionally enclosed by '"' escaped by '"'   
lines terminated by '\r\n';   
```

#### 查看当前 sql 连接

```language-mysql
show processlist;

SELECT * from information_schema.`PROCESSLIST`  where  COMMAND !='Sleep' and TIME >0
```

#### 查看当前 cpu 占用

```language-bash
select count(*), host, sum(rows_read), sum(time), info from information_schema.`PROCESSLIST` where length(`state`) > 0 group by SUBSTR(host, 1, 14)order by time desc limit 10
```

#### 查看事务状态

```language-sql
select @@tx_isolation;
SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;
select * from information_schema.INNODB_LOCKS;
select * from information_schema.INNODB_LOCK_WAITS;

kill 9930577;
```

#### 查看数据库状态

```language-sql
show indexs database;
show index from <table>
desc database;
show table status from db [like "xxx%"] 
```

#### 查看语句解释状态

```language-sql
explain 
select * from database;
```

#### 增加字段/索引

```language-sql
# 添加字段
ALTER TABLE dmj_item ADD `platform` VARCHAR(12) DEFAULT NULL COMMENT 'comment';
# UNIQUE(唯一索引)
ALTER TABLE `table_name` ADD UNIQUE (`column`) 
# INDEX(普通索引)
ALTER TABLE `table_name` ADD INDEX index_name (`column`) 
# FULLTEXT(全文索引)
ALTER TABLE `table_name` ADD FULLTEXT (`column`) 
#  组合索引
ALTER TABLE `table_name` ADD INDEX index_name (`column1`, `column2`, `column3`)
```

#### 数据迁移

```language-sql
#  大量并发下批量插入 关闭自动提交，否则可能出现大量死锁
SET autocommit=0;
#  ignore 参数判断主键，唯一主键是否相同，有一则条件符合插入失败
#  组合唯一主键第一个键自动转key
INSERT IGNORE DELAYED INTO kb_prop_word_label (
	`id`,
	`cid`,
	`fp`,
	`word`,
	`prop_name`,
	`source`,
	`count`,
	`status`,
	`editor`,
	`add_time`,
	`upd_time`
) SELECT
	  p.id,
	  p.cid,
	  p.fp,
	  ""    AS word,
	  ""    AS `prop_name`,
	  1     AS `source`,
	  1     AS `count`,
	  1     AS `status`,
	  ""    AS `editor`,
	  now() AS `add_time`,
	  now() AS `upd_time`
  FROM
	  kb_obj_prop_word p
  where
  p.id between 100000 and 200000
on duplicate key update upd_time=values(`upd_time`)
# ⬆️ 如果重复，只更新匹配字段
# ⬆️ 由于 select 翻页过慢，用 between 代替 limit 走主键索引翻页
```

```language-sql
## 左链表查询，右边可为null
select * from a left join b on a.id=b.id
## 右链表查询，左边可为null
select * from a right join b on a.id=b.id
## 内联表两边都不能为 null
select * from a inner join b on a.id=b.id
```

### 查看物理文件位置

```
show global variables like "%datadir%";
mysql --help | grep my.cnf;
```

### 设置配置

```language-bash
cp /usr/local/opt/mysql/support-files/my-default.cnf /etc/my.cnf
```

#### 陷阱

0x00 精度问题
0x01 大并发的 batchinsert 操作是不会锁表的，锁表可能就是 auto_increment
0x02 limit 性能很差，越翻页到后面越慢，用 between and 代替
0x03 truncate table 操作会导致 client datasource 找不到这张表， 因为表重建了。
预估count explain select count(*) from t_order;

#### 习惯

where 紧跟着 select 后面，用（）包起来，然后在做查询

```language-sql
INSERT overwrite TABLE kb_obj_prop_word_all partition (dt='20151120')
select a.id,a.cid,a.org_pid,b.id as prop_id,a.fp from 
(
select id,cid,org_pid,fp from kb_obj_prop_word where  dt='20151120'  ) a 
join (
select id from kb_obj_prop_split where  dt='20151120' group by id) b on(a.org_pid = b.id)

```
