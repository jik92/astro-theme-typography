title: OLAP Datax
date: 2016/12/15 09:19:22
categories:
 - tryghost

tags:
 - python 



---

## 背景
各种数据迁移，ETL

## 使用

* 安装
```language-bash
tar zxvf datax.tar.gz
sudo chmod -R 755 {YOUR_DATAX_HOME}
```
* 生成传输脚本文件
```language-bash
# 生成传输脚本
python datax.py -r mysqlreader -w mysqlwriter
```
```language-javascipt
{
    "job": {
        "content": [
            {
                "reader": {
                    "name": "mysqlreader", 
                    "parameter": {
                        "column": [], 
                        "connection": [
                            {
                                "jdbcUrl": [], 
                                "table": []
                            }
                        ], 
                        "password": "", 
                        "username": "", 
                        "where": ""
                    }
                }, 
                "writer": {
                    "name": "mysqlwriter", 
                    "parameter": {
                        "column": [], 
                        "connection": [
                            {
                                "jdbcUrl": "", 
                                "table": []
                            }
                        ], 
                        "password": "", 
                        "preSql": [], 
                        "session": [], 
                        "username": "", 
                        "writeMode": ""
                    }
                }
            }
        ], 
        "setting": {
            "speed": {
                "channel": ""
            }
        }
    }
}
```

* 定时器
```language-bash
0,10,20,35,44,50 * * * *  python /home/admin/datax3/bin/datax.py /home/admin/mysql2odps.json  >>/home/hanfa.shf/log.`date +\%Y\%m\%d\%H\%M\%S`  2>&1

```


## 引用
* https://github.com/alibaba/DataX
* https://github.com/alibaba/DataX/wiki/Quick-Start
* https://github.com/alibaba/DataX/blob/master/mysqlwriter/doc/mysqlwriter.md



