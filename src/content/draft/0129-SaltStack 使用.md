title: SaltStack 使用
date: 2016/04/03 18:57:47
categories:
 - tryghost

tags:
 - devops 



---

Salt
## 官网
http://www.saltstack.com/
http://www.saltstack.cn/
https://docs.saltstack.com/en/latest/
## 概念
 * salt-master
 * salt-minion
 * 通信机制，通过4050端口双方通过 key 许可来连接，具体命令 salt-key
## 安装
```langauge-bash
# install
apt-get install salt-master
apt-get install salt-minion
# launch
service salt-master start
service salt-minion start
# debug
salt-master -l debug
salt-minion -l debug
# config
vim /etc/salt/master
vim /etc/salt/minion
# log
/var/log/salt/master
/var/log/salt/minion
```
## 服务端相关配置
```language-bash
# 默认网关
interface: 192.168.1.229
# 自动接受
auto_accept: True
```
## 客户端相关配置
```language-bash
id :68
master: 192.168.1.229
```
## 相关命令
```language-bash
salt '*' test.ping
salt '*' cmd.run "uptime"
salt '*' disk.usage
```

## 模板操作
 * 默认模板路径 /srv/salt/vim.sls





