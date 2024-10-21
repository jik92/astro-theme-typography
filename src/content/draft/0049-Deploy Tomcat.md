title: Deploy Tomcat
date: 2015/11/19 16:34:58
categories:
 - tryghost

tags:
 - java 



---

虽然是最基本的，浪费我好多时间，记录如下

http://tomcat.apache.org/

# 安装 java7-orcale
# 配置setenv.sh
```language-bash
JAVA_OPTS='-server -Xms1024M -Xmx1024M  -XX:PermSize=512M'
JAVA_HOME="/usr/lib/jvm/java-7-oracle/"
```
# 管理界面
```language-xml
vim conf/tomcat-users.xml

<role rolename="manager-gui"/>
<role rolename="manager-jmx"/>
<role rolename="manager-status"/>
<role rolename="manager-script"/>
  <role rolename="admin-gui"/>
  <user username="tomcat" password="s3cret" roles="admin-gui"/>
<user username="tomcat1" password="tomcat" roles="manager-gui"/>
<user username="tomcat2" password="tomcat" roles="manager-jmx"/>
<user username="tomcat3" password="tomcat" roles="manager-status"/>
<user username="tomcat4" password="tomcat" roles="manager-script"/>
```
# 配置conf/server.xml
```language-xml
## 修改容器端口
<Server port="30004" shutdown="SHUTDOWN">
## 增加 UTF8 编码修复
<Connector port="8083" protocol="HTTP/1.1"
useBodyEncodingForURI="true" URIEncoding="UTF-8"
## 删除 AJP 端口暴露
<!-- Define an AJP 1.3 Connector on port 8009 -->

```


当然可以直接使用 maven-plugin
```language-xml
<plugin>
  <groupId>org.apache.tomcat.maven</groupId>
  <artifactId>tomcat7-maven-plugin</artifactId>
  <version>2.2</version>
</plugin>

```

## 更改域名
在 server.xml 的<Host>标签增加
```language-xml
<Context path="/jsp" docBase="e:/jsp" debug="0" reloadable="true" allowLinking="true"> </Context>

```



