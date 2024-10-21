title: SelfHost MailServer
date: 2016/11/22 09:54:47
categories:
 - tryghost

tags:
 - tools 



---

## 背景
   在使用阿里和腾讯的免费企业邮箱的时候，发现有别有用心的人使用社工钓鱼企业内部机密资料，给部门行政管理带来很大的困扰，所以迁移回本地私有邮件服务器。

## 服务端
### 可选方案
 * postfix
 * hmailserver

###  hmailserver使用

资源 https://pan.baidu.com/s/1eSIAXKu

  1. 直接安装
  2. 加载libsql.dll
  3. 构建数据库
  4. 创建domain
  5. 创建account
  6. 设置 Delivery of email（中续邮箱）
  6. window防火墙->高级设置设置->入站规则->开放端口
  7. IP Rage 增加白名单域，set defualt
  6. foxmail client连接

![](http://img.sandseasoft.com/image/c/4e/a258bf4ee444a6acda752ffa64e52.jpeg)


### AfterLogic WebMail
### 使用
 1. 使用wampserver，挂在webmail
 2. /install ，一路next
 3. 管理后台登录, /adminpanel/index.php 设置save
 4. webmail登录，/index.php

![](http://img.sandseasoft.com/image/0/57/0f86ae9b1fd51f8b9bac95ab55eb8.png)
### 来源
 * https://en.wikipedia.org/wiki/Comparison_of_mail_servers
 * https://www.hmailserver.com/
 * http://www.afterlogic.org
 * http://www.foxmail.com/
 * http://www.wampserver.com/





