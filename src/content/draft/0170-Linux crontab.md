title: Linux crontab
date: 2016/12/09 06:18:31
categories:
 - tryghost

tags:
 - devops 



---

### crontab 定时器使用
```language-bash
# 服务重启
service crond restart
# 编辑、查询
crontab -[e][l]
# 日志查看
tail -fn 200 /var/log/cron

crontab -e
*/1 * * * * sh /root/script/echo.sh
0 1 * * * sh /root/script/backup.sh


# 测试
echo 'hello' >>/root/bak/xxxx`date '+%Y%m%d'`.test
# 备份数据库
/usr/bin/mysqldump -uroot -p123456 mt_demo > /root/bak/mt_demo_`date +%Y%m%d`.bak
/usr/bin/find /root/bak -mtime +7 -name "*.*" -exec rm -rf {} \;
# 全局备份
mysqldump -u root -pPASSWORD --all-databases | gzip > /mnt/disk2/database_`date '+%m-%d-%Y'`.sql.gz

```





