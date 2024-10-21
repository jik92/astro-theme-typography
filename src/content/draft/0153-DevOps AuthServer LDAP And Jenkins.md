title: DevOps AuthServer LDAP And Jenkins
date: 2016/07/13 06:53:06
categories:
 - tryghost

tags:
 - devops 



---

# LDAP安装
## Client
http://www.jxplorer.org/
## Server
http://directory.apache.org/apacheds/
## 安装方法
http://directory.apache.org/apacheds/download/download-linux-bin.html

```language-bash
chmod a+x apacheds-2.0.0-M23-64bit.bin

./bin/apacheds start default
./bin/apacheds status default

Usage: /usr/local/apacheds-2.0.0-M24/bin/apacheds { console | start | stop | restart | status | dump | repair } <instance name>

defluat:LDAPv3.0 
port:10839
```
# Jenkins安装
https://jenkins.io/
https://www.w3cschool.cn/jenkins/
PS:移除 ${home}/.jenkins文件夹

# 默认配置
1. 默认账号uid=admin,ou=system 密码secret，找到对应账号修改密码
2. 安装ldap插件和 Role-based Authorization Strategy 插件
3. 安装jenkins，进入安全设置选择ldap插件，配置ldap链接![20171030150929657198688.png](http://img.sandseasoft.com/20171030150929657198688.png)
4. 配置安全组策略![2017103015092970478380.png](http://img.sandseasoft.com/2017103015092970478380.png)


# 常用插件
* GIT plugin
* Maven Invoker plugin
* Publish Over SSH (远程Shell)
* Maven Integration plugin (Maven集成，否则新建的时候没有Maven Project)
* Monitoring (监控Jenkins所消耗的系统资源，如内存使用等)
* Ansible plugins
* Blue Ocean
* pipline




