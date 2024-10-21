title: LogAnalyize ElasticSearch
date: 2017/12/01 08:08:26
categories:
 - tryghost

tags:
 - 未归档 



---

安装条件
增加一个新账户 no root
安装完成后报错
[1]: max number of threads [2048] for user [elsearch] is too low, increase to at least [4096]
[2]: system call filters failed to install; check the logs and fix your configuration or disable system call filters at your own risk

解决1
https://www.elastic.co/guide/en/elasticsearch/reference/6.0/max-number-of-threads.html
ulimit -u 4096 
解决2
elasticsearch.yml 增加
bootstrap.memory_lock: false
bootstrap.system_call_filter: false
解决
groupadd elsearch
useradd elsearch -g elsearch -p elasticsearch
解决
/etc/security/limits.d/90-nproc.conf 





