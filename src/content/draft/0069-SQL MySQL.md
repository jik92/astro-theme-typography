title: SQL MySQL
date: 2015/12/03 02:31:12
categories:
 - tryghost

tags:
 - store 



---

命令相关
```
mysqld 
mysqladmin
mysqldump 
mysql -u use -h localhost -P 3386 -p   
mysql -h
set character_set_server=utf8
```
配置 binlog
```language-bash
[mysqld]
# innodb_force_recovery= 1
# basedir = /var/root/data
datadir = /Users/zuoyun1/data
log-bin=mysql-bin
server_id =1
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES

# 解决字符集问题
character-set-server=utf8
collation-server=utf8_general_ci

slow_query_log=TRUE
slow_query_log_file=/usr/log/slow_log.txt
long_query_time=3
max_connections=300
# 大小写敏感
lower_case_table_names=1
[client]
default-character-set=utf8
```

初始化一个新的 mysql
```language-sql
# 新建一个指定目录
mysqld --initialize --user=zuoyun1 --datadir=/Users/zuoyun1/data
# 修改初始化密码
mysql -u root -p 
SET PASSWORD FOR root=PASSWORD('123456');
```

开启远程登录
```language-sql
# 将 discuz 数据库的所有权限授权给 ted 这个用户，允许 ted 用户在 123.123.123.123 这个 IP 进行远程登陆，并设置 ted 用户的密码为 123456 
grant all PRIVILEGES on discuz.* to ted@'123.123.123.123' identified by '123456';

# create account for all domain
create user jik1992@'%' identified by 'xxxx';
grant all privileges on *.* to jik1992@'%' with grant option;
flush privileges;
```



