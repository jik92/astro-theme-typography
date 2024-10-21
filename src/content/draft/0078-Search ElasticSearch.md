title: Search ElasticSearch
date: 2015/12/07 05:28:34
categories:
 - tryghost

tags:
 - store 



---

简介

 * 节点（Node）：节点是一个ES的实例，一般一台主机上部署一个节点-
 * 集群（Cluster）：集群由若干节点组成，和任意节点的通信等价于和集群的  通信
 * 分片（Shard）：一个索引会分成多个分片存储，分片数量在索引建立后不可更改
 * 副本（Replica）：副本是分片的一个拷贝，目的在于提高系统的容错性和搜索的效率
 * 索引（Index）：类似数据库的库
 * 类型（Type）：类似数据库的表
 * 文档（Document）：类似数据库的行，包含一个或多个Field
 * 字段（Field）：搜索的最小单元，可通过Mapping定义不同的属性（比如可否被搜索）


## 基本 CRUD
### 配置
启动锁定内存
```language-bash
ES_MIN_MEM=8.5g
ES_MAX_MEM=8.5g
ES_HEAP_SIZE=8G
```
配置
```language-bash
# 名称
cluster.name: my-application
# 节点名称
node.name: node-2
# 是否保存数据
node.data: true
node.master: true
# 分片副本
index.number_of_shards:5 
index.number_of_replicas:1
# 单播节点发现
discovery.zen.ping.unicast.hosts: ["x.x.x.x", "[::1]"]
# 锁内存
bootstrap.mlockall:true
# 是否禁止 http 访问
http.enabled
# 如果需要开启动态脚本查询，严禁使用 root 启动 es
script.groovy.sandbox.enabled: true
script.inline: on
script.indexed: on
script.search: on
script.engine.groovy.inline.aggs: on
# 慢日志设置 logger.yml 那边要手动开启
index.search.slowlog.level: TRACE

index.search.slowlog.threshold.query.warn: 10s
index.search.slowlog.threshold.query.info: 5s
index.search.slowlog.threshold.query.debug: 2s
index.search.slowlog.threshold.query.trace: 500ms

index.search.slowlog.threshold.fetch.warn: 1s
index.search.slowlog.threshold.fetch.info: 800ms
index.search.slowlog.threshold.fetch.debug: 500ms
index.search.slowlog.threshold.fetch.trace: 200ms

# 关闭自动创建索引、
action.auto_create_index: false


```
## 集群
集群策略基本上就是一个负载点暴露地址，2N+1个数据集群。
node.master=true/node.data=false
node.master=false/node.data=true
node.master=false/node.data=true
![](http://img.sandseasoft.com/image/1/12/8aef70686cb67591b510f8e052f44.png)
## 暴露api
 * _settings  全局设置
 * _templates 动态模板设定
 * _cluster  集群操作
 * _mappings 索引的 mapping 设定
 * _cat 监控数据
 * _bluk 批量更新端口


## DSL
```language-bash
curl -XPOST http://127.0.0.1:9200/films/md/ -d '{ "name":"hei yi ren", "tag": "bad", "post_date":"2015-10-29T14:12:12"}'  
curl -XDELETE http://127.0.0.1:9200/films  
curl -XPUT http://127.0.0.1:9200/films/md/1 -d '{"name":"hei yi ren", "tag": "good"}'  
curl http://127.0.0.1:9200/_search?pretty=true  
curl http://127.0.0.1:9200/films/_search  
curl http://127.0.0.1:9200/films/md/_search?pretty=true  
curl http://127.0.0.1:9200/films/md/_search?q=tag:good  

```
复杂查询

user:("xxx" OR "Xxxx") AND NOT xxx:f?~t*;
rtt:>300
rtt:[100 to 300]
_exists_:user 
_missing_:user

更复杂的聚集查询
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html

script 查询
```
doc['clientip'].value
```

## mapping配置 
 * 当前字段设置doc_values，不能使用分词，数据直接刷磁盘。
 * es 不支持索引的 rename mapping更改操作，只能 reindex
 * 假如你在基准测试中得到单机写入性能在 10000 eps，那么开启一个副本后所能达到的 eps 就只有 5000 了。还想写入 10000 eps 的话，就需要加一倍机器。

 * 创建一份索引

put /trace_v1
```language-javascript
{
  "settings": {
    "index.number_of_shards": 10,
    "index.number_of_replicas": 1,
    "refresh_interval": "5s",
    "index.translog.flush_threshold_ops": 100000,
    "index.store.compress.stored": true,
    "index.query.default_field": "sms",
    "index.cache.field.type": "soft"
  },
  "mappings": {
    "_default_": {
      "_all": {
        "enabled": false
      }
    },
    "loadbalancer": {
      "_ttl": {
        "enabled": true,
        "default": "7d"
      }
    },
    "logs": {
      "properties": {
        "spendTime": {
          "type": "long"
        },
        "waitTime": {
          "type": "long"
        }
      },
      "dynamic_templates": [
        {
          "not_a": {
            "match": "event*",
            "match_mapping_type": "string",
            "mapping": {
              "type": "string",
              "index": "not_analyzed"
            }
          }
        },
        {
          "not_b": {
            "match": "num*",
            "match_mapping_type": "string",
            "mapping": {
              "type": "long",
              "index": "not_analyzed"
            }
          }
        },
        {
          "not_c": {
            "match": "double*",
            "match_mapping_type": "string",
            "mapping": {
              "type": "double",
              "index": "not_analyzed"
            }
          }
        },
        {
          "not_all": {
            "match": "*",
            "match_mapping_type": "string",
            "mapping": {
              "index": "not_analyzed"
            }
          }
        }
      ]
    }
  }
}
```

metrics
```language-javascript
{
  "settings": {
    "index.number_of_shards": 10,
    "index.number_of_replicas": 1,
    "refresh_interval": "5s",
    "index.translog.flush_threshold_ops": 100000,
    "index.store.compress.stored": true
  },
  "mappings": {
    "_default_": {
      "_all": {
        "enabled": false
      }
    },
    "loadbalancer": {
      "_ttl": {
        "enabled": true,
        "default": "7d"
      }
    },
    "logs": {
      "properties": {
        "host": {
          "type": "string",
          "index": "not_analyzed"
        },
        "message": {
          "type": "string",
          "index": "not_analyzed"
        }
      }
    }
  }
}

```

![](http://img.sandseasoft.com/image/a/8d/00f6416f73b78268990d25073ddce.png)
![](http://img.sandseasoft.com/image/4/90/c73ee8e8f0bd11668d0d57ac37fef.png)
![](http://img.sandseasoft.com/image/d/40/767720b2fd6a25d217879ded73e76.png)
![](http://img.sandseasoft.com/image/2/ae/fe76ca25635f97f221aba2a7ec9ca.png)

* 更新索引

如上文所说，当索引的 mapping 是无法更新的，只能 rebuild。
一般的设计方法是，给某个索引设定别名，重新设计一套索引然后更新别名指向。原先的数据让其同步。

同步数据方法一
```language-python
import pyes
conn = pyes.es.ES("http://10.xx.xx.xx:8305/")
search = pyes.query.MatchAllQuery().search(bulk_read=1000)
hits = conn.search(search, 'store_v1', 'client', scan=True, scroll="30m", model=lambda _,hit: hit)
for hit in hits:
     # print hit
     conn.index(hit['_source'], 'store_v2', 'client', hit['_id'], bulk=True)
conn.flush()
```
同步数据方法二
logstash 同步
```languge-bash
input {
  elasticsearch {
    hosts => [ "192.168.0.2" ]
    port => "9200"
    index => "old_index"
    size => 500
    scroll => "5m"
    docinfo => true
  }
}

filter {
  mutate {
    remove_field => [ "@timestamp", "@version" ]
  }
}

output {
  elasticsearch {
    host => "192.168.0.2"
    port => "9200"
    protocol => "http"
    index => "%{[@metadata][_index]}"
    index_type => "%{[@metadata][_type]}"
    document_id => "%{[@metadata][_id]}"
  }
}

```

更新别名

post /_aliases 
```language-javascript
{
  "actions": [
    {
      "remove": {
        "alias": "trace",
        "index": "trace_v1"
      }
    },
    {
      "add": {
        "alias": "trace",
        "index": "trace_v2"
      }
    }
  ]
}
```

设定分词器、过滤器
PUT /my_index

```language-javascript
{
    "settings": {
        "analysis": {
            "char_filter": {
                "&_to_and": {
                    "type": "mapping",
                    "mappings": ["&=> and "]
                }
            },
            "filter": {
                "my_stopwords": {
                    "type": "stop",
                    "stopwords": ["the", "a"]
                }
            },
            "analyzer": {
                "my_analyzer": {
                    "type": "custom",
                    "char_filter": ["html_strip", "&_to_and"],
                    "tokenizer": "standard",
                    "filter": ["lowercase", "my_stopwords"]
                }
            }
        }
    }
}
```

完成索引重建

* 删除7天前索引
/info  delete
```language-javascript
{
  "query": {
    "match": {
      "logtime": "[* to now-7d]"
    }
  }
}
```

## 插件安装
```language-bash
bin/plugin install lmenezes/elasticsearch-kopf  
bin/plugin install mobz/elasticsearch-head
```
## 同步mysql database
https://github.com/jprante/elasticsearch-jdbc

```language-bash
# 解压到 lib 文件夹下
http://xbib.org/repository/org/xbib/elasticsearch/plugin/elasticsearch-river-jdbc/1.5.0.5/elasticsearch-river-jdbc-1.5.0.5-plugin.zip 

# 请求同步数据库, 注意要设定主键，会增量同步
curl -XPUT 'http://localhost:9200/_river/who_jdbc_river/_meta' -d '{
    "type": "jdbc",
    "jdbc": {
        "driver": "com.mysql.jdbc.Driver",
        "url": "jdbc:mysql://localhost:3306/profile",
        "user": "root",
        "password": "root",
        "sql": "select id as _id,name,login_name from user",
        "index": "profile",
        "type": "user",
        "bulk_size": 100,
        "max_bulk_requests": 30,
        "bulk_timeout": "10s",
        "flush_interval": "5s",
        "schedule": "0 0-59 0-23 ? * *"
    }
}'


## 删除相关索引
curl -XDELETE '192.168.1.116:9200/_river/userinfo/_meta'
curl -XDELETE '192.168.1.116:9200/_river/userinfo/_status'

```

## 运维索引Curator
https://www.elastic.co/guide/en/elasticsearch/client/curator/current/index.html
```language-bash
pip install elasticsearch-curator
curator delete/show indices --index trace --older-than 7 --time-unit days --timestring %Y.%m.%d 
```


## 备份恢复
参考

http://keenwon.com/1393.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/backup.html
http://kibana.logstash.es/

## 集群控制
POST _cluster/reroute
```language-javascript
{
  "commands": [
    {
      "move": {
        "index": "test",
        "shard": 0,
        "from_node": "node1",
        "to_node": "node2"
      }
    },
    {
      "cancel": {
        "index": "test",
        "shard": 0,
        "node": "node1",
        "allow_primary": true
      }
    },
    {
      "allocate": {
        "index": "test",
        "shard": 1,
        "node": "node3"
      }
    }
  ]
}
```

## 插件安装
```langauge-bash
bin/plugin install lmenezes/elasticsearch-kopf
bin/plugin install head
bin/plugin install elasticsearch/watcher/latest
```
##  TODO
白名单权限http-basic 不支持2.1版本，需要做插件兼容

## 配置详解
http://kibana.logstash.es/

elastalert
packetbeat



