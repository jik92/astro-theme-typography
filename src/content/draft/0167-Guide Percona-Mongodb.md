title: Guide Percona-Mongodb
date: 2016/12/08 08:59:42
categories:
 - tryghost

tags:
 - devops 



---

### 背景
 * 完全兼容mongodb3.x API
 * rockdb内核，这意味着落地存储能力变强，不在强依赖内存性能
 * 不兼容ACID特性
 * 支持wiredtiger（default）／rockdb／memony

### 安装For CentOS
```language-bash
yum install http://www.percona.com/downloads/percona-release/redhat/0.1-4/percona-release-0.1-4.noarch.rpm

yum install Percona-Server-MongoDB-32

sudo service mongod start

vim /etc/mongod.conf 
-------
security:
  authorization: enabled
```


### 操作
```language-bash
# 备份
db.runCommand({createBackup: 1, backupDir: "/my/backup/data/path"})

# 增加角色，登录
db.createUser({user:"root",pwd:"123456",roles:[]})
db.auth('root','123456')
```

### 引用
https://www.percona.com/software/mongo-database/percona-server-for-mongodb





