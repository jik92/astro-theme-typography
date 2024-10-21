title: Bigdata Kylin_Zepplin
date: 2020/12/21 16:19:54
categories:

 - big data

tags:
 - hue
 - zepplin

---

# Introduction

1. 

# Architecture

- 

# Feautre

- 

# Concept

* 

# Installation

```
cp zeppelin-env.sh.template zeppelin-env.sh
cp zeppelin-site.xml.template zeppelin-site.xml
cp shiro.ini.template  shiro.ini

vi zeppelin-env.sh 
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export SPARK_HOME=/bigdata/spark

vi zeppelin-site.xml
<property>
  <name>zeppelin.server.addr</name>
  <value>0.0.0.0</value>
  <description>Server binding address</description>
</property>

<property>
  <name>zeppelin.server.port</name>
  <value>8089</value>
  <description>Server port.</description>
</property>

<property>
  <name>zeppelin.helium.registry</name>
  <value>helium</value>
</property>

<property>
  <name>zeppelin.anonymous.allowed</name>
  <value>false</value>
  <description>Anonymous user allowed by default</description>
</property>

vim shiro.ini
admin = jikxxx, admin

./bin/zeppelin-daemon.sh restart
```



# Usage

* 

# Quote

* https://zeppelin.apache.org/

