title: Guide Percona-xtrabackup
date: 2016/12/08 09:35:02
categories:
 - tryghost

tags:
 - store 



---

### 背景
    mysql热备份／恢复工具
### 安装
```language-bash
yum install http://www.percona.com/downloads/percona-release/redhat/0.1-3/percona-release-0.1-3.noarch.rpm

yum install percona-xtrabackup-22
```

### 使用
```language-bash
# 备份
innobackupex --user=root --password=root --defaults-file=/etc/my.cnf --database=webmail /root/bak  
# 增量备份
innobackupex --user=root --password=root --database=webmail --incremental --incremental-basedir=/root/bak/2016-12-08_17-47-56 /root/bak

# 恢复
innobackupex --user=root --password=root --defaults-file=/etc/my.cnf  --apply-log /root/bak/2016-12-08_17-47-56
innobackupex --user=root --password=root --defaults-file=/etc/my.cnf  --copy-back /root/bak/2016-12-08_17-47-56
# 增量恢复
  见图一
```
![](http://img.sandseasoft.com/image/e/f2/b494b97e3a8104f41055f4a4063bb.png)



### 参考
http://blog.csdn.net/yongsheng0550/article/details/6682162



