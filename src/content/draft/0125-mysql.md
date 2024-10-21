title: mysql
date: 2016/03/16 08:05:28
categories:
 - tryghost

tags:
 - 未归档 



---

概述

   本文通过一个实际例子，说明如何使用工具来分析生产环境上的慢查询，并对慢查询进行优化。

发现问题

    在生产环境上发现机器load比较高，io %util用满，但是mysql的查询、删除和更新语句数很小 （使用orzdba工具，参考 Linux主机和MySQL监控工具 ------ orzdba），如下

 -------- -----load-avg---- ---cpu-usage--- ---swap--- -------------------------io-usage-----------------------                     -QPS- -TPS-         -Hit%- ------threads------ -----bytes----
  time  |  1m    5m   15m |usr sys idl iow|   si   so|   r/s    w/s    rkB/s    wkB/s  queue await svctm %util|  ins   upd   del    sel   iud|     lor    hit| run  con  cre  cac|   recv   send|
17:52:54| 3.65  4.08  3.98|  5   1  84  10|    0    0|  114.0   27.5  2154.3    680.1   8.0   61.1   6.8  96.6|    0     0     0      2     0|    3361  97.08|  60  111    0    0|     1k   2.3m|
17:52:55| 3.65  4.08  3.98|  9   2  80   9|    0    0|   97.2  139.0  2632.3   2422.4 108.4  225.7   4.1  95.7|    0     1     0      1     1|   29049  99.99|  61  111    0    0|    801   2.0m|
17:52:56| 3.60  4.07  3.97|  3   2  83  12|    0    0|  102.0  176.5  2717.6   2384.3  89.0  445.4   3.4  95.9|    0     0     0      1     0|       0 100.00|  60  111    0    0|    837   2.9m|
17:52:57| 3.60  4.07  3.97|  4   2  84  10|    0    0|  218.5  178.1  6305.5   3121.3  39.2  150.7   2.3  91.8|    0     1     0      1     1|   29034  99.99|  60  111    0    0|     1k   6.0m|
17:52:58| 3.60  4.07  3.97|  5   2  84   9|    0    0|  358.4    0.0  9580.4      0.0   2.6    7.2   2.5  88.1|    0     0     0      2     0|       0 100.00|  60  112    1    0|    815   8.5m|
17:52:59| 3.60  4.07  3.97| 12   2  76  10|    0    0|  277.4   31.3  5575.6    949.5  32.5   21.8   3.0  91.9|    0     1     0      1     1|  115825  98.45|  61  112    0    0|     2k   5.2m|
17:53:00| 3.60  4.07  3.97|  2   1  87  10|    0    0|    2.0  245.5     7.8   2480.2 150.2  503.7   4.1 100.0|    0     1     0      1     1|   29034  99.99|  62  112    0    0|    800    17k|
17:53:01| 3.55  4.05  3.97|  1   1  87  11|    0    0|    1.0  207.3     3.9   4227.7 142.0  674.9   4.8  99.9|    0     0     0      1     0|       0 100.00|  62  112    0    0|    716     1k|
17:53:02| 3.55  4.05  3.97|  1   1  79  19|    0    0|    2.0  214.2     7.8   3282.2 141.7  625.1   4.6  99.9|    0     0     0      1     0|       0 100.00|  62  112    0    0|     1k     3k|
17:53:03| 3.55  4.05  3.97|  1   1  75  24|    0    0|    2.0  310.4     7.8   3748.3 146.5  563.0   3.2 100.0|    0     0     0      1     0|       0 100.00|  62  112    0    0|    716     1k|
17:53:04| 3.55  4.05  3.97|  2   1  75  22|    0    0|    2.9  389.3    11.7   4331.7 137.4  381.2   2.5 100.0|    0     0     0      1     0|       0 100.00|  62  112    0    0|    716     1k|
17:53:05| 3.55  4.05  3.97|  2   1  86  11|    0    0|   17.6  120.3    70.4   2988.8  19.2  234.4   7.2 100.0|    0     0     0      3     0|      26  80.77|  60  112    0    0|     1k     4k|
17:53:06| 3.35  4.00  3.95|  6   1  81  11|    0    0|  224.7   51.8  3563.4    347.7   4.6   34.1   3.5  96.5|    0     0     0      1     0|       0 100.00|  60  112    0    0|    816   2.3m|
17:53:07| 3.35  4.00  3.95|  8   1  71  20|    0    0|   85.1  154.5  1228.4   2754.0 100.6  279.6   4.1  97.6|    0     1     0      1     1|      10  60.00|  61  112    0    0|    896   1.2m|
17:53:08| 3.35  4.00  3.95|  5   1  78  16|    0    0|   34.4  330.8  1024.8   3372.8 118.8  417.7   4.4 100.0|    0     3     0      2     3|   58120  99.96|  64  112    0    0|     4k   498k|
-------- -----load-avg---- ---cpu-usage--- ---swap--- -------------------------io-usage-----------------------                     -QPS- -TPS-         -Hit%- ------threads------ -----bytes----
    再使用top命令，发现mysql的cpu使用率最高，因此估计是mysql有慢查询导致。

