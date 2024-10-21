title: Guide MySQL mysqldump/Binlog
date: 2016/12/09 06:09:54
categories:
 - tryghost

tags:
 - 未归档 



---

### mysqldump
```language-bash
# 备份所有数据库
mysqldump  --all-databases>test.dump
# 备份指定数据库
mysqldump [--opt] [--no-data --databases] -uroot -p mt_dev > /root/bak/mt_dev.dump
# 跨主机备份
mysqldump --host=host1 --opt sourceDb| mysql --host=host2 -C targetDb
# 恢复数据库
mysql [database name] < [backup file name]
```
```language-bash
mysqldump -u root -pPASSWORD --all-databases | gzip > /mnt/disk2/database_`date '+%m-%d-%Y'`.sql.gz
```



### BinLog
```langage-bash
# 启动binlog
vim /etc/my.cnf
[mysqld]
bin-log=xxxx
```

```language-bash
# 查看
cd /var/lib/mysql
# 自动删除binlog
# 通过binlog参数（expire_logs_days ）来实现mysql自动删除binlog
mysql> show binary logs;
mysql> show variables like 'expire_logs_days';
mysql> set global expire_logs_days=3;
# 手工删除binlog
mysql> reset master;   //删除master的binlog
mysql> reset slave;    //删除slave的中继日志
mysql> purge master logs before '2012-03-30 17:20:00';  //删除指定日期以前的日志索引中binlog日志文件
mysql> purge master logs to 'binlog.000002';   //删除指定日志文件的日志索引中binlog日志文件

# 查看binlog
show binlog events in 'mysql-bin.000002';

# 远程binlog备份
mysqlbinlog -u username -p password -hl-db1.dba.beta.cn6.qunar.com -P3306 \
--read-from-remote-server --start-datetime='2013-09-10 23:00:00' --stop-datetime='2013-09-10 23:30:00' mysql-bin.000001 > t.binlog

```

### 结合mysqldump和binlog做数据还原
```language-bash
# 本地库还原
mysql -uroot -pPwd < backup_sunday_1_PM.sql
# 本地binlog还原
mysqlbinlog --start-date="2005-04-20 10:01:00" --stop-date="2005-04-20 10:05:00" mysql-bin.000003 | mysql -uroot -pPwd 
# 把sql导出
mysqlbinlog --start-date="2005-04-20 10:01:00" --stop-date="2005-04-20 10:05:00" mysql-bin.000003 >/tmp/restore.sql
```

![](http://img.sandseasoft.com/image/e/4b/f2755584878df485a04b65fe8b0b6.png)
### 引用
这篇文章讲的很好
http://www.cnblogs.com/feichexia/p/MysqlDataBackup.html
https://my.oschina.net/u/1462678/blog/232723




