title: OLAP MaxCompute
date: 2015/11/18 02:28:27
categories:
 - tryghost

tags:
 - python 



---

# 简介
![](http://img.sandseasoft.com/image/f/04/b4f69fb11a18fca1c71c56deaff67.png)

入口

[open.taobao.com](open.taobao.com)

http://help.aliyun.com/product/8314999_odps.html

本质是hadoop 集群，三个部分组成：

 * 数据工厂，编辑管理 hive 脚本
 * 任务管理，RDS、ODPS 数据同步的任务，计算任务
 * 任务监控，查看当前，历史任务。
 * 管理面板。配置，审计



## 数据工厂
保存编辑脚本，常规语法
```language-sql
###  建表，partitioned 代表时间分片
drop table if exists kb_wordbase_weight;
create table kb_wordbase_weight(
  	cid bigint,
  	category_name string, 
  	pid bigint,
  	property_name string,
  	property_level int,
  	property_group_id bigint,
  	child_prop_num bigint,
  	min_common_word string,
  	extract_word string,
  	category_property_weight double
)partitioned by (dt string);

###  其中 dt 代表时间切片，注意查询和增加的使用方法
INSERT overwrite TABLE kb_wordbase_property_weight partition (dt="20151113")
SELECT t1.cid,
       t1.property_group_id,
       t1.property_level,
       t1.count / t2.category_max * 10
FROM kb_wordbase_property_count t1
LEFT OUTER JOIN kb_wordbase_property_category_total t2 ON t1.cid = t2.cid
WHERE t1.dt="20151113"
  AND t2.dt="20151113";

###  当然，还支持一些 Hive 的函数
INSERT overwrite TABLE kb_wordbase_word_wash_3 partition (dt="20151113")
SELECT DISTINCT cid,
                segment,
                tag
FROM kb_wordbase_word_wash_2
WHERE dt="20151113";

```
几个有用的函数,注意默认使用 string 字段，当需要参杂业务的时候使用 cast 方法强转字符。  小数运算会丢失精度，使用round(xxx,2)截取然后继续。
```language-sql
# 1.11
round(1.11111,2);
# 2
ceil(1.11)
# now()
getdate()
```

## 任务管理
 * 同步任务，支持 RDS、ODPS 数据同步（坑，ODPS 导入 RDS 不支持数据分片，多次导入数据冗余）
 * 刷新任务，支持定时脚本任务







