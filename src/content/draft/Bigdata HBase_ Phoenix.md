title: Bigdata HBase_ Phoenix
date: 2020/12/20 16:19:54
categories:

 - big data

tags:
 - hbase
 - phoenix

---

# Introduction



# Architecture

- 

# Feautre

- 

# Concept

* 

# Installation

```
vim ~/.bashrc
export PATH=$PATH:/bigdata/hbase/bin

vim /conf/hbase-env.sh
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export HBASE_CLASSPATH=/bigdata/hbase/conf 
export HBASE_MANAGES_ZK=true

vim /conf/hbase-site.xml
<property>
    <name>hbase.cluster.distributed</name>
    <value>true</value>
  </property>
  <property>
    <name>hbase.tmp.dir</name>
    <value>./tmp</value>
  </property>
  <property>
    <name>hbase.unsafe.stream.capability.enforce</name>
    <value>false</value>
  </property>
	  <property>
                <name>hbase.rootdir</name>
	<value>hdfs://bigserver1:9000/hbase</value>
</property>

./bin/start-hbase.sh
./bin/hbase shell
create 'student','Sname','Ssex','Sage','Sdept','course'   
put 'student','95001','Sname','LiYing'
get 'student','95001'
```

```
./hbase-cleanup.sh  --cleanAll

cp phoenix-5.0.0-HBase-2.0-server.jar /bigdata/hbase/lib/
stop-hbase.sh 
start-hbase.sh

cd /phoenix/bin
./sqlline.py 127.0.0.1:2181
```



# Usage

* 

# Quote

* 

