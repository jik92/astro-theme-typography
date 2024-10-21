title: Zabbix 使用
date: 2016/04/02 15:15:12
categories:
 - tryghost

tags:
 - devops 



---

## 官网

http://www.zabbix.com/

## 文档

https://www.zabbix.com/documentation/3.0/

## 论坛

http://www.zabbix.net.cn/

## 下载

http://www.zabbix.com/download.php

## 安装
 * 前置安装 yum -y install unixODBC
 * 走 docker
 https://hub.docker.com/r/zabbix/zabbix-3.0/
 * 默认账号密码  Admin zabbix
 * 开启中文语言支持 
 * 安装 agent => Configuration——Hosts——Create

## 概念
 
 * host
 * item
 * trigger
 * action
 * Medias
 * users

## install agent
```language-bash
apt-get install zabbix-agent
```

## 命令
 * zabbix_agent
 * zabbix_agentd
 * zabbix_get
 * zabbix_sender
 * zabbix_server

```language-bash
# debug log 
/var/log/zabbix-agent/zabbix_agentd.log
# 启动
zabbix_agentd -c /etc/zabbix/zabbix_agentd.conf
# 关闭
ps -ef | grep zabbix | awk '{ print $2 }' | sudo xargs kill -9
# 测试
zabbix_sender   -s "xxxxx"   -z 192.168.31.202 -k MongoDB.Status[version] -o 2.4.6
```

## onealert 集成

## 其他代替
* apm https://oneapm.com/
* aliyun 运维监控



