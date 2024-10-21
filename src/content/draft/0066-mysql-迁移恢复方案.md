title: mysql-迁移恢复方案
date: 2015/12/01 18:01:05
categories:
 - tryghost

tags:
 - 未归档 



---

读写分离
```
# 启动 
mysqld
```

热备份
```
xtrabackup
```

## 开启binlog
/etc/my.conf
```language-bash
log-bin=mylog
```

```language-sql
# 查看是否开启
show variables like  '%bin%'
# 查看具体的方案
show binlog events in 'mysql_bin.000001
# 恢复
mysqlbinlog  --start-date="2012-10-15 16:30:00" --stop-date="2012-10-15 17:00:00" --stop-postion="100" mysql_bin.000001 |mysql -uroot -p123456
# 重启 binlog
flush logs;
```


参考

http://orangeholic.iteye.com/blog/1698736





