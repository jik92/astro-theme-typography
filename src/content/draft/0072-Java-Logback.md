title: Java-Logback
date: 2015/12/04 06:49:14
categories:
 - tryghost

tags:
 - java 



---

## 简介
 * append 各种基础过滤器，提供各种输出管道
 * layout 格式化工具
 * logger 定义日志范围级别
 * root   默认根路径
 * MDC/NDC 线程上下文
 
## 几种不同的日志
 * slf4j 简单日志门面，可以替换不同的日志系统。（兼容性，插件都有问题）
 * log4j /log4j2
 * logback 

## 插件
### 扩展组件

 1. ConsoleAppender  输出结果到System.out或是System.err。
 2. FileAppender  输出结果到指定文件，同时可以指定输出数据的格式。append=“false”指定不追加到文件末尾 
 3. RollingFileAppender  自动追加日志信息到文件中，直至文件达到预定的大小，然后自动重新生成另外一个文件来记录之后的日志。

### 过滤标签
 1. ThresholdFilter 用来过滤指定高于优先级的事件。
 2. TimeFilter 设置start和end，来指定接收日志信息的时间区间。
 3. LevelFilter  用来过滤指定优先级的事件。

```language-xml
<filter class="ch.qos.logback.classic.filter.ThresholdFilter">
    <level>WARN</level>
</filter>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
```

### logger
 * logger 和 root 对指定域设定日志， 其中 root 中的 appender 会感染所有的 logger，慎用。
 * logger 有一个属性叫 additivity ，可以多个 logger 名空间重叠导致的日志重复输出，但是不能隔离 root

## 最佳实践
  * 可以把所有相同类型的日志往同一个文件夹里面打， 也可以写同一个文件，注意文件锁问题，logback 有配置

## 配置
pom.xml
```language-xml
<dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.12</version>
        </dependency>

        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.1.3</version>
        </dependency>

        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.1.3</version>
        </dependency>
</dependencies>
```

一份复杂的配置
logback.xml
```language-xml

<?xml version="1.0" encoding="UTF-8"?>

<configuration scan="true" scanPeriod="30 seconds">
    <statusListener class="ch.qos.logback.core.status.OnConsoleStatusListener"/>

    <!--console-->
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} %line - %msg%n</pattern>
        </encoder>
    </appender>

    <!--QuicloudMonitor-->
    <appender name="monitor" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>/data/logs/logstash/trace/trace.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>/data/logs/logstash/trace/trace.%d{yyyy-MM-dd-HH}.log</fileNamePattern>
            <maxHistory>72</maxHistory>
        </rollingPolicy>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>TRACE</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="com.raycloud.express.monitor.logback.layout.QuicloudMonitorLayout"/>
        </encoder>
    </appender>

    <appender name="errorMonitor" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>/data/logs/logstash/error/error.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>/data/logs/logstash/error/error.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>72</maxHistory>
        </rollingPolicy>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="com.raycloud.express.monitor.logback.layout.QuicloudMonitorLayout"/>
        </encoder>
    </appender>
     
    <logger name="com.raycloud.express.monitor.logback.helper.QuicloudMonitorTracer" addtivity="false">
        <appender-ref ref="monitor"/>
    </logger>


    <root level="INFO">
        <appender-ref ref="errorMonitor"/>
        <appender-ref ref="console"/>
    </root>


</configuration>


```

## 显示装载 logback

http://stackoverflow.com/search?tab=votes&q=logback%20LoggerContext
http://stackoverflow.com/questions/7824620/logback-set-log-file-name-programatically/7825685# 7825685



