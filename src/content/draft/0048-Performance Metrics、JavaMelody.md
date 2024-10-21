title: Performance Metrics、JavaMelody
date: 2015/11/19 13:50:54
categories:
 - tryghost

tags:
 - java 



---

# 核心问题
 * 服务
 * 重试，超时，心跳，熔断，监控，重启。
 * load/network/database/io
 * 审计日志、线上日志、后台日志 、*nix操作日志  



# 神器！ 指标度量工具

https://github.com/dropwizard/metrics

## 使用
写一个 MetricsUtils 方法，对指标定义，如下：
```language-java
public class MetricUtils {

  public final static MetricRegistry metrics = new MetricRegistry();

    //自定义维度
  public final static Counter   COUNTER   = METRICS.counter("接口 C");
  public final static Meter     METER     = METRICS.meter("接口 D");
  public final static Histogram HISTOGRAM = METRICS.histogram("接口 B");
  public final static Timer     TIMER     = METRICS.timer("接口 A");

  //JVM 维度
  public final static MemoryUsageGaugeSet       MEMORY                  = new MemoryUsageGaugeSet();
  public final static GarbageCollectorMetricSet GC                      = new GarbageCollectorMetricSet();
  public final static ThreadStatesGaugeSet      THREAD_STATES_GAUGE_SET = new ThreadStatesGaugeSet();



  static {

    QuicloudMonitorReporter reporter = QuicloudMonitorReporter.forRegistry(METRICS)
        .addNoitfiers("接口 A", new Notifier<Timer>() {
          public void notice(Timer data) {
            if (data.getCount() > 0) {
              System.out.println("通知!!! 同步个数超过");
            }
          }
        })
        .addNoitfiers("thread.count", new Notifier<Gauge>() {
          public void notice(Gauge data) {
            if ((Integer) data.getValue() >= 200) {
              System.out.println("警告线程数超过 200!");
            }
          }
        })
        .build();
    //警告!这里不要请不要把数值设置太小,撑爆日志服务器
    reporter.start(1, TimeUnit.MINUTES);


ConsoleReporter reporter = ConsoleReporter.forRegistry(metrics)
        .convertRatesTo(TimeUnit.SECONDS)
        .convertDurationsTo(TimeUnit.MILLISECONDS)
        .build();
//    reporter.start(1, TimeUnit.SECONDS);

    JmxReporter jmxReporter = JmxReporter.forRegistry(metrics).build();
    jmxReporter.start();

    Slf4jReporter slf4jReporter = Slf4jReporter.forRegistry(metrics)
        .outputTo(LoggerFactory.getLogger("com.raycloud.express.metrics"))
        .convertRatesTo(TimeUnit.SECONDS)
        .convertDurationsTo(TimeUnit.MILLISECONDS)
        .build();
    slf4jReporter.start(1, TimeUnit.MINUTES);  }

}
```
## 暴露数据到 webapi
声明两个 listener
```language-java

public class TJHealthCheckServletContextListener extends HealthCheckServlet.ContextListener {

  public static final HealthCheckRegistry HEALTH_CHECK_REGISTRY = new HealthCheckRegistry();


  @Override
  protected HealthCheckRegistry getHealthCheckRegistry() {

    HEALTH_CHECK_REGISTRY.register("thread", new ThreadDeadlockHealthCheck());

    return HEALTH_CHECK_REGISTRY;
  }

  static
  private void registerAll(String prefix, MetricSet metricSet, MetricRegistry registry) {
    for (Map.Entry<String, Metric> entry : metricSet.getMetrics().entrySet()) {
      if (entry.getValue() instanceof MetricSet) {
        registerAll(prefix + "." + entry.getKey(), (MetricSet) entry.getValue(), registry);
      } else {
        registry.register(prefix + "." + entry.getKey(), entry.getValue());
      }
    }
  }


}


```
```language-java
public class TJMetricsServletContextListener extends MetricsServlet.ContextListener {


  @Override
  protected MetricRegistry getMetricRegistry() {
    return MetricUtils.metrics;
  }

}
```
绑定在 web.xml
```language-xml
    <listener>
        <listener-class>com.raycloud.express.knowledge.web.listener.TJMetricsServletContextListener</listener-class>
    </listener> <listener>
        <listener-class>com.raycloud.express.knowledge.web.listener.TJHealthCheckServletContextListener</listener-class>
    </listener>
    <servlet>
        <servlet-name>metrics</servlet-name>
        <servlet-class>com.codahale.metrics.servlets.AdminServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>metrics</servlet-name>
        <url-pattern>/metrics/*</url-pattern>
    </servlet-mapping>

```
pom.xml
```language-xml
         <dependency>
            <groupId>io.dropwizard.metrics</groupId>
            <artifactId>metrics-servlets</artifactId>
            <version>3.1.0</version>
        </dependency>
        <dependency>
            <groupId>io.dropwizard.metrics</groupId>
            <artifactId>metrics-core</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>com.codahale.metrics</groupId>
            <artifactId>metrics-jvm</artifactId>
        </dependency>

```
然后在业务里面打点就好了，这里使用很简单。

访问路由：
http://127.0.0.1/metrics/[metrics|ping|thread|health]

常见的指标：

 1. Timer（以下所有）
 2. Meter（m1-m15）
 3. Histogram（p66-p999）
 4. Gauge（一个维度值）
 5. Count (统计个数)
 
https://github.com/elastic/elasticsearch-metrics-reporter-java

更多文档：
http://metrics.dropwizard.io/3.1.0/
还看到了一些不错的插件集成 spring 、aspcetj、elasticsearch 的。

# monitoring of JavaEE applications
https://github.com/javamelody/javamelody
关键指标全部都有，配置起来比较简单
```language-xml
    <filter>
        <filter-name>javamelody</filter-name>
        <filter-class>net.bull.javamelody.MonitoringFilter</filter-class>
        <async-supported>true</async-supported>
    </filter>
    <filter-mapping>
        <filter-name>javamelody</filter-name>
        <url-pattern>/*</url-pattern>
        <dispatcher>REQUEST</dispatcher>
        <!--<dispatcher>ASYNC</dispatcher>-->
    </filter-mapping>
    <listener>
        <listener-class>net.bull.javamelody.SessionListener</listener-class>
    </listener>
```
pom.xml
```language-xml
        <!-- javamelody-core -->
        <dependency>
            <groupId>net.bull.javamelody</groupId>
            <artifactId>javamelody-core</artifactId>
            <version>1.58.0</version>
        </dependency>
        <!-- itext, option to add PDF export -->
        <dependency>
            <groupId>com.lowagie</groupId>
            <artifactId>itext</artifactId>
            <version>2.1.7</version>
            <exclusions>
                <exclusion>
                    <artifactId>bcmail-jdk14</artifactId>
                    <groupId>bouncycastle</groupId>
                </exclusion>
                <exclusion>
                    <artifactId>bcprov-jdk14</artifactId>
                    <groupId>bouncycastle</groupId>
                </exclusion>
                <exclusion>
                    <artifactId>bctsp-jdk14</artifactId>
                    <groupId>bouncycastle</groupId>
                </exclusion>
            </exclusions>
        </dependency>

                <dependency>
            <groupId>com.thoughtworks.xstream</groupId>
            <artifactId>xstream</artifactId>
            <version>1.4.9</version>
        </dependency>
```

![](http://img.sandseasoft.com/image/c/f7/8aad90ae3a37dd9eebf90c5f49cdf.png)

### 路由请求地址
http://127.0.0.1:8888/monitoring
### api 说明文档
http://127.0.0.1:8888/monitoring?resource=help/api.html



