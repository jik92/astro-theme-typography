title: LogAnalyize rsyslog
date: 2015/12/02 02:15:50
categories:
 - tryghost

tags:
 - python 



---

系统日志



```language-bash
# 开启
service rsyslog start
# 查看状态
/etc/init.d/rsyslog status
# 测试
logger  "hello "
```

配置相关
```language-bash
# 配置
vim /etc/rsyslog.conf

开启 UDP
#  provides UDP syslog reception
# $ModLoad imudp
# $UDPServerRun 514

#  provides TCP syslog reception
$ModLoad imtcp
$InputTCPServerRun 514

```

整合 logstash
```language-xml

input {
    syslog{
       port=>5514
    }
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


http://blog.csdn.net/sdlyjzh/article/details/40855599