慢查询分析

    默认情况下mysql没有开启慢查询，需要手动开启。注意在处理完问题后也要手工关闭该选项，否则性能会受一些影响。

1. 登录mysql

mysql -uroot -p密码
2. 查询是否开启慢查询 （log_slow_queries是否为ON）

show variables like '%slow%';
+---------------------+------------------------------------+
| Variable_name       | Value                              |
+---------------------+------------------------------------+
| log_slow_queries    | OFF                                |
| slow_launch_time    | 2                                  |
| slow_query_log      | OFF                                |
| slow_query_log_file | /var/mysql/data/uhz002798-slow.log |
+---------------------+------------------------------------+
4 rows in set (0.01 sec)
3. 开启慢查询（不需要重启数据库）

set global log_slow_queries=ON ;
/usr/local/mysql/bin/mysqldumpslow -s c -t 10 /var/mysql/data/uhz002798-slow.log
h5. *mysqldumpslow命令*/usr/local/mysql/bin/mysqldumpslow -s c -t 10 /var/mysql/data/uhz002798-slow.log
该命令会输出记录次数最多的10条SQL语句，其中：

    -s, 是表示按照何种方式排序，c、t、l、r分别是按照记录次数、时间、查询时间、返回的记录数来排序，ac、at、al、ar，表示相应的倒叙；
    -t, 是top n的意思，即为返回前面多少条的数据；
    -g, 后边可以写一个正则匹配模式，大小写不敏感的；
    慢查询日志文件路径见mysql参数 slow_query_log_file
     查询结果如下：

[root@uhz002798 data]#  /usr/local/mysql/bin/mysqldumpslow -s c -t 10 /var/mysql/data/uhz002798-slow.log

Count: 1  Time=138.15s (138s)  Lock=0.00s (0s)  Rows=0.0 (0), root[root]@localhost
  update check_error_item_4  set status='S' where numIid='S'

Count: 1  Time=25.57s (25s)  Lock=0.00s (0s)  Rows=0.0 (0), root[root]@localhost
  delete from check_error_item_1 where taskId=N

Count: 1  Time=133.27s (133s)  Lock=0.00s (0s)  Rows=0.0 (0), root[root]@localhost
  delete from check_error_item_4 where taskId=N

Count: 1  Time=151.91s (151s)  Lock=0.00s (0s)  Rows=0.0 (0), root[root]@localhost
  delete from check_error_item_3 where taskId=N
     Count：语句的执行次数
     Time： 语句的执行时间
     Lock： 锁时间

4. 分析查询结果

    我们可以用explain来查看sql执行计划，但是explain命令只能分析select语句，上面的delete和update语句怎么办？  我们将update和delete语句转为select语句进行分析：

update check_error_item_4  set status='S' where numIid='S'
    改为select语句，并加上explain

explain select * from check_error_item_4 where numIid='S';
    分析结果

+----+-------------+--------------------+------+---------------+------+---------+------+---------+-------------+
| id | select_type | table              | type | possible_keys | key  | key_len | ref  | rows    | Extra       |
+----+-------------+--------------------+------+---------------+------+---------+------+---------+-------------+
|  1 | SIMPLE      | check_error_item_4 | ALL  | NULL          | NULL | NULL    | NULL | 8141292 | Using where |
+----+-------------+--------------------+------+---------------+------+---------+------+---------+-------------+
1 row in set (0.00 sec)
    分析结果的type为ALL，表明这条语句导致了全表扫描。 通过查询该表的数据量，发现该表有913万条记录（1.7G大小）。对这么大的表做全表扫描必定是非常耗费IO的。

     下面通过SHOW INDEX命令查看该表的索引情况，确定该表并没有根据numIid字段建索引：

 mysql> SHOW INDEX FROM check_error_item_4;
