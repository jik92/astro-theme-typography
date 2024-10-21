title: Server Jmeter、JMH
date: 2015/01/14 19:33:38
categories:
 - tryghost

tags:
 - manage 



---

# Jmeter
http://jmeter.apache.org/
http://www.jmeter-plugins.org/

## 图书

《零成本实现Web性能测试》

## 概念
### 测试内容
 * Web
 * JUnit

### 组件概念
 * ThreadGroup  线程组，LoadTest
 * Timer  定时器， 定时执行
 * Configure 配置原件，配置整个请求全局变量
 * Simpler 采样器，发送请求
 * Listning 监听器，查看结果
 * Pre processors 前置处理器
 * Post processors 后置处理器

# JMH
## 概念

基准测试不要使用循环，直接测试方法体。JIT 会对循环做优化
http://www.importnew.com/12548.html
http://openjdk.java.net/projects/code-tools/jmh/
http://www.open-open.com/lib/view/open1430537186459.html

## 使用方法
pom.xml
```language-xml
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.openjdk.jmh</groupId>
            <artifactId>jmh-core</artifactId>
            <version>1.9.3</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.openjdk.jmh</groupId>
            <artifactId>jmh-generator-annprocess</artifactId>
            <version>1.9.3</version>
            <scope>test</scope>
        </dependency>
```

test
```language-java
@State(Scope.Benchmark)
public class MetricsToolBenchmark {

  final static Logger LOGGER = LoggerFactory.getLogger(MetricsToolBenchmark.class);

  @Benchmark
  public void start1() throws InterruptedException {
      var x=1;

  }


  public static void main(String[] args) throws RunnerException {
    Options opt = new OptionsBuilder()
        .include(".*" + MetricsToolBenchmark.class.getSimpleName() + ".*")
        .warmupIterations(3)
        .measurementIterations(5)
        .threads(4)
        .forks(1)
        .build();

    new Runner(opt).run();
  }

}
```





