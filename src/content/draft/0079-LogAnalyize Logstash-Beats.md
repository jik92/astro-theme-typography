title: LogAnalyize Logstash/Beats
date: 2015/12/08 03:02:42
categories:
 - tryghost

tags:
 - store 



---

# 流式日志收集基础架构
![](http://img.sandseasoft.com/image/6/de/7070f73d53f1186286c6519ae05cb.png)

![](http://img.sandseasoft.com/image/c/7d/f539840247f98f8b0a0770fcc28aa.png)

# Logstash
核心：input->filter->output

负责收集日志，格式化，然后导出，有强大的插件机制支持各种不同类型的日志收集系统，无缝对接 es 平台。所有的插件能在 logstash 官网找到 。当配置无法生效尝试安装对应插件启用 ./bin/plugin list  ->./bin/plugin install 

 * logstash 是不会丢日志的， 当 output 阻塞以后，日志会落地持久化，重启后会继续输出。
 * logstash 支持 redis 集群随机多写，单读


## 使用
```language-bash
bin/logstash -f xxx.conf
cd logstash-6.0.0
bin/logstash -e 'input { stdin { } } output { stdout {} }'

```

## 配置
```language-javascript
input {
    log4j {
        host => "0.0.0.0"
        port => 4560
    }
    stdin {}
}
output {
    stdout {
        codec => rubydebug
    }
    redis {
        host => "192.168.31.202"
        port => 9979
        key => ["db0"]
        password => "T90ZFoEYrjffuPFDBWhrkD4ZHfXQydch"
        data_type => "list"
    }
}
```
## 最佳实践
检测吞吐量 
```language-xml
input {
 generator { count => 30000000 }
}
output{
 stdout{ codec => dots}
}
```
```language-bash
bin/logstash -f shipper.conf  | pv -abt > /dev/null
```
elastic 有mapping的概念，如果 build index 使用的是外部 mapping ，那么 logstash 设定的 index 类型将会失效。当然也可以开启强制重写索引template_overwrite:false

注意，之前吞吐量上不去，发现并发线程配低了，es 单线程单点入库了2k 左右
```language-javascript
input {
  redis {
    host => '127.0.0.1'
    data_type => 'list'
    key => 'logstash:redis'
    threads => 10
    # batch_count => 1000
  }
}


output {
  elasticsearch {
    # embedded => true
    host => localhost
    workers => 10
  }
}

大概每S可2W
```


解析失败会增加_grokparserfailure、_jsonparsefailure

http://grokdebug.herokuapp.com/

 
* 执行bashshell插件
```
output{
 exec{
     command=>"xxxx %{message}"
  }
}
```
* 心跳插件
```
input {
    heartbeat {
    interval=>60
    message=>ok
    type=>string
    tags=>["heartbeat"]
}
```

## 正则
   
### 基础写法
```language-bash
# 自定义
(?<name>[0..9]{1,2})
# 正则函数
%{DATA:name}
# 匹配
if [message] =~ "QAQ {}
```
### 正则检测
http://grokdebug.herokuapp.com/

### 字符串转 json
```language-bash
filter {
  json {
    source => "message"
  }
}
```

### 一个复杂的正则用例
```language-javascript
input {
    file {
        path => ["/data/logs/logstash/trace/*.log"]
        start_position => "beginning"
        tags => ["trace"]
    }
    file {
        path => ["/data/logs/logstash/error/*.log"]
        start_position => "beginning"
        tags => ["error"]
    }
    heartbeat {
        interval => 60
        message => ok
        type => string
        tags => ["heartbeat", "metrics"]
    }
}
filter {
    if "heartbeat" in [tags] {} else if [message] =~"QAQ" {
        grok {
            match => {
                "message" => "QAQ%{DATA:level}QAQ%{DATA:method}QAQ%{DATA:thread}QAQ%{DATA:logdate}QAQ%{DATA:appName}QAQ%{DATA:appNode}QAQ%{DATA:traceId}QAQ%{DATA:userIp}QAQ%{DATA:userUrl}QAQ%{DATA:waitTime}QAQ%{DATA:id}QAQ%{DATA:pid}QAQ%{DATA:json_g}QAQ%{DATA:sms}QAQ%{DATA:event}QAQ%{DATA:spendTime}QAQ%{DATA:json}QAQ"
            }
        }
        json {
            source => "json"
        }
        json {
            source => "json_g"
            remove_field => ["json", "json_g", "message"]
        }
        grok {
            match => ["logdate", "%{TIMESTAMP_ISO8601:logtime}"]
        }
    } else {
        grok {
            match => {
                "message" => "%{GREEDYDATA:sms}"
            }
        }
    }
}
output {
    stdout {
        codec => dots
    }
    if "_grokparsefailure" in [tags] {
        stdout {
            codec => rubydebug
        }
    } else if "trace" in [tags] {
        redis {
            host => ["10.168.158.199:6379", "10.117.6.144:6379"]
            key => ["trace"]
            batch => true
            batch_events => 500
            workers => 3
            data_type => "list"
        }
    } else if "info" in [tags] {
        redis {
            host => ["10.168.158.199:6379", "10.117.6.144:6379"]
            key => ["info"]
            data_type => "list"
        }
    } else if "error" in [tags] {
        redis {
            host => ["10.168.158.199:6379", "10.117.6.144:6379"]
            key => ["error"]
            data_type => "list"
            batch => true
            batch_events => 500
            workers => 3
        }
    } else if "metrics" in [tags] {
        redis {
            host => ["10.168.158.199:6379", "10.117.6.144:6379"]
            key => ["metrics"]
            data_type => "list"
        }
    }
}
```
# Beats
是从Logstash分出来的一个分支，用go语言写的，性能相对来说更好，分为 产品线
* Filebeat 收集中间件日志
* Metricbeat 收集系统级性能日志
* Packetbeat 收集网络数据包日志
* Winlogbeat 收集win日志
* Auditbeat 收集审计日志
* Heartbeat 收集心跳相关日志

```language-bash
./filebeat -e -c metricbeat.yml

./metricbeat -e -c metricbeat.yml
```