+--------------------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| Table              | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment |
+--------------------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| check_error_item_4 |          0 | PRIMARY  |            1 | keyId       | A         |     8240568 |     NULL | NULL   |      | BTREE      |         |               |
| check_error_item_4 |          1 | Index_2  |            1 | taskId      | A         |       32064 |     NULL | NULL   | YES  | BTREE      |         |               |
+--------------------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
2 rows in set (0.57 sec)
    建索引（注意该表很大，建索引可能需要十几分钟到半小时不等，需要在业务空闲时操作）

ALTER TABLE `check_error_item_4` ADD INDEX `idx_numiid` (`num_iid`) ;
    接下来看一下这条delete语句。

delete from check_error_item_4 where taskId=N
    该表的taskId已经建了索引，但是通过分析语句后，发现该语句的执行计划还是全表扫描。 使用desc tableName查看taskId字段类型，原来该字段类型为varchar，但在sql中没有使用引号。 通过两个执行计划，我们可以看出其中的差别：

 mysql> explain select * from check_error_item_4 where taskId = 90;
+----+-------------+--------------------+------+---------------+------+---------+------+---------+-------------+
| id | select_type | table              | type | possible_keys | key  | key_len | ref  | rows    | Extra       |
+----+-------------+--------------------+------+---------------+------+---------+------+---------+-------------+
|  1 | SIMPLE      | check_error_item_4 | ALL  | Index_2       | NULL | NULL    | NULL | 8295386 | Using where |
+----+-------------+--------------------+------+---------------+------+---------+------+---------+-------------+
1 row in set (0.00 sec)

mysql> explain select * from check_error_item_4 where taskId = '90';
+----+-------------+--------------------+------+---------------+---------+---------+-------+------+-------------+
| id | select_type | table              | type | possible_keys | key     | key_len | ref   | rows | Extra       |
+----+-------------+--------------------+------+---------------+---------+---------+-------+------+-------------+
|  1 | SIMPLE      | check_error_item_4 | ref  | Index_2       | Index_2 | 138     | const |    8 | Using where |
+----+-------------+--------------------+------+---------------+---------+---------+-------+------+-------------+
1 row in set (0.08 sec)
    解决的方法很简单，修改程序为sql语句的taskId值加上引号即可。

参考

用命令查看数据库中表的数据行数和表占用空间大小（对于Innodb引擎的表，数据行数不准，仅供参考）
select table_name, `ENGINE`, TABLE_ROWS, DATA_LENGTH/1024/1024 as DATA_LENGTH  from information_schema.`TABLES` where TABLE_SCHEMA='数据库名';
SHOW INDEX 命令返回信息的含义 Table 表的名称。
    Non_unique   如果索引不能包括重复词，则为0。如果可以，则为1。

    Key_name     索引的名称。

    Seq_in_index 索引中的列序列号，从1开始。

    Column_name  列名称。

    Collation    列以什么方式存储在索引中。在MySQLSHOW INDEX语法中，有值'A'（升序）或NULL（无分类）。

    Cardinality  索引中唯一值的数目的估计值。通过运行ANALYZE TABLE或myisamchk -a可以更新。基数根据被存储为整数的统计数据来计数，所以即使对于小型表，该值也没有必要是精确的。基数越大，当进行联合时，MySQL使用该索引的机会就越大。
        Cardinality会有如下的含义：
        1. 列值代表的是此列中存储的唯一值的个数（如果此列为primary key 则值为记录的行数）
        2. 列值只是个估计值，并不准确。
        3. 列值不会自动更新，需要通过Analyze table来更新一张表或者mysqlcheck -Aa来进行更新整个数据库。
        4. 列值的大小影响Join时是否选用这个Index的判断。
        5. 创建Index时，MyISAM的表Cardinality的值为null，InnoDB的表Cardinality的值大概为行数。
        6. MyISAM与InnoDB对于Cardinality的计算方式不同
            更多参考该文章 http://www.mysqlperformanceblog.com/2008/09/03/analyze-myisam-vs-innodb/

    Sub_part 如果列只是被部分地编入索引，则为被编入索引的字符的数目。如果整列被编入索引，则为NULL。

    Packed 指示关键字如何被压缩。如果没有被压缩，则为NULL。

    Null 如果列含有NULL，则含有YES。如果没有，则该列含有NO。

    Index_type 用过的索引方法（BTREE, FULLTEXT, HASH, RTREE）。

    Comment 多种评注。

结束....




