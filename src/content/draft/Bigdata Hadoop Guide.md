title: Bigdata Hadoop Guide
date: 2020/12/26 16:19:54
categories:

 - big data

tags:
 - spark
 - hadoop
 - hive

---

# Introduction



# Architecture



# Feautre



# Concept

# Installation

- [Standalone Deploy Mode](https://spark.apache.org/docs/latest/spark-standalone.html): simplest way to deploy Spark on a private cluster
- [Hadoop YARN](https://spark.apache.org/docs/latest/running-on-yarn.html)
- [Kubernetes](https://spark.apache.org/docs/latest/running-on-kubernetes.html)

## Standalone

```shell
ignore
```

## Hadoop YARN

## Step 1 

```shell
# setting host
hostname bigserver1 # master
hostname bigserver2 # node
# setting each node
vim /etc/hosts
192.168.1.14 bigserver1  
192.168.1.15 bigserver2
# install java
apt install openjdk-8-jre-headless
# copy hadoop *.files
tar -zxvf hadoop-3.2.1.tar.gz  
mkdir /bigdata  
mv hadoop-3.2.1 /bigdata/hadoop  
mkdir -pv /bigdata/hadoop/{tmp,var,dfs,logs}  
mkdir -pv /bigdata/hadoop/dfs/{name,data} 
# backup
cd /bigdata/hadoop/etc
cp -r hadoop hadoop_bak
# ssh-copy-id
ssh-keygen -t rsa
ssh-copy-id -i ~/.ssh/id_rsa.pub jik1992@bigserver2
```

## Step2

`http://hadoop.apache.org/docs/r3.2.1/`

* /etc/hadoop/hadoop-env.sh
* /etc/hadoop/yarn-env.sh
* /etc/hadoop/core-site.xml
* /etc/hadoop/hdfs-site.xml
* /etc/hadoop/mapred-site.xml
* /etc/hadoop/yarn-site.xml
* /etc/hadoop/slaves

### hadoop-env.sh/yarn-env.sh

```shell
# setting hadoop-env.sh
echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> ~/.bashrc  
source ~/.bashrc  
vim hadoop-env.sh
# export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
```

### core-site

```shell
# setting core-site
vim /hadoop/core-site.xml
<property>  
   <name>hadoop.tmp.dir</name>  
   <value>/bigdata/hadoop/tmp</value>  
</property>  
<property>  
   <name>fs.default.name</name>  
   <value>hdfs://bigserver1:9000</value>  
</property>  
```

### hdfs-site.xml

```
# setting hdfs-site.xml
<property>  
   <name>dfs.name.dir</name>  
   <value>/bigdata/hadoop/dfs/name</value>  
</property>  
<property>  
   <name>dfs.data.dir</name>  
   <value>/bigdata/hadoop/dfs/data</value>  
</property>  
<property>  
   <name>dfs.replication</name>  
   <value>2</value>  
</property>  
<property>  
   <name>dfs.permissions</name>  
   <value>false</value>  
</property>  
```

### mapred-site.xml	

```shell
# mapred-site.xml
<property>  
   <name>mapred.job.tracker</name>  
   <value>bigserver1:49001</value>  
</property>  
<property>  
   <name>mapred.local.dir</name>  
   <value>/bigdata/hadoop/var</value>  
</property>  
<property>  
   <name>mapreduce.framework.name</name>  
   <value>yarn</value>  
</property>  
<property>
<name>yarn.app.mapreduce.am.env</name>
<value>HADOOP_MAPRED_HOME=/bigdata/hadoop/</value>
</property>
<property>
<name>mapreduce.map.env</name>
<value>HADOOP_MAPRED_HOME=/bigdata/hadoop/</value>
</property>

<property>
<name>mapreduce.reduce.env</name>
<value>HADOOP_MAPRED_HOME=/bigdata/hadoop/</value>
</property>
```

### yarn-site.xml

```
# yarn-site.xml
<property>  
   <name>yarn.resourcemanager.hostname</name>  
   <value>bigserver1</value>  
</property>  
<property>  
   <name>yarn.resourcemanager.address</name>  
   <value>${yarn.resourcemanager.hostname}:8032</value>  
</property>  
<property>  
   <name>yarn.resourcemanager.scheduler.address</name>  
   <value>${yarn.resourcemanager.hostname}:8030</value>  
</property>  
<property>  
   <name>yarn.resourcemanager.webapp.address</name>  
   <value>${yarn.resourcemanager.hostname}:8088</value>  
</property>  
<property>  
   <name>yarn.resourcemanager.webapp.https.address</name>  
   <value>${yarn.resourcemanager.hostname}:8090</value>  
</property>  
<property>  
   <name>yarn.resourcemanager.resource-tracker.address</name>  
   <value>${yarn.resourcemanager.hostname}:8031</value>  
</property>  
<property>  
   <name>yarn.resourcemanager.admin.address</name>  
   <value>${yarn.resourcemanager.hostname}:8033</value>  
</property>  
<property>  
   <name>yarn.nodemanager.aux-services</name>  
   <value>mapreduce_shuffle</value>  
</property>  
<property>  
   <name>yarn.nodemanager.vmem-check-enabled</name>  
   <value>false</value>  
</property>  
```

## Step3

```shell
# sync files to node server
rsync -rvl /bigdata/ jik1992@bigserver2:/bigdata/
rsync -rvl /bigdata/hadoop/etc/ jik1992@bigserver2:/bigdata/hadoop/etc/
# setting worker
vim worker
bigserver2
# checked & 初始化成功后，会/bigdata/hadoop/dfs/name多出一个current文件夹
cd /bigdata/hadoop/bin/ && ./hadoop namenode -format  
# ResourceManager/NodeManager/NameNode/SecondaryNameNode/DataNode
./start-all.sh   | ./start-dfs.sh ./start-yarn.sh
# checked 
http://192.168.1.14:9870/
http://192.168.1.14:8088/
# test
# calc Pi
./hadoop jar ../share/hadoop/mapreduce/hadoop-mapreduce-examples-3.2.1.jar pi 10 10
# count words
./hadoop fs -mkdir -p /test/input
./hadoop fs -ls /
echo "hello world">> words.txt
./hadoop fs -put words.txt /test/input
./hadoop fs -ls /test/input
./hadoop fs -get /test/input/words.txt ~/data
./hadoop jar ../share/hadoop/mapreduce/hadoop-mapreduce-examples-3.2.1.jar wordcount /test/input /test/output
./hadoop fs -get /test/output/ ~/data
```

## Installation Hive

### install mysql

```shell
docker run --name mysql-demo  -e MYSQL_ROOT_PASSWORD=jik920717 -p 3306:3306 -d mysql
docker exec -it xxxx /bin/bash
create user jik1992@'%' identified by 'xxxx';
grant all privileges on *.* to jik1992@'%' with grant option;
flush privileges;

ALTER USER 'jik1992'@'%' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER; 
ALTER USER 'jik1992'@'%' IDENTIFIED WITH mysql_native_password BY 'jik920717';
flush privileges;
```

### Setting Profile

```shell
vim  /etc/profile
export HIVE_HOME=/home/jik1992/ops/apache-hive-3.1.2-bin
export PATH=$PATH:$HIVE_HOME/bin
source /etc/profile
```

### Configuration

```shell
# https://blog.csdn.net/qq_37076742/article/details/83547956
# https://blog.csdn.net/l1028386804/article/details/88014099
cp hive-env.sh.template hive-env.sh 
cp hive-default.xml.template hive-site.xml 
cp hive-log4j2.properties.template hive-log4j2.properties 
cp hive-exec-log4j2.properties.template hive-exec-log4j2.properties

# setting hive-env.sh
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export HADOOP_HOME=/bigdata/hadoop/
export HIVE_HOME=/home/jik1992/ops/apache-hive-3.1.2-bin 
export HIVE_CONF_DIR=$HIVE_HOME/conf 

# setting hive-site.xml
<property> 
	<name>hive.exec.scratchdir</name> 
	<value>/tmp/hive-${user.name}</value> 
</property> 
<property> 
	<name>hive.exec.local.scratchdir</name> 
	<value>/tmp/${user.name}</value>  
</property> 
<property> 
	<name>hive.downloaded.resources.dir</name> 
	<value>/tmp/hive/resources</value> 
</property> 
<property> 
	<name> hive.querylog.location</name> 
	<value>/tmp/${user.name}</value> 
</property>
<property> 
	<name>hive.server2.logging.operation.log.location</name> 
	<value>/tmp/${user.name}/operation_logs</value> 
</property>

# copy mysql-connector-java-5.1.40-bin.jar /lib 
# setting hive-site.xml
<property> 
	<name>javax.jdo.option.ConnectionURL</name> 
	<value>jdbc:mysql://localhost:3306/hive?createDatabaseIfNotExist=true&characterEncoding=UTF-8&useSSL=false</value> 
</property> 
<property>
	<name>javax.jdo.option.ConnectionDriverName</name>
	<value>com.mysql.jdbc.Driver</value>
</property>
<property>
	<name>javax.jdo.option.ConnectionUserName</name>
	<value>jik1992</value>
</property>
<property>
	<name>javax.jdo.option.ConnectionPassword</name> 
	<value>jikxxxx</value>
</property>

# setting hive-site.xml
  <property>
    <name>system:java.io.tmpdir</name>
    <value>/tmp/hive/java</value>
  </property>
  <property>
    <name>system:user.name</name>
    <value>${user.name}</value>
  </property>

```

### create HDFS

```shell
./hdfs dfs -mkdir /tmp 
./hdfs dfs -mkdir -p /usr/hive/warehouse 
./hdfs dfs -chmod g+w /tmp 
./hdfs dfs -chmod g+w /usr/hive/warehouse
```

### Initial DB

```shell
#
./schematool -dbType mysql -initSchema
# TEST
./hive
create table test_hive(id int, name string)  row format delimited fields terminated by '\t' stored as textfile;
load data local inpath '/home/jik1992/ops/apache-hive-3.1.2-bin/test_tb.txt' into table test_hive; 
select * from test_hive; 
```



# Usage

```
# setting core-site.xml
<property>
  <name>hadoop.proxyuser.root.groups</name>
  <value>*</value>
</property>
<property>
  <name>hadoop.proxyuser.root.hosts</name>
  <value>*</value>
</property>

# settting hive-site.xml
<property>
    <name>beeline.hs2.connection.user</name>
    <value>hive2</value>
</property>
<property>
    <name>beeline.hs2.connection.password</name>
    <value>hive2</value>
</property>
<property>
    <name>beeline.hs2.connection.hosts</name>
    <value>0.0.0.0:10000</value>
</property>
  
# server
nohup ./hiveserver2 >/dev/null 2>&1 &

# 
./beeline 
!connect jdbc:hive2://bigserver1:10000
```



# Quote

* http://blog.51yip.com/hadoop/2013.html

* http://blog.51yip.com/hadoop/2019.html

* http://blog.51yip.com/hadoop/2351.html

  