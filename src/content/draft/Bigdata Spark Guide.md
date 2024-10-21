title: Bigdata Spark Guide
date: 2020/12/26 16:19:54
categories:

 - big data

tags:
 - spark

---

# Introduction

1. 快速处理能力
2. 易于使用
3. 通用性
4. 可用性高

# Architecture

- **Spark Core：**Spark的核心功能实现，包括：SparkContext的初始化(Driver Application通过SparkContext提交)、部署模式、存储体系、任务提交与执行、计算引擎等。
- **Spark SQL：**提供SQL处理能力，便于熟悉关系型数据库操作的工程师进行交互查询。此外，还为熟悉Hadoop的用户提供Hive SQL处理能力。
- **Spark Streaming：**提供流式计算处理能力，目前支持Kafka、Flume、Twitter、MQTT、ZeroMQ、Kinesis和简单的TCP套接字等数据源。此外，还提供窗口操作。
- **GraphX：**提供图计算处理能力，支持分布式。
- **MLlib：**提供机器学习相关的统计、分类、回归等领域的多种算法实现。其一致的API接口大大降低了用户的学习成本。

# Feautre

- **SparkContext：**通常而言，Driver Application的执行和输出都是通过SparkContent来完成的，在正式提交Application之前，首先需要初始化SparkContent。SparkContent隐藏了网络通信、分布式部署、消息通信、存储能力、计算能力、缓存、测量系统、文件服务、Web服务等内容，应用程序开发者只需要使用SparkContent提供的API完成功能开发。SparkContent内置的DAGScheduler负责创建Job，将DAG中的RDD划分到不同的Stage，提交Stage等功能。内置的TaskScheduler负责资源的申请、任务的提交及请求集群对任务的调度等工作。
- **存储体系：**Spark优先考虑使用各节点的内存作为存储，当内存不足时才会考虑使用磁盘，这极大地减少了磁盘I/O，提升了任务执行效率，使得Spark适用于实时计算、流式计算等场景。此外，Spark还提供了以内存为中心的高容错的分布式文件系统Tachyon供用户进行选择。Tachyon能够为Spark提供可靠的内存级的文件共享服务。
- **计算引擎：**计算引擎由SparkContent中的DAGScheduler、RDD以及具体节点上的Executor负责执行的Map和Reduce任务组成。
- **部署模式：**由于单节点不足以提供足够的存储和计算能力，所以作为大数据处理的Spark在SparkContext的TaskScheduler组件中提供了对Standalone部署模式的实现和Yarn、Mesos等分布式资源管理系统的支持。通过使用Standallone、Yarn、Mesos等部署模式为Task分配计算资源，提高任务的并发执行效率。除了可用于实际生产环境的Standalone、Yarn、Mesos等部署模式外，Spark还提供了Local模式和local-cluster模式便于开发和调试。

# Concept

* **RDD：**弹性分布式数据集。
* **Task：**具体执行任务。Task分为ShuffleMapTask和ResultTask两种。ShuffleMapTask和ResultTask分别类似于Hadoop中的Map和Reduce。
* **Job：**用户提交的作业。一个Job可能由一到多个Task组成。
* **Stage：**Job分成的阶段。一个Job可能被划分为一到多个Stage。
* **Partition：**数据分区。即一个RDD的数据可以划分为多少个分区。
* **NarrowDependency：**窄依赖，即子RDD依赖于父RDD中固定的Partition。NarrowDependency分为OneToOneDependency和RangeDependency两种。
* **ShuffleDependency：**shuffle依赖，也称为宽依赖，即子RDD对父RDD中的所有Partition都有依赖。
* **DAG：**有向无环图。用于反映各RDD之间的依赖关系。

# Installation

- [Standalone Deploy Mode](https://spark.apache.org/docs/latest/spark-standalone.html): simplest way to deploy Spark on a private cluster
- [Hadoop YARN](https://spark.apache.org/docs/latest/running-on-yarn.html)
- [Kubernetes](https://spark.apache.org/docs/latest/running-on-kubernetes.html)

## Standalone

```shell
# https://spark.apache.org/docs/latest/spark-standalone.html
./sbin/start-master.sh
./sbin/start-slave.sh <master-spark-URL>
./bin/spark-shell --master spark://IP:PORT	
```

## Hadoop YARN

```shell
echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> ~/.bashrc  
echo "export PATH=/bigdata/hadoop/bin:$PATH" >> ~/.bashrc  
echo "export HADOOP_HOME=/bigdata/hadoop" >> ~/.bashrc  
echo "export SPARK_HOME=/bigdata/spark" >> ~/.bashrc  
echo "export LD_LIBRARY_PATH=/bigdata/hadoop/lib/native/" >> ~/.bashrc  
source ~/.bashrc  

./hdfs dfs -mkdir /spark  
./hdfs dfs -mkdir /spark/logs  
./hdfs dfs -mkdir /spark/jars  
./hdfs dfs -put /bigdata/spark/jars/* /spark/jars/

cp spark-env.sh.template spark-env.sh
vim spark-env.sh
export SPARK_CONF_DIR=/bigdata/spark/conf  
export HADOOP_CONF_DIR=/bigdata/hadoop/etc/hadoop  
export YARN_CONF_DIR=/bigdata/hadoop/etc/hadoop  
export SPARK_HISTORY_OPTS="-Dspark.history.retainedApplications=3 -Dspark.history.fs.logDirectory=hdfs://bigserver1:9000/spark/logs"

cp spark-defaults.conf.template spark-defaults.conf
vim spark-defaults.conf
spark.master                     yarn  
spark.eventLog.enabled           true  
spark.eventLog.dir               hdfs://bigserver1:9000/spark/logs  
spark.driver.cores               1  
spark.driver.memory              512m  
spark.executor.cores             1  
spark.executor.memory            512m  
spark.executor.instances         1  
spark.submit.deployMode          client  
spark.yarn.jars                  hdfs://bigserver1:9000/spark/jars/*  
spark.serializer                 org.apache.spark.serializer.KryoSerializer

# cp slaves.template slaves //添加以下内容     
192.168.1.14 bigserver1  
192.168.1.15 bigserver2

#sync
rsync -rvl /bigdata/spark root@bigserver2:/bigdata/

#TEST
./run-example SparkPi 10

```



# Usage



# Quote

* https://spark.apache.org/
* http://blog.51yip.com/hadoop/2022.html
* http://blog.51yip.com/hadoop/2249.html
* http://blog.51yip.com/hadoop/2358.html

